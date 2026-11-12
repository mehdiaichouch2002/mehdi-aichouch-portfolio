import { useEffect, useRef, useState } from "react";

// The nav's bottom hairline as a liquid line. Each section link owns a soft dip in
// the line right below it: pointing at a link makes its dip spring down and bounce
// until it rests, while the previous one sinks back without bouncing. The section
// being read keeps a small resting dip. Under each dip: a cyan crest that grows out
// of the 1px line, a faint wash, and frosted glass clipped to the dip's shape.
//
// Desktop with a mouse and motion allowed only (decided after mount, so the first
// render matches the prerendered HTML). Elsewhere the nav's plain border stays.
// The animation loop only runs while something is moving.

const QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const REST = 6; // px, the section being read
const HOVER = 13; // px, the link under the pointer
const HALF_WIDTH = 56; // px, half the width of a dip
const CREST = 3; // px, crest thickness at the centre of a dip
const STEP = 3; // px between sampled points along the line
// Underdamped: quick, overshoots ~30%, a couple of fading bounces. Critically damped: never rebounds.
const RISE = { stiffness: 260, damping: 11 };
const SINK = { stiffness: 300, damping: 34 };
const EPS = 0.02;

const falloff = (d) => (Math.abs(d) >= HALF_WIDTH ? 0 : (1 + Math.cos((Math.PI * d) / HALF_WIDTH)) / 2);

const NavWave = ({ listRef, active, visible }) => {
  const [enabled, setEnabled] = useState(false);
  const svg = useRef(null);
  const glass = useRef(null);
  const state = useRef({ dips: [], hovered: null, active, raf: 0, last: 0, width: 0, kick: () => {} });

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // New active section: let the loop move the dips towards it
  useEffect(() => {
    state.current.active = active;
    state.current.kick();
  }, [active]);

  useEffect(() => {
    if (!enabled) return undefined;
    const s = state.current;
    const list = listRef.current;
    const nav = list.closest("nav");
    const [line, crest, wash] = ["line", "crest", "wash"].map((k) => svg.current.querySelector(`[data-k="${k}"]`));

    // The liquid line replaces the nav's own border. An attribute, not a class:
    // React rewrites the nav's className whenever it re-renders.
    nav.setAttribute("data-liquid", "");

    const measure = () => {
      const navLeft = nav.getBoundingClientRect().left;
      s.width = nav.clientWidth;
      svg.current.setAttribute("viewBox", `0 0 ${s.width} 40`);
      const old = new Map(s.dips.map((d) => [d.id, d]));
      s.dips = [...list.querySelectorAll("a[data-wave]")].map((a) => {
        const r = a.getBoundingClientRect();
        const prev = old.get(a.dataset.wave);
        return { id: a.dataset.wave, x: r.left + r.width / 2 - navLeft, depth: prev ? prev.depth : 0, v: prev ? prev.v : 0 };
      });
    };

    const yAt = (x) => s.dips.reduce((sum, d) => sum + d.depth * falloff(x - d.x), 0);

    const draw = () => {
      const pts = [];
      for (let x = 0; x < s.width; x += STEP) pts.push(`${x} ${(0.5 + yAt(x)).toFixed(2)}`);
      pts.push(`${s.width} ${(0.5 + yAt(s.width)).toFixed(2)}`);
      const curve = "M" + pts.join(" L");
      line.setAttribute("d", curve);
      // Wash and glass: the area between the straight line and the curve
      const area = `${curve} L${s.width} 0 L0 0 Z`;
      wash.setAttribute("d", area);
      glass.current.style.clipPath = `path("${area}")`;
      // Crest: the curve given a thickness that swells from 0 at a dip's edges to CREST at its centre
      const shapes = s.dips
        .filter((d) => d.depth > 0.3)
        .map((d) => {
          const up = [];
          const down = [];
          for (let x = d.x - HALF_WIDTH; x <= d.x + HALF_WIDTH; x += STEP) {
            const y = 0.5 + yAt(x);
            const h = (CREST * falloff(x - d.x) * Math.min(1, d.depth / REST)) / 2;
            up.push(`${x.toFixed(1)} ${(y - h).toFixed(2)}`);
            down.unshift(`${x.toFixed(1)} ${(y + h).toFixed(2)}`);
          }
          return "M" + up.concat(down).join(" L") + " Z";
        });
      crest.setAttribute("d", shapes.join(" "));
    };

    const tick = (now) => {
      const dt = Math.min((now - s.last) / 1000, 1 / 30);
      s.last = now;
      let moving = false;
      for (const d of s.dips) {
        const target = d.id === s.hovered ? HOVER : d.id === (s.hovered ? null : s.active) ? REST : 0;
        const spring = target > d.depth ? RISE : SINK;
        d.v += ((target - d.depth) * spring.stiffness - d.v * spring.damping) * dt;
        d.depth += d.v * dt;
        if (Math.abs(target - d.depth) < EPS && Math.abs(d.v) < EPS) {
          d.depth = target;
          d.v = 0;
        } else moving = true;
      }
      draw();
      s.raf = moving ? requestAnimationFrame(tick) : 0;
    };

    s.kick = () => {
      if (s.raf) return;
      s.last = performance.now();
      s.raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const a = e.target.closest("a[data-wave]");
      if (a && a.dataset.wave !== s.hovered) {
        s.hovered = a.dataset.wave;
        s.kick();
      }
    };
    const onLeave = () => {
      s.hovered = null;
      s.kick();
    };

    measure();
    draw();
    s.kick();
    list.addEventListener("pointerover", onOver);
    list.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => {
      measure();
      draw();
    });
    ro.observe(nav);
    return () => {
      list.removeEventListener("pointerover", onOver);
      list.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      nav.removeAttribute("data-liquid");
      cancelAnimationFrame(s.raf);
      s.raf = 0;
      s.kick = () => {};
    };
  }, [enabled, listRef]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-full -mt-px h-10" aria-hidden="true">
      <div ref={glass} className="absolute inset-0 bg-canvas/60 backdrop-blur-xl" />
      <svg ref={svg} className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="nav-wave-crest" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgb(var(--accent))" />
            <stop offset="1" stopColor="rgb(var(--accent))" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path data-k="wash" fill="rgb(var(--accent))" fillOpacity="0.06" />
        <path
          data-k="line"
          fill="none"
          stroke="rgb(var(--border))"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          className="transition-opacity duration-base"
          style={{ opacity: visible ? 1 : 0 }}
        />
        <path data-k="crest" fill="url(#nav-wave-crest)" style={{ filter: "drop-shadow(0 0 4px rgb(var(--accent) / 0.6))" }} />
      </svg>
    </div>
  );
};

export default NavWave;
