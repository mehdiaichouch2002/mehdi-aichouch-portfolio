import { m } from "motion/react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import { coverAlt, hostname } from "./ProjectCard";

// One row of the project index (everything that isn't a client store): a small
// cover, the title and a line of description, the stack as plain text, and the
// outside link. Like the cards, a stretched button opens the case study, and the
// thumbnail and title share a layoutId with the dialog.
const ProjectRow = ({ project, onOpen, onHover }) => {
  const { t } = useLanguage();
  const cta = t("portfolio.details");
  const kind = t(`portfolio.kind.${project.category}`);

  const hover = {
    onPointerMove: (e) => onHover?.(e.target.closest("a") ? null : cta, e),
    onPointerLeave: (e) => onHover?.(null, e),
  };

  return (
    <li
      {...hover}
      className="group relative grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-x-5 gap-y-3 border-t border-line py-5 sm:grid-cols-[9rem_minmax(0,1fr)] md:py-6 lg:col-span-4 lg:grid-cols-subgrid lg:items-center lg:gap-x-8"
    >
      <m.div layoutId={`media-${project.id}`} className="relative aspect-[1200/630] overflow-hidden rounded-sm border border-line bg-surface-2">
        <div className="halftone h-full w-full">
          <img
            src={project.src}
            alt={coverAlt(project, t)}
            width="1200"
            height="630"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </m.div>

      <div className="min-w-0">
        <p className="text-[0.85rem] text-muted">
          {project.hosted && <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-live align-middle" aria-hidden="true" />}
          {kind}
        </p>
        <m.h4 layoutId={`title-${project.id}`} className="mt-1 text-[1.2rem] leading-snug tracking-[-0.02em]">
          {project.title}
        </m.h4>
        <p className="mt-1.5 line-clamp-2 max-w-[38rem] text-[0.95rem] leading-[1.55] text-muted">
          {t(`portfolio.projects.${project.descriptionKey}`)}
        </p>
        {/* Below lg the stack sits under the description */}
        <p className="mt-2 font-mono text-[0.75rem] text-muted lg:hidden">{project.tech.join(", ")}</p>
      </div>

      <p className="hidden font-mono text-[0.75rem] leading-relaxed text-muted lg:block">{project.tech.join(", ")}</p>

      <div className="col-start-2 flex flex-wrap items-center gap-x-5 lg:col-start-auto lg:flex-nowrap lg:justify-end">
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="relative z-10 inline-flex min-h-[44px] items-center whitespace-nowrap gap-1.5 font-mono text-[0.75rem] text-muted transition-colors duration-fast hover:text-accent"
        >
          {project.hosted ? (
            <>
              {/* A long hostname won't fit beside the thumbnail on a phone */}
              <span className="sm:hidden">{t("portfolio.visitSite")}</span>
              <span className="hidden sm:inline">{hostname(project.href)}</span>
            </>
          ) : (
            <>
              <FiGithub aria-hidden="true" /> {t("portfolio.viewCode")}
            </>
          )}
          {project.hosted && <FiArrowUpRight aria-hidden="true" />}
          <span className="sr-only">
            : {project.title} ({t("portfolio.opensNewTab")})
          </span>
        </a>
        <button
          onClick={(e) => onOpen(project, e.currentTarget)}
          className="text-[0.95rem] font-semibold text-fg underline decoration-line-strong underline-offset-4 transition-colors duration-fast group-hover:decoration-accent after:absolute after:inset-0 after:content-[''] [@media(hover:hover)_and_(pointer:fine)]:after:cursor-none"
        >
          {cta}
          <span className="sr-only">: {project.title}</span>
        </button>
      </div>
    </li>
  );
};

export default ProjectRow;
