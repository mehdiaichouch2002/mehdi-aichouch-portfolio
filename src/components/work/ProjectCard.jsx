import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import usePointerCard from "../../hooks/usePointerCard";
import { DUR, EASE, fadeUp } from "../../lib/motion";

export const hostname = (url) => new URL(url).hostname.replace(/^www\./, "");

export const TechList = ({ tech, className = "" }) => (
  <ul className={`flex flex-wrap gap-1.5 ${className}`}>
    {tech.map((name) => (
      <li key={name} className="chip">
        {name}
      </li>
    ))}
  </ul>
);

const inView = { once: true, margin: "0px 0px -12% 0px" };

// Image entrance: a curtain lifts off while the picture settles from a slight zoom.
// Client cards also drift a little with the scroll (parallax); the extra scale gives
// the drift room so no edge ever shows. Transform only.
const MediaImage = ({ src, parallax }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ["-5%", "5%"] : ["0%", "0%"]);
  const rest = parallax ? 1.12 : 1;

  return (
    <div ref={ref} className="h-full w-full">
      <m.div
        className="h-full w-full"
        style={{ y }}
        initial={{ scale: rest + 0.14 }}
        whileInView={{ scale: rest }}
        viewport={inView}
        transition={{ duration: DUR.slow * 1.6, ease: EASE }}
      >
        <img
          src={src}
          alt=""
          width="1200"
          height="630"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.04]"
        />
      </m.div>
      <m.span
        className="absolute inset-0 origin-top bg-surface-2"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={inView}
        transition={{ duration: DUR.slow * 1.2, ease: EASE, delay: 0.05 }}
        aria-hidden="true"
      />
    </div>
  );
};

// The whole card opens the case study (a stretched button covers it);
// the external link sits above that layer so it stays independently clickable.
const ProjectCard = ({ project, onOpen, onHover, featured = false, index = 0, className = "" }) => {
  const { t } = useLanguage();
  const { handlers, style } = usePointerCard({ tilt: featured ? 2 : 4 });
  const isClient = project.category === "commercial";
  const cta = isClient ? t("portfolio.caseStudy") : t("portfolio.details");

  // Cursor pill (Portfolio's CursorPill): shown over the card, hidden over its own link
  const hover = {
    onPointerMove: (e) => {
      handlers.onPointerMove(e);
      onHover?.(e.target.closest("a") ? null : cta, e);
    },
    onPointerLeave: (e) => {
      handlers.onPointerLeave(e);
      onHover?.(null, e);
    },
  };

  return (
    <m.article
      {...fadeUp((index % 3) * 0.08)}
      {...handlers}
      {...hover}
      style={style}
      className={`card spotlight group flex flex-col overflow-hidden transition-colors duration-base ease-out hover:border-line-strong ${className}`}
    >
      <m.div
        layoutId={`media-${project.id}`}
        className={`relative overflow-hidden border-b border-line bg-surface-2 ${featured ? "aspect-[1200/630] lg:aspect-auto lg:flex-1" : "aspect-[1200/630]"}`}
      >
        <MediaImage src={project.src} parallax={isClient} />
      </m.div>

      <div className={`flex flex-col ${featured ? "p-6 md:p-8" : "p-5 md:p-6"}`}>
        <div className="flex items-center justify-between gap-4">
          {isClient ? (
            <p className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-live">
              <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
              {t("portfolio.live")}
            </p>
          ) : (
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted">GitHub</p>
          )}
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[0.75rem] text-muted transition-colors duration-fast hover:text-accent"
          >
            {isClient ? hostname(project.href) : <><FiGithub aria-hidden="true" /> {t("portfolio.viewCode")}</>}
            {isClient && <FiArrowUpRight aria-hidden="true" />}
            <span className="sr-only">
              : {project.title} ({t("portfolio.opensNewTab")})
            </span>
          </a>
        </div>

        <m.h4
          layoutId={`title-${project.id}`}
          className={`mt-2 tracking-[-0.03em] ${featured ? "text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.05]" : "text-[1.2rem] leading-snug"}`}
        >
          {project.title}
        </m.h4>
        <p className={`mt-3 leading-[1.6] text-muted ${featured ? "max-w-[36rem]" : "line-clamp-3 text-[0.95rem]"}`}>
          {t(`portfolio.projects.${project.descriptionKey}`)}
        </p>
        <TechList tech={project.tech} className="mt-5" />

        <button
          onClick={(e) => onOpen(project, e.currentTarget)}
          className="mt-5 inline-flex items-center gap-1.5 self-start font-mono text-[0.75rem] uppercase tracking-[0.1em] text-fg after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] [@media(hover:hover)_and_(pointer:fine)]:after:cursor-none"
        >
          {cta}
          <span className="transition-transform duration-fast ease-out group-hover:translate-x-1" aria-hidden="true">→</span>
          <span className="sr-only">: {project.title}</span>
        </button>
      </div>
    </m.article>
  );
};

export default ProjectCard;
