import portrait320Avif from "../assets/portfolio/portrait-320.avif";
import portrait640Avif from "../assets/portfolio/portrait-640.avif";
import portrait320Webp from "../assets/portfolio/portrait-320.webp";
import portrait640Webp from "../assets/portfolio/portrait-640.webp";
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
            {/* 4:5 crops of the original photo, 320/640 px wide (1x/2x of the 280 px frame) */}
            <picture>
              <source type="image/avif" srcSet={`${portrait320Avif} 320w, ${portrait640Avif} 640w`} sizes="280px" />
              <source type="image/webp" srcSet={`${portrait320Webp} 320w, ${portrait640Webp} 640w`} sizes="280px" />
              <img
                src={portrait640Webp}
                alt={t("about.photoAlt")}
                width="640"
                height="800"
                loading="lazy"
                decoding="async"
                className="block aspect-[4/5] w-full object-cover grayscale-[35%]"
              />
            </picture>
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
