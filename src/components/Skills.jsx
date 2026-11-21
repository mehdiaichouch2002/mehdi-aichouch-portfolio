import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import SectionHeader from "./common/SectionHeader";
import Reveal from "./motion/Reveal";
import usePointerCard from "../hooks/usePointerCard";

// Mirrors the Skills section of the resume PDFs in public/.
const SKILL_GROUPS = {
  backend: ["PHP 8", "Laravel", "Magento 2 / Adobe Commerce", "Java / Spring Boot", "C# / .NET", "Python", "OOP", "Design patterns"],
  frontend: [
    "React", "JavaScript (ES6+)", "Alpine.js", "Tailwind CSS", "Hyvä Theme", "Knockout.js", "HTML5 / CSS3", "Responsive design",
  ],
  apis: ["REST API design", "OAuth2 / JWT", "Microsoft Entra ID SSO", "RBAC", "Third-party integrations (Amplience, Adyen)"],
  data: ["MySQL (query and index tuning)", "Elasticsearch / OpenSearch", "Redis", "Varnish", "Caching strategy"],
  devops: ["Docker", "Git / GitHub", "CI/CD pipelines", "Nginx", "Linux (Ubuntu)", "Composer", "Xdebug"],
  practices: ["Agile / Scrum", "Code review", "Refactoring legacy code", "Debugging in production"],
};

// Bento placement on large screens (4 columns, 3 rows)
const LAYOUT = {
  backend: "lg:col-span-2",
  frontend: "lg:col-span-2",
  apis: "lg:col-span-2",
  data: "lg:col-span-2",
  devops: "lg:col-span-2",
  practices: "",
  languages: "",
};

// Brand icons are ~65 kB of SVG paths, so they load in their own chunk once the
// page is idle. Until then each chip keeps an icon-sized gap (no layout shift).
const loadIcons = () => import("./skills/skillIcons");
const HAS_ICON = new Set([
  "PHP 8", "Laravel", "Magento 2 / Adobe Commerce", "Java / Spring Boot", "C# / .NET", "Python", "React",
  "JavaScript (ES6+)", "Alpine.js", "Tailwind CSS", "HTML5 / CSS3", "OAuth2 / JWT", "MySQL (query and index tuning)",
  "Elasticsearch / OpenSearch", "Redis", "Docker", "Git / GitHub", "CI/CD pipelines", "Nginx", "Linux (Ubuntu)", "Composer",
]);

const useIdleIcons = () => {
  const [mod, setMod] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const run = () => loadIcons().then((m) => !cancelled && setMod(m));
    const id = window.requestIdleCallback ? window.requestIdleCallback(run, { timeout: 3000 }) : setTimeout(run, 1500);
    return () => {
      cancelled = true;
      window.cancelIdleCallback ? window.cancelIdleCallback(id) : clearTimeout(id);
    };
  }, []);
  return mod;
};

const Skills = () => {
  const { t } = useLanguage();
  const icons = useIdleIcons();
  const { handlers } = usePointerCard();
  const groups = { ...SKILL_GROUPS, languages: t("skills.spoken") };
  // Skill names stay in English except the plain-word ones listed in skills.terms
  const terms = t("skills.terms");
  const label = (skill) => terms?.[skill] ?? skill;

  return (
    <section id="skills" aria-labelledby="skills-title" className="section isolate overflow-x-clip">
      <div className="topo-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="page">
        <SectionHeader id="skills-title" title={t("skills.title")} intro={t("skills.description")} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(LAYOUT).map(([group, span], i) => (
            <Reveal
              as="li"
              key={group}
              delay={(i % 4) * 0.06}
              {...handlers}
              className={`card spotlight overflow-hidden p-6 transition-colors duration-base ease-out hover:border-line-strong ${span}`}>
              {group === "backend" && icons && <icons.BackendMark />}
              <h3 className="relative text-[1.05rem] tracking-[-0.01em]">{t(`skills.groups.${group}`)}</h3>
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {groups[group].map((skill) => {
                  const Icon = icons?.ICONS[skill];
                  return (
                    <li
                      key={skill}
                      className={`inline-flex items-center gap-2 rounded-full border border-line bg-canvas/60 px-3 py-1.5 text-[0.88rem] ${
                        group === "practices" || group === "languages" ? "text-muted" : "text-fg/90"
                      }`}
                    >
                      {HAS_ICON.has(skill) &&
                        (Icon ? (
                          <Icon className="h-[1em] w-[1em] shrink-0 text-muted" aria-hidden="true" />
                        ) : (
                          <span className="h-[1em] w-[1em] shrink-0" aria-hidden="true" />
                        ))}
                      {label(skill)}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
