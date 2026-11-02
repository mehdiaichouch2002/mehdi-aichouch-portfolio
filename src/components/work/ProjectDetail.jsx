import { useEffect, useRef } from "react";
import { m } from "motion/react";
import { FiArrowUpRight, FiGithub, FiX } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import { DUR, EASE } from "../../lib/motion";
import { hostname, TechList } from "./ProjectCard";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Case-study overlay. The image and title share a layoutId with the card,
// so they travel from the card into the dialog (and back on close).
const ProjectDetail = ({ project, onClose }) => {
  const { t } = useLanguage();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const isClient = project.category === "commercial";

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    document.body.classList.add("overflow-hidden");

    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      // Keep keyboard focus inside the dialog
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [onClose]);

  const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <m.div
        {...fade}
        transition={{ duration: DUR.base, ease: EASE }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-${project.id}-title`}
        className="relative max-h-[92dvh] w-full max-w-[880px] overflow-y-auto rounded-t-lg border border-line-strong bg-surface-2 shadow-panel sm:rounded-lg"
      >
        <m.div layoutId={`media-${project.id}`} className="relative aspect-[1200/630] overflow-hidden border-b border-line bg-surface">
          <img src={project.src} alt="" width="1200" height="630" className="h-full w-full object-cover" />
        </m.div>

        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-canvas/70 text-fg backdrop-blur transition-colors duration-fast hover:border-muted"
          aria-label={t("portfolio.close")}
        >
          <FiX size={20} aria-hidden="true" />
        </button>

        <div className="p-6 md:p-10">
          <p className="eyebrow">{isClient ? t("portfolio.caseStudy") : "Open source"}</p>
          <m.h2
            layoutId={`title-${project.id}`}
            id={`project-${project.id}-title`}
            className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] tracking-[-0.04em]"
          >
            {project.title}
          </m.h2>

          <m.div {...fade} transition={{ duration: DUR.base, ease: EASE, delay: 0.12 }}>
            {isClient && (
              <p className="mt-4 text-sm">
                <span className="text-muted">{t("portfolio.role")}: </span>
                <span className="text-fg">{t("portfolio.clientRole")}</span>
              </p>
            )}
            <p className="mt-5 max-w-[42rem] text-[1.05rem] leading-[1.7] text-fg/85">
              {t(`portfolio.projects.${project.descriptionKey}`)}
            </p>
            <TechList tech={project.tech} className="mt-6" />

            <a href={project.href} target="_blank" rel="noreferrer" className="btn-primary mt-8">
              {isClient ? (
                <>
                  {t("portfolio.visitStore")} · {hostname(project.href)}
                  <FiArrowUpRight aria-hidden="true" />
                </>
              ) : (
                <>
                  <FiGithub aria-hidden="true" />
                  {t("portfolio.viewCode")}
                </>
              )}
              <span className="sr-only">({t("portfolio.opensNewTab")})</span>
            </a>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
