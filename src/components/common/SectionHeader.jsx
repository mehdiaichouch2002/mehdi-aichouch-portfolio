import { sectionNumber } from "../../data/navLinks";
import { useLanguage } from "../../context/LanguageContext";

// "01 / About" micro-label, big title, optional intro line
const SectionHeader = ({ section, title, intro, id, className = "" }) => {
  const { t } = useLanguage();

  return (
    <header className={className}>
      <p className="eyebrow flex items-center gap-3">
        <span className="text-accent">{sectionNumber(section)}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        <span>{t(`nav.${section}`)}</span>
      </p>
      <h2 id={id} className="section-title mt-5">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-muted">{intro}</p>}
    </header>
  );
};

export default SectionHeader;
