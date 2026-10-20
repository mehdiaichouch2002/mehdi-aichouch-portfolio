import { Link } from "react-scroll";
import heroImg from "../assets/portfolio/me.png";
import projects from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import { useResumeModal } from "../context/ResumeModalContext";

const liveStores = projects.filter((p) => p.category === "commercial");
const hostname = (url) => new URL(url).hostname.replace(/^www\./, "");

const Home = () => {
  const { t } = useLanguage();
  const { open: openResume } = useResumeModal();

  return (
    <section name="home" className="pt-[72px]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-8 pb-16 md:pt-12 md:pb-20 grid gap-10 md:grid-cols-[1fr_minmax(0,360px)] md:items-center">
        <div>
          <h1 className="chrome-text font-display font-bold tracking-[-0.03em] leading-[1.06] text-[clamp(1.9rem,4.1vw,3.2rem)] max-w-[17ch] pb-1">
            {t("home.headline")}
          </h1>
          <p className="mt-5 text-muted text-[1.12rem] leading-[1.65] max-w-[34rem]">
            {t("home.description")}
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm font-semibold text-fg">
            <span className="mt-[0.4rem] w-2 h-2 shrink-0 rounded-full bg-live" aria-hidden="true" />
            {t("home.availability")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="portfolio" href="#portfolio" smooth duration={500} offset={-72} className="btn-primary cursor-pointer">
              {t("home.cta")}
            </Link>
            <button onClick={openResume} className="btn-secondary">
              {t("home.resume")}
            </button>
          </div>

          <div className="mt-10">
            <p className="text-sm text-muted">{t("home.liveStores")}</p>
            <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-3">
              {liveStores.map((store) => (
                <li key={store.id}>
                  <a
                    href={store.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-semibold text-fg"
                  >
                    <span className="w-2 h-2 rounded-full bg-live" aria-hidden="true" />
                    <span className="border-b border-fg/20 group-hover:border-fg transition-colors">
                      {store.title}
                    </span>
                    <span className="sr-only">({hostname(store.href)})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="chrome-frame rounded-[20px] w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] mx-auto md:mx-0 md:justify-self-end">
          <div className="relative rounded-[19px] overflow-hidden bg-surface">
            <img
              src={heroImg}
              alt={t("home.photoAlt")}
              className="block w-full aspect-[4/5] object-cover object-top brightness-[0.88]"
            />
            {/* Fade the bottom into the page so the light studio backdrop doesn't end in a hard edge */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-canvas/70" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
