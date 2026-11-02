import { sectionNumber } from "../../data/navLinks";
import { useLanguage } from "../../context/LanguageContext";
import Reveal from "../motion/Reveal";
import SplitHeading from "../motion/SplitHeading";

// "01 / About" micro-label, big title, optional intro line
const SectionHeader = ({ section, title, intro, id, className = "" }) => {
  const { t } = useLanguage();

  return (
    <header className={className}>
      <Reveal as="p" className="eyebrow flex items-center gap-3">
        <span className="text-accent">{sectionNumber(section)}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        <span>{t(`nav.${section}`)}</span>
      </Reveal>
      {/* key: replay the split when the language changes */}
      <SplitHeading key={title} id={id} text={title} className="section-title mt-5" />
      {intro && (
        <Reveal as="p" delay={0.15} className="mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-muted">
          {intro}
        </Reveal>
      )}
    </header>
  );
};

export default SectionHeader;
