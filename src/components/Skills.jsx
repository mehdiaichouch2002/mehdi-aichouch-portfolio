import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import SectionHeader from "./common/SectionHeader";

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

// Row order. Practices and spoken languages are set quieter than the tools.
const ORDER = ["backend", "frontend", "apis", "data", "devops", "practices", "languages"];
const QUIET = new Set(["practices", "languages"]);

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
  const groups = { ...SKILL_GROUPS, languages: t("skills.spoken") };
  // Skill names stay in English except the plain-word ones listed in skills.terms
  const terms = t("skills.terms");
  const label = (skill) => terms?.[skill] ?? skill;

  return (
    <section id="skills" aria-labelledby="skills-title" className="section isolate overflow-x-clip">
      <div className="topo-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="page">
        <SectionHeader id="skills-title" title={t("skills.title")} intro={t("skills.description")} />

        {/* A typeset list, not a grid of cards: one ruled row per area, the area on
            the left, its tools set as text on the right */}
        <ul className="mt-14 border-b border-line">
          {ORDER.map((group) => (
            <li key={group} className="grid gap-x-10 gap-y-3 border-t border-line py-6 md:grid-cols-[13rem_1fr] md:py-7">
              <h3 className={`text-[1.05rem] tracking-[-0.01em] ${QUIET.has(group) ? "text-muted" : ""}`}>
                {t(`skills.groups.${group}`)}
              </h3>
              <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
                {groups[group].map((skill) => {
                  const Icon = icons?.ICONS[skill];
                  return (
                    <li
                      key={skill}
                      className={`inline-flex items-center gap-2 text-[1.05rem] ${QUIET.has(group) ? "text-muted" : "text-fg/90"}`}
                    >
                      {HAS_ICON.has(skill) &&
                        (Icon ? (
                          <Icon
                            className="h-[0.95em] w-[0.95em] shrink-0"
                            style={{ color: icons.COLORS[skill] }}
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="h-[0.95em] w-[0.95em] shrink-0" aria-hidden="true" />
                        ))}
                      {label(skill)}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
