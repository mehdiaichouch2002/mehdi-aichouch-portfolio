import { useState, useEffect, useCallback, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { cancelFrame, frame, m } from "motion/react";
import navLinks from "../data/navLinks";
import useScrolled from "../hooks/useScrolled";
import { useLanguage } from "../context/LanguageContext";
import ScrollProgress from "./common/ScrollProgress";
import NavWave from "./NavWave";
import { DUR, EASE } from "../lib/motion";

// Section links are plain anchors: CSS scroll-behavior + scroll-padding-top (index.css)
// handle the smooth scroll and the header offset, and reduced motion turns smoothing off.
const NAV_HEIGHT = 64; // keep in sync with --nav-h
// Code shown in the switch, full name for screen readers (in its own language)
const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
];
const LENS_SPRING = { type: "spring", stiffness: 520, damping: 34, mass: 0.7 };
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

// A glass lens with the holographic edge slides to the current language.
// `id` keeps the desktop and mobile instances (both mounted) from sharing one lens.
const LanguageSwitch = ({ id }) => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {LANGUAGES.map(({ code, name }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-label={name}
            lang={code}
            aria-pressed={active}
            className={`relative isolate min-h-[32px] min-w-[38px] rounded-full px-2.5 font-mono text-[0.72rem] tracking-[0.04em] transition-colors duration-fast ${
              active ? "" : "text-muted hover:text-fg"
            }`}
          >
            {active && <m.span layoutId={`lang-lens-${id}`} className="lang-lens" transition={LENS_SPRING} aria-hidden="true" />}
            <span className={active ? "iris-text" : undefined}>{code.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
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
                      className={`group relative isolate flex items-baseline rounded-full px-3 py-2 text-[0.9rem] transition-colors duration-fast hover:bg-fg/[0.05] hover:text-accent ${
                        isActive ? "text-fg" : "text-muted"
                      }`}
                    >
                      {/* One pill shared by all links: it glides to whichever section is active */}
                      {isActive && (
                        <m.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full border border-line bg-surface/80"
                          transition={{ duration: DUR.base, ease: EASE }}
                          aria-hidden="true"
                        />
                      )}
                      <span>{t(`nav.${link}`)}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <LanguageSwitch id="desktop" />
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <LanguageSwitch id="mobile" />
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
        <div className="flex h-nav items-center justify-between border-b border-line px-5">
          <span className="eyebrow">Menu</span>
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
