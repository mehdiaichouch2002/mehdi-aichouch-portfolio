import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const experience = t("experience");
  const education = t("education");
  const certification = t("certification");

  return (
    <section name="about" className="border-t border-line">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-20 md:py-28 grid gap-10 md:grid-cols-[minmax(0,300px)_1fr] md:gap-14">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="section-title">{t("about.title")}</h2>
          <p className="mt-4 text-muted leading-relaxed max-w-[22rem]">{t("about.intro")}</p>
        </div>

        <div>
          {/* Jobs keep their dates; diplomas below don't */}
          <ol className="relative border-l-2 border-line ml-1.5">
            {experience.map((job, i) => (
              <li key={`${job.org}-${job.role}`} className="relative pl-7 sm:pl-9 pb-12 last:pb-0">
                <span
                  className={`absolute -left-[7px] top-[0.45rem] w-3 h-3 rounded-full ${
                    i === 0 ? "bg-accent" : "bg-canvas border-2 border-line"
                  }`}
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold text-muted tabular-nums">{job.date}</p>
                <h3 className="mt-1 font-display text-[1.1rem] font-bold text-fg leading-snug">
                  {job.role}
                </h3>
                <p className="font-medium text-accent">{job.org}</p>
                {job.note && <p className="mt-1 text-sm text-muted">{job.note}</p>}
                <ul className="mt-3 space-y-2 max-w-[42rem]">
                  {job.points.map((point) => (
                    <li key={point} className="relative pl-4 text-fg/80 leading-[1.6]">
                      <span className="absolute left-0 top-[0.7em] w-1.5 h-px bg-muted" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <h3 className="mt-16 font-display font-bold text-fg text-[1.35rem]">
            {t("about.educationTitle")}
          </h3>
          <ul className="mt-4">
            {education.map((item) => (
              <li key={item.degree} className="py-5 border-t border-line">
                <p className="font-display font-bold text-fg leading-snug">{item.degree}</p>
                <p className="font-medium text-accent">{item.org}</p>
                <p className="mt-1.5 text-fg/80 leading-[1.6] max-w-[42rem]">{item.note}</p>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display font-bold text-fg text-[1.35rem]">
            {t("about.certificationTitle")}
          </h3>
          <div className="mt-4 py-5 border-t border-line">
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display font-bold text-fg leading-snug">{certification.name}</span>
              <span className="text-sm font-semibold text-muted">{certification.status}</span>
            </p>
            <p className="mt-1.5 text-fg/80 leading-[1.6] max-w-[42rem]">{certification.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
