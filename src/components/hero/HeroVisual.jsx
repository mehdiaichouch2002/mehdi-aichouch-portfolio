import { useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";

// "The stack": the layers of what I build, from the interface down to the data,
// with a request travelling through them. Pure CSS 3D + inline SVG: no WebGL,
// no extra chunk, painted with the first frame on every device. Styles: .hs-* in index.css.

const S = "hs-line"; // hairline stroke
const F = "hs-fill"; // faint fill
const B = "hs-bar"; // brighter fill (text bars)

const InterfaceArt = () => (
  <>
    <rect className={S} x="12" y="14" width="96" height="92" rx="7" />
    <path className={S} d="M12 27h96" />
    <circle className={B} cx="19" cy="20.5" r="1.6" />
    <circle className={B} cx="25" cy="20.5" r="1.6" />
    <circle className={B} cx="31" cy="20.5" r="1.6" />
    <rect className={B} x="21" y="36" width="50" height="6" rx="3" />
    <rect className={F} x="21" y="46" width="34" height="3.5" rx="1.75" />
    <rect className="hs-accent" x="21" y="55" width="22" height="8" rx="4" />
    <rect className={S} x="21" y="72" width="22" height="25" rx="3" />
    <rect className={S} x="49" y="72" width="22" height="25" rx="3" />
    <rect className={S} x="77" y="72" width="22" height="25" rx="3" />
  </>
);

const CommerceArt = () => (
  <>
    {[14, 63].map((x) => (
      <g key={x}>
        <rect className={S} x={x} y="14" width="43" height="60" rx="5" />
        <rect className={F} x={x + 5} y="19" width="33" height="28" rx="3" />
        <rect className={B} x={x + 5} y="53" width="24" height="4" rx="2" />
        <rect className={F} x={x + 5} y="61" width="14" height="6" rx="3" />
      </g>
    ))}
    <rect className={S} x="14" y="84" width="92" height="20" rx="10" />
    <path className={S} d="M24 89h3l3 9h9l2.5-6.5H28.5" />
    <circle className={B} cx="31.5" cy="100.5" r="1.3" />
    <circle className={B} cx="37.5" cy="100.5" r="1.3" />
    <rect className={B} x="50" y="92" width="30" height="4" rx="2" />
  </>
);

const ApiArt = () => (
  <>
    {[
      ["GET", 22, 46],
      ["POST", 44, 34],
      ["PUT", 66, 52],
      ["GET", 88, 40],
    ].map(([method, y, w], i) => (
      <g key={i}>
        <rect className={S} x="14" y={y - 7} width="22" height="11" rx="2.5" />
        <text className="hs-text" x="25" y={y + 0.8} textAnchor="middle">
          {method}
        </text>
        <rect className={i === 1 ? B : F} x="42" y={y - 3} width={w} height="4" rx="2" />
      </g>
    ))}
    <path className={S} d="M102 14c-4 0-5 2-5 6v14c0 3-1.5 4-4 4 2.5 0 4 1 4 4v14c0 4 1 6 5 6" />
  </>
);

const DataArt = () => (
  <>
    <ellipse className={S} cx="32" cy="24" rx="18" ry="6" />
    <path className={S} d="M14 24v56c0 3.3 8 6 18 6s18-2.7 18-6V24" />
    <path className={S} d="M14 43c0 3.3 8 6 18 6s18-2.7 18-6M14 62c0 3.3 8 6 18 6s18-2.7 18-6" />
    <rect className={S} x="60" y="18" width="46" height="84" rx="4" />
    <path className={S} d="M60 32h46M60 46h46M60 60h46M60 74h46M60 88h46M76 18v84" />
    <rect className={B} x="64" y="23.5" width="8" height="3" rx="1.5" />
    <rect className={B} x="80" y="23.5" width="18" height="3" rx="1.5" />
  </>
);

// Bottom to top
const LAYERS = [
  { key: "data", Art: DataArt },
  { key: "api", Art: ApiArt },
  { key: "commerce", Art: CommerceArt },
  { key: "interface", Art: InterfaceArt },
];

// Fixed-ratio box, so nothing shifts around it
const HeroVisual = ({ className = "" }) => {
  const { t } = useLanguage();
  const root = useRef(null);

  // Pointer tilt and "open the stack" on hover, desktop only: CSS variables written once per frame, no React re-render
  useEffect(() => {
    const el = root.current;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf = 0;
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
      // The copy column sits on top of the visual, so :hover never fires: hit-test by hand
      const r = el.getBoundingClientRect();
      el.classList.toggle("is-open", cx > r.left + r.width * 0.15 && cx < r.right && cy > r.top + r.height * 0.15 && cy < r.bottom - r.height * 0.15);
    };
    const onMove = (e) => {
      cx = e.clientX;
      cy = e.clientY;
      x = (cx / window.innerWidth) * 2 - 1;
      y = (cy / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`aspect-square ${className}`} aria-hidden="true">
      <div ref={root} className="hs-root">
        <div className="hs-halo" />
        <div className="hs-scene">
          <div className="hs-ground" />
          {LAYERS.map(({ key, Art }, i) => (
            <div key={key} className="hs-layer" style={{ "--i": i }}>
              <div className="hs-plate">
                <svg viewBox="0 0 120 120" className="hs-art">
                  <Art />
                </svg>
                <div className="hs-ping" />
              </div>
              {/* Outside the plate: the plate is flat, the label must stay 3D to face the viewer */}
              <span className="hs-label">{t(`home.stack.${key}`)}</span>
            </div>
          ))}
          <div className="hs-beam">
            <div className="hs-packet" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
