import { FiArrowUp } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { contactLinks, socialLinks } from "../data/contactLinks";

const Footer = () => {
  const { t } = useLanguage();
  const toTop = () => {
    window.scrollTo({ top: 0 });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <footer className="border-t border-line">
      {/* Bottom padding leaves room for the floating chat button on small screens */}
      <div className="page flex flex-col gap-8 pb-24 pt-10 text-sm text-muted sm:pb-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-fg">
            &copy; {new Date().getFullYear()} Mehdi Aichouch. {t("footer.location")}
          </p>
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
