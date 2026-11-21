import { useState, useEffect, useCallback, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { cancelFrame, frame, m } from "motion/react";
import navLinks from "../data/navLinks";
import { langPath } from "../data/site";
import useScrolled from "../hooks/useScrolled";
import { useLanguage } from "../context/LanguageContext";
import ScrollProgress from "./common/ScrollProgress";
import NavWave from "./NavWave";
import { DUR, EASE } from "../lib/motion";

// Section links are plain anchors: CSS scroll-behavior + scroll-padding-top (index.css)
// handle the smooth scroll and the header offset, and reduced motion turns smoothing off.
const NAV_HEIGHT = 64; // keep in sync with --nav-h
// Each language's name in its own language (the link's accessible name)
const ENDONYM = { en: "English", fr: "Français" };
// "home" is reached through the wordmark
const sectionLinks = navLinks.filter(({ link }) => link !== "home");

const Wordmark = ({ onClick }) => (
  <a
    href="#home"
    onClick={onClick}
    className="select-none text-[1rem] font-semibold tracking-[-0.02em] text-fg"
  >
    Mehdi Aichouch
  </a>
);

// One tile of the split-flap display. When the letter changes, the old top half
// falls forward on its hinge and the new bottom half lands, like a departure board.
// Static layers sit behind the two moving leaves, which are keyed by `n` so each change
// plays once; once the flip is over the leaves are removed and the static layers show
// the new letter. The flip waits out the language crossfade (a view transition of
// DUR.base): while it runs the page shows snapshots, so a flip inside it is never seen.
// Motion drives the leaves (inline style each frame) rather than CSS keyframes, which
// Chrome could leave painted at their first keyframe here.
const FALL = { duration: 0.17, ease: [0.55, 0, 1, 0.45] };
const LAND = { duration: 0.23, ease: EASE };
const FlapTile = ({ from, to, n, moving, delay }) => (
  <span className="flap" style={{ "--fd": `${delay * 1000}ms` }}>
    <span className="flap-half flap-top">{to}</span>
    <span className="flap-half flap-bottom">{moving ? from : to}</span>
    {moving && (
      <>
        <m.span
          key={`fall-${n}`}
          className="flap-half flap-top"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -90 }}
          transition={{ ...FALL, delay: DUR.base + delay }}
        >
          {from}
        </m.span>
        <m.span
          key={`land-${n}`}
          className="flap-half flap-bottom"
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{ ...LAND, delay: DUR.base + delay + FALL.duration }}
        >
          {to}
        </m.span>
      </>
    )}
  </span>
);

// Language switch: a link to the other language, shown on a two-tile split-flap
// display ("FR" on the English page). Clicking flips the tiles to the new code.
// A real link to /fr or /, so it also opens in a new tab and needs no JS to work.
const LanguageSwitch = () => {
  const { lang, setLang } = useLanguage();
  const target = lang === "en" ? "fr" : "en";
  const code = target.toUpperCase();
  // What the tiles showed before and show now; n counts the flips
  const [flap, setFlap] = useState({ from: code, to: code, n: 0, moving: false });
  useEffect(() => {
    setFlap((f) => (f.to === code ? f : { from: f.to, to: code, n: f.n + 1, moving: true }));
    // The flip waits out the 400ms language crossfade, then the second tile takes 70ms
    // delay + 170ms fall + 230ms land; plus some slack. A timer, not animationend: in the
    // hidden instance (desktop or mobile) the animations never run.
    const id = setTimeout(() => setFlap((f) => ({ ...f, moving: false })), 1000);
    return () => clearTimeout(id);
  }, [code]);

  return (
    <a
      href={langPath(target)}
      hrefLang={target}
      lang={target}
      aria-label={ENDONYM[target]}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // new tab/window: let it be
        e.preventDefault();
        setLang(target);
      }}
      className="lang-flap"
    >
      <span className="flex gap-[3px]" aria-hidden="true">
        {[0, 1].map((i) => (
          <FlapTile key={i} from={flap.from[i]} to={flap.to[i]} n={flap.n} moving={flap.moving} delay={i * 0.07} />
        ))}
      </span>
    </a>
  );
};

const useActiveSection = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    // Section offsets and the page height only change when the page resizes: measure
    // them then, and on scroll only compare numbers. The scroll read happens in the
    // read phase of Motion's frame loop, so it never forces a style/layout pass.
    let tops = null;
    let height = 0;
    const measure = () => {
      tops = navLinks.map(({ link }) => [link, document.getElementById(link)?.offsetTop ?? Infinity]);
      height = document.documentElement.scrollHeight;
    };
    const update = () => {
      if (!tops) measure();
      const scrollY = window.scrollY;
      const atBottom = window.innerHeight + scrollY >= height - 50;
      if (atBottom) return setActive(navLinks[navLinks.length - 1].link);

      let current = "home";
      for (const [link, top] of tops) if (top - NAV_HEIGHT - 120 <= scrollY) current = link;
      setActive(current); // React skips the render when the value is unchanged
    };
    const onScroll = () => frame.read(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Re-measure when the page grows: on the first frame only the hero exists, so the
    // page counts as "scrolled to the bottom" until the other sections mount
    const ro = new ResizeObserver(() => {
      tops = null;
      onScroll();
    });
    ro.observe(document.body);
    onScroll(); // first read in a frame, not during mount (avoids a forced reflow)
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelFrame(update);
    };
  }, []);

  return active;
};

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const activeSection = useActiveSection();
  const scrolled = useScrolled(20);
  const linksRef = useRef(null);
  const { t } = useLanguage();

  const closeNav = useCallback(() => setNav(false), []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", nav);
    return () => document.body.classList.remove("overflow-hidden");
  }, [nav]);

  useEffect(() => {
    if (!nav) return;
    const onKey = (e) => e.key === "Escape" && closeNav();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav, closeNav]);

  return (
    <>
      <nav
        aria-label="Main"
        className={`fixed inset-x-0 top-0 z-50 h-nav border-b transition-[background-color,border-color] duration-base ease-out ${
          scrolled ? "border-line bg-canvas/75 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <ScrollProgress />
        <div className="page flex h-full items-center justify-between">
          <Wordmark />

          <div className="hidden items-center gap-6 lg:flex">
            <ul ref={linksRef} className="flex items-center gap-1">
              {sectionLinks.map(({ id, link }) => {
                const isActive = activeSection === link;
                return (
                  <li key={id}>
                    <a
                      href={`#${link}`}
                      data-wave={link}
                      aria-current={isActive ? "true" : undefined}
                      // No pill: the liquid line's dip under the link already marks the
                      // section being read, and the hovered one
                      className={`flex items-baseline px-3 py-2 text-[0.9rem] transition-colors duration-fast hover:text-fg ${
                        isActive ? "text-fg" : "text-muted"
                      }`}
                    >
                      <span>{t(`nav.${link}`)}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <LanguageSwitch />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitch />
            <button
              onClick={() => setNav(true)}
              className="grid h-11 w-11 place-items-center text-fg"
              aria-label="Open menu"
              aria-expanded={nav}
            >
              <FiMenu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
        <NavWave listRef={linksRef} active={activeSection} visible={scrolled} />
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-base lg:hidden ${
          nav ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeNav}
        aria-hidden="true"
      />
      <div
        data-offscreen-ok
        className={`fixed right-0 top-0 z-[70] h-full w-[300px] max-w-[85vw] border-l border-line bg-surface-2 transition-transform duration-base ease-out lg:hidden ${
          nav ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!nav}
      >
        <div className="flex h-nav items-center justify-end border-b border-line px-5">
          <button onClick={closeNav} className="grid h-11 w-11 place-items-center text-fg" aria-label="Close menu" tabIndex={nav ? 0 : -1}>
            <FiX size={22} aria-hidden="true" />
          </button>
        </div>
        <ul className="px-3 py-4">
          {navLinks.map(({ id, link }, i) => (
            <li
              key={id}
              // Links slide in one after another as the panel opens
              className={`transition-[opacity,transform] duration-slow ease-out ${nav ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
              style={{ transitionDelay: nav ? `${120 + i * 45}ms` : "0ms" }}
            >
              <a
                href={`#${link}`}
                onClick={closeNav}
                tabIndex={nav ? 0 : -1}
                className={`flex items-baseline rounded-sm px-3 py-3 text-xl font-semibold tracking-[-0.02em] ${
                  activeSection === link ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {t(`nav.${link}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
