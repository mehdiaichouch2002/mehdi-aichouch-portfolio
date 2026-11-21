import Reveal from "../motion/Reveal";
import SplitHeading from "../motion/SplitHeading";

// Section title and an optional intro line. No numbered micro-label: the sections
// aren't a sequence, and the nav already names them.
const SectionHeader = ({ title, intro, id, className = "" }) => (
  <header className={className}>
    {/* key: replay the split when the language changes */}
    <SplitHeading key={title} id={id} text={title} className="section-title" />
    {intro && (
      <Reveal as="p" delay={0.15} className="mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-muted">
        {intro}
      </Reveal>
    )}
  </header>
);

export default SectionHeader;
