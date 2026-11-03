import { FiArrowRight, FiArrowUpRight, FiDownload } from "react-icons/fi";
import projects from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import { useResumeModal } from "../context/ResumeModalContext";
import HeroVisual from "./hero/HeroVisual";
import Magnetic from "./motion/Magnetic";
import RollText from "./motion/RollText";

const liveStores = projects.filter((p) => p.category === "commercial");
const hostname = (url) => new URL(url).hostname.replace(/^www\./, "");

// "I build *anything* for the web." -> the starred word in the accent color
const withAccent = (line) =>
  line.split("*").map((part, i) =>
    i % 2 ? (
      <span key={i} className="text-accent">
        {part}
      </span>
    ) : (
      part
    )
  );

const Home = () => {
  const { t } = useLanguage();
  const { open: openResume } = useResumeModal();
  const headline = t("home.headline");

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="page relative flex min-h-[100svh] flex-col pb-10 pt-[calc(var(--nav-h)+3rem)] md:pt-[calc(var(--nav-h)+3.5rem)]">
        {/* Decorative behind the copy on small screens, its own column on large ones */}
        <HeroVisual className="pointer-events-none absolute -right-24 top-16 -z-10 w-[min(110vw,520px)] opacity-40 lg:pointer-events-auto lg:-right-6 lg:top-1/2 lg:w-[46%] lg:max-w-[620px] lg:-translate-y-1/2 lg:opacity-100" />

        <div className="my-auto">
          <p className="eyebrow hero-in">{t("home.eyebrow")}</p>

          <h1
            id="hero-title"
            className="mt-6 max-w-[15ch] text-[clamp(2.6rem,6.4vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.055em] lg:max-w-[14.5ch]"
          >
            {headline.map((line) => (
              <span key={line} className="rise-line">
                <span>{withAccent(line)}</span>{" "}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[30rem] text-[1.15rem] leading-relaxed text-muted md:text-[1.25rem]">
            {t("home.subline")}
          </p>

          <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={{ "--d": "380ms" }}>
            <Magnetic>
              <a href="#portfolio" className="btn-primary group">
                <RollText>{t("home.cta")}</RollText>
                <FiArrowRight className="transition-transform duration-fast ease-out group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
            <a href="#contact" className="btn-secondary group">
              <RollText>{t("home.contactCta")}</RollText>
            </a>
            <button onClick={openResume} className="inline-flex min-h-[44px] items-center gap-2 px-3 text-[0.95rem] text-muted transition-colors duration-fast hover:text-fg">
              <FiDownload aria-hidden="true" />
              {t("home.resume")}
            </button>
          </div>

          <p className="hero-in mt-8 max-w-[44rem] font-mono text-[0.74rem] leading-relaxed text-muted" style={{ "--d": "480ms" }}>
            {t("home.availability")}
          </p>
        </div>

        <div className="hero-in mt-14 border-t border-line pt-5" style={{ "--d": "560ms" }}>
          <p className="eyebrow">{t("home.liveStores")}</p>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
            {liveStores.map((store) => (
              <li key={store.id}>
                <a
                  href={store.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-[44px] items-center gap-2.5 font-semibold text-fg"
                >
                  <span className="h-2 w-2 rounded-full bg-live shadow-[0_0_10px_rgb(var(--live)/0.7)]" aria-hidden="true" />
                  {store.title}
                  <span className="hidden font-mono text-[0.72rem] font-normal text-muted transition-colors sm:inline duration-fast group-hover:text-fg">
                    {hostname(store.href)}
                  </span>
                  <FiArrowUpRight className="text-muted transition-transform duration-fast ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
