import { Fragment, useEffect, useRef, useState } from "react";
import { m, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FiArrowUp } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { contactLinks, socialLinks } from "../data/contactLinks";
import { scrollToTarget } from "../lib/smoothScroll";
import { DUR, EASE } from "../lib/motion";

const fesTime = () =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Casablanca", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());

// "Local time 18:24" in Fès, refreshed twice a minute (text only, no animation)
const LocalTime = ({ label }) => {
  const [time, setTime] = useState(fesTime);
  useEffect(() => {
    const id = setInterval(() => setTime(fesTime()), 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="font-mono text-[0.72rem]">
      {label} <span className="tabular-nums text-fg">{time}</span>
    </p>
  );
};

// Giant name across the bottom of the page: each word rises from its own mask, once.
// Triggered by the reveal progress, not whileInView: the pinned footer is always
// "in view" geometrically, just hidden under the page.
const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DUR.slow * 1.4, ease: EASE } },
};
const Wordmark = ({ shown }) => (
  <m.p
    aria-hidden="true"
    className="footer-mark select-none"
    initial="hidden"
    animate={shown ? "show" : "hidden"}
    transition={{ staggerChildren: 0.08 }}
  >
    {["Mehdi", "Aichouch"].map((w, i) => (
      <Fragment key={w}>
        {/* The space sits between the masks: inside one it would collapse */}
        {i > 0 && " "}
        <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <m.span className="footer-mark-word inline-block" variants={word}>
            {w}
          </m.span>
        </span>
      </Fragment>
    ))}
  </m.p>
);

// Same query as .footer-curtain in index.css
const CURTAIN = "(min-width: 1024px) and (min-height: 640px)";

// How far the footer is uncovered, 0 → 1, over the last footer-height of scroll.
// With the curtain on, the content also trails the page a little (it starts 30% up
// and settles), which reads as a layer sitting underneath.
const useFooterReveal = (ref) => {
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);
  const [shown, setShown] = useState(false);
  const [curtain, setCurtain] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const mq = window.matchMedia(CURTAIN);
    let start = 0;
    let len = 1;
    const update = () => {
      const p = Math.min(1, Math.max(0, (scrollY.get() - start) / len));
      progress.set(p);
      if (p > 0.55) setShown(true);
    };
    const measure = () => {
      len = el.offsetHeight || 1;
      start = document.documentElement.scrollHeight - window.innerHeight - len;
      setCurtain(mq.matches);
      update();
    };
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    const unsubscribe = scrollY.on("change", update);
    measure();
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      unsubscribe();
    };
  }, [ref, scrollY, progress]);

  return { progress, shown, curtain };
};

const Footer = () => {
  const { t } = useLanguage();
  const toTop = () => {
    scrollToTarget(0);
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { progress, shown, curtain } = useFooterReveal(ref);
  const y = useTransform(progress, [0, 1], curtain && !reduce ? ["-30%", "0%"] : ["0%", "0%"]);

  return (
    <footer ref={ref} className="footer-curtain overflow-hidden border-t border-line">
      <m.div style={{ y }}>
      <div className="page pt-16 md:pt-24">
        <Wordmark shown={shown || reduce} />
      </div>
      {/* Bottom padding leaves room for the floating chat button on small screens */}
      <div className="page flex flex-col gap-8 border-t border-line pb-24 pt-10 text-sm text-muted sm:pb-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-fg">
            &copy; {new Date().getFullYear()} Mehdi Aichouch. {t("footer.location")}
          </p>
          <LocalTime label={t("footer.localTime")} />
          <p className="font-mono text-[0.72rem]">{t("footer.builtWith")}</p>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {[...contactLinks, ...socialLinks].map(({ label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" className="inline-block py-1 transition-colors duration-fast hover:text-fg">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={toTop}
          className="group inline-flex min-h-[44px] items-center gap-2 self-start font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted transition-colors duration-fast hover:text-fg md:mr-40 md:self-auto"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition-[border-color,transform] duration-fast ease-out group-hover:-translate-y-0.5 group-hover:border-accent/60">
            <FiArrowUp aria-hidden="true" />
          </span>
          {t("footer.backToTop")}
        </button>
      </div>
      </m.div>
    </footer>
  );
};

export default Footer;
