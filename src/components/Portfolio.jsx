import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import projects from "../data/projects";
import { useLanguage } from "../context/LanguageContext";
import SectionHeader from "./common/SectionHeader";
import ProjectCard from "./work/ProjectCard";
import ProjectRow from "./work/ProjectRow";
import ProjectDetail from "./work/ProjectDetail";
import CursorPill from "./work/CursorPill";

const clientWork = projects.filter((p) => p.category === "commercial");
// Live sites first (they can be opened, not just read), then Magento modules:
// they're closest to the client work above
const isMagento = (p) => p.tech.includes("Magento 2");
const otherWork = projects
  .filter((p) => p.category !== "commercial")
  .sort((a, b) => b.hosted - a.hosted || isMagento(b) - isMagento(a));
const INITIAL_VISIBLE = 6;

const Portfolio = () => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(null);
  const triggerRef = useRef(null);
  const { t } = useLanguage();
  const visible = expanded ? otherWork : otherWork.slice(0, INITIAL_VISIBLE);

  const open = useCallback((project, trigger) => {
    pill.current?.show(null);
    triggerRef.current = trigger;
    setSelected(project);
  }, []);
  const pill = useRef(null);
  const onHover = useCallback((label, e) => pill.current?.show(label, e), []);
  const close = useCallback(() => {
    setSelected(null);
    // Return focus to the card that opened the dialog
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section id="portfolio" aria-labelledby="work-title" className="section">
      <div className="page">
        <SectionHeader id="work-title" title={t("portfolio.title")} intro={t("portfolio.description")} />

        <h3 className="eyebrow mt-16">{t("portfolio.clientTitle")}</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {clientWork.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={open}
              onHover={onHover}
              featured={i === 0}
              index={i}
              className={i === 0 ? "md:col-span-2 lg:row-span-2" : ""}
            />
          ))}
        </div>

        <div className="mt-24">
          <h3 className="text-[1.6rem] leading-tight tracking-[-0.03em]">{t("portfolio.otherTitle")}</h3>
          <p className="mt-2 max-w-[36rem] text-muted">{t("portfolio.otherDescription")}</p>
          {/* An index, not a second grid of cards. From lg the rows share the list's
              columns (subgrid), so stack and links line up from row to row. */}
          <ul className="mt-8 border-b border-line lg:grid lg:grid-cols-[9rem_1fr_15rem_auto] lg:gap-x-8">
            {visible.map((project) => (
              <ProjectRow key={project.id} project={project} onOpen={open} onHover={onHover} />
            ))}
          </ul>
          {otherWork.length > INITIAL_VISIBLE && (
            <button onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="btn-secondary mt-10">
              {expanded ? t("portfolio.showLess") : t("portfolio.showAll").replace("{count}", otherWork.length)}
            </button>
          )}
        </div>
      </div>

      <CursorPill ref={pill} />
      <AnimatePresence>{selected && <ProjectDetail key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
    </section>
  );
};

export default Portfolio;
