import portrait from "../assets/portfolio/me.png";
import { useLanguage } from "../context/LanguageContext";
import SectionHeader from "./common/SectionHeader";
import Reveal from "./motion/Reveal";
import ScrollText from "./motion/ScrollText";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="page grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <SectionHeader id="about-title" section="about" title={t("about.title")} />
          <Reveal as="figure" delay={0.1} className="mt-10 w-full max-w-[280px] overflow-hidden rounded-lg border border-line bg-surface">
            <img
              src={portrait}
              alt={t("about.photoAlt")}
              width="832"
              height="1248"
              loading="lazy"
              decoding="async"
              className="block aspect-[4/5] w-full object-cover object-top grayscale-[35%]"
            />
          </Reveal>
        </div>

        <div className="lg:pt-24">
          <ScrollText
            key={t("about.lead")}
            text={t("about.lead")}
            className="text-[clamp(1.45rem,2.6vw,2.1rem)] font-semibold leading-[1.25] tracking-[-0.03em] text-fg"
          />
          <Reveal as="p" className="mt-8 max-w-[38rem] text-[1.05rem] leading-relaxed text-muted">{t("about.intro")}</Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
