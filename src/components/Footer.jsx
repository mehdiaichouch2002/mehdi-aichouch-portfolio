import { Fragment, useEffect, useState } from "react";
import { m } from "motion/react";
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

// Giant name across the bottom of the page: each word rises from its own mask, once
const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DUR.slow * 1.4, ease: EASE } },
};
const Wordmark = () => (
  <m.p
    aria-hidden="true"
    className="footer-mark select-none"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "0px 0px -5% 0px" }}
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

const Footer = () => {
  const { t } = useLanguage();
  const toTop = () => {
    scrollToTarget(0);
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <footer className="overflow-hidden border-t border-line">
      <div className="page pt-16 md:pt-24">
        <Wordmark />
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
    </footer>
  );
};

export default Footer;
