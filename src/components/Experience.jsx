import { useRef } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import SectionHeader from "./common/SectionHeader";
import Reveal from "./motion/Reveal";
import { DUR, EASE } from "../lib/motion";

const Experience = () => {
  const { t } = useLanguage();
  const experience = t("experience");
  const education = t("education");
  const certification = t("certification");
  const listRef = useRef(null);
  // 0 → 1 while the list crosses the middle of the viewport; drives the accent line (scaleY only)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="page grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
          <SectionHeader id="experience-title" section="experience" title={t("timeline.title")} intro={t("timeline.intro")} />
        </div>

        <div>
          {/* Jobs keep their dates; diplomas below don't */}
          <ol ref={listRef} className="relative">
            <span className="absolute bottom-2 left-[5px] top-2 w-px bg-line" aria-hidden="true" />
            <m.span
              style={{ scaleY: progress }}
              className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent/0"
              aria-hidden="true"
            />
            {experience.map((job) => (
              <Reveal as="li" key={`${job.org}-${job.role}`} className="relative pb-14 pl-10 last:pb-0 sm:pl-12">
                <span className="absolute left-0 top-[0.4rem] h-[11px] w-[11px] rounded-full border border-line-strong bg-canvas" aria-hidden="true" />
                {/* Lights up as the accent line reaches it (the line runs at 60% of the viewport) */}
                <m.span
                  className="absolute left-0 top-[0.4rem] h-[11px] w-[11px] rounded-full border border-accent bg-accent shadow-[0_0_14px_rgb(var(--accent)/0.6)]"
                  initial={{ opacity: 0, scale: 0.3 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                  transition={{ duration: DUR.base, ease: EASE }}
                  aria-hidden="true"
                />
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.1em] text-muted tabular-nums">{job.date}</p>
                <h3 className="mt-2 text-[1.3rem] leading-snug tracking-[-0.02em]">{job.role}</h3>
                <p className="mt-0.5 text-fg/70">{job.org}</p>
                {job.note && <p className="mt-1 text-sm text-muted">{job.note}</p>}
                <ul className="mt-4 max-w-[44rem] space-y-2.5">
                  {job.points.map((point) => (
                    <li key={point} className="relative pl-5 leading-[1.65] text-fg/80">
                      <span className="absolute left-0 top-[0.8em] h-px w-2.5 bg-muted" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>

          <div className="mt-20 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <h3 className="eyebrow">{t("timeline.educationTitle")}</h3>
            </div>
            {education.map((item) => (
              <Reveal as="article" key={item.degree} className="card p-6">
                <h4 className="text-[1.05rem] leading-snug tracking-[-0.01em]">{item.degree}</h4>
                <p className="mt-1 text-sm text-fg/70">{item.org}</p>
                <p className="mt-3 text-[0.95rem] leading-[1.6] text-muted">{item.note}</p>
              </Reveal>
            ))}

            <div className="mt-8 md:col-span-2">
              <h3 className="eyebrow">{t("timeline.certificationTitle")}</h3>
            </div>
            <Reveal as="article" className="card p-6 md:col-span-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h4 className="text-[1.05rem] leading-snug tracking-[-0.01em]">{certification.name}</h4>
                <span className="chip border-accent/30 text-accent">{certification.status}</span>
              </div>
              <p className="mt-3 text-[0.95rem] leading-[1.6] text-muted">{certification.note}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
