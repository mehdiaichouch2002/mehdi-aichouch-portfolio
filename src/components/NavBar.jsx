import { useState, useEffect, useCallback } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import navLinks, { sectionNumber } from "../data/navLinks";
import useScrolled from "../hooks/useScrolled";
import { useLanguage } from "../context/LanguageContext";
import ScrollProgress from "./common/ScrollProgress";

// Section links are plain anchors: CSS scroll-behavior + scroll-padding-top (index.css)
// handle the smooth scroll and the header offset, and reduced motion turns smoothing off.
const NAV_HEIGHT = 64; // keep in sync with --nav-h
const LANGUAGES = ["en", "fr"];
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

const LanguageSwitch = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center rounded-full border border-line p-0.5" role="group" aria-label="Language">
      {LANGUAGES.map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-label={code.toUpperCase()}
          aria-pressed={lang === code}
          className={`min-w-[36px] rounded-full px-2.5 py-1.5 font-mono text-[0.72rem] transition-colors duration-fast ${
            lang === code ? "bg-fg text-canvas" : "text-muted hover:text-fg"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

const useActiveSection = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      const scrollY = window.scrollY;
      const atBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50;
      if (atBottom) return setActive(navLinks[navLinks.length - 1].link);

      let current = "home";
      for (const { link } of navLinks) {
        const el = document.getElementById(link);
        if (el && el.offsetTop - NAV_HEIGHT - 120 <= scrollY) current = link;
      }
      setActive(current); // React skips the render when the value is unchanged
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // first read in a frame, not during mount (avoids a forced reflow)
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return active;
};

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const activeSection = useActiveSection();
  const scrolled = useScrolled(20);
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
        className={`fixed inset-x-0 top-0 z-50 h-nav border-b transition-colors duration-base ease-out ${
          scrolled ? "border-line bg-canvas/75 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <ScrollProgress />
        <div className="page flex h-full items-center justify-between">
          <Wordmark />

          <div className="hidden items-center gap-6 lg:flex">
            <ul className="flex items-center gap-1">
              {sectionLinks.map(({ id, link }) => {
                const isActive = activeSection === link;
                return (
                  <li key={id}>
                    <a
                      href={`#${link}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`group flex items-baseline gap-1.5 rounded-full px-3 py-2 text-[0.9rem] transition-colors duration-fast ${
                        isActive ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      <span
                        className={`font-mono text-[0.65rem] transition-colors duration-fast ${
                          isActive ? "text-accent" : "text-muted/60 group-hover:text-muted"
                        }`}
                        aria-hidden="true"
                      >
                        {sectionNumber(link)}
                      </span>
                      {t(`nav.${link}`)}
                    </a>
                  </li>
                );
              })}
            </ul>
            <LanguageSwitch />
          </div>

          <div className="flex items-center gap-1 lg:hidden">
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
          {navLinks.map(({ id, link }) => (
            <li key={id}>
              <a
                href={`#${link}`}
                onClick={closeNav}
                tabIndex={nav ? 0 : -1}
                className={`flex items-baseline gap-3 rounded-sm px-3 py-3 text-xl font-semibold tracking-[-0.02em] ${
                  activeSection === link ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                <span className={`w-5 font-mono text-[0.7rem] ${activeSection === link ? "text-accent" : ""}`}>
                  {sectionNumber(link)}
                </span>
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
