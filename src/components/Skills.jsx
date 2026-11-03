import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import SectionHeader from "./common/SectionHeader";
import Reveal from "./motion/Reveal";
import usePointerCard from "../hooks/usePointerCard";

// Mirrors the Skills section of the resume PDFs in public/. "also" holds what I've
// studied or used outside production, kept apart so it doesn't read as daily stack.
const SKILL_GROUPS = {
  magento: [
    "Magento 2.4.x", "PHP 8", "Custom modules", "Plugins & observers", "Dependency injection", "Service Contracts",
    "UI Components", "adminhtml", "Indexers", "Cron", "Composer patches",
  ],
  b2b: ["Company accounts", "Tiered & customer-group pricing", "Catalogue permissions", "Inventory sync"],
  apis: ["REST APIs", "webapi.xml & ACL", "OAuth2 / JWT", "Microsoft Entra ID SSO", "Amplience DAM & CDN", "Adyen / Apple Pay"],
  frontend: ["Hyvä Theme", "Alpine.js", "Tailwind CSS", "React", "Knockout.js", "JavaScript (ES6+)"],
  performance: ["Elasticsearch / OpenSearch", "Redis", "Varnish FPC", "MySQL tuning", "Nginx", "Docker", "CI/CD", "Linux"],
  also: ["Laravel", "Java / Spring Boot", "C# / .NET", "Python", "Git", "Xdebug", "Agile / Scrum", "Code review"],
};

// Bento placement on large screens (4 columns, 3 rows)
const LAYOUT = {
  magento: "lg:col-span-2",
  apis: "lg:col-span-2",
  frontend: "lg:col-span-2",
  performance: "lg:col-span-2",
  b2b: "",
  also: "lg:col-span-2",
  languages: "",
};

// Brand icons are ~65 kB of SVG paths, so they load in their own chunk once the
// page is idle. Until then each chip keeps an icon-sized gap (no layout shift).
const loadIcons = () => import("./skills/skillIcons");
const HAS_ICON = new Set([
  "Magento 2.4.x", "PHP 8", "Composer patches", "OAuth2 / JWT", "Adyen / Apple Pay", "Alpine.js", "Tailwind CSS",
  "React", "JavaScript (ES6+)", "Elasticsearch / OpenSearch", "Redis", "MySQL tuning", "Nginx", "Docker", "CI/CD",
  "Linux", "Laravel", "Java / Spring Boot", "C# / .NET", "Python", "Git",
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
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="page">
        <SectionHeader id="skills-title" section="skills" title={t("skills.title")} intro={t("skills.description")} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(LAYOUT).map(([group, span], i) => (
            <Reveal
              as="li"
              key={group}
              delay={(i % 4) * 0.06}
              {...handlers}
              className={`card spotlight overflow-hidden p-6 transition-colors duration-base ease-out hover:border-line-strong ${span}`}>
              {group === "magento" && icons && <icons.BackendMark />}
              <div className="relative flex items-baseline justify-between gap-3">
                <h3 className="text-[1.05rem] tracking-[-0.01em]">{t(`skills.groups.${group}`)}</h3>
                <span className="font-mono text-[0.7rem] text-muted" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {groups[group].map((skill) => {
                  const Icon = icons?.ICONS[skill];
                  return (
                    <li
                      key={skill}
                      className={`inline-flex items-center gap-2 rounded-full border border-line bg-canvas/60 px-3 py-1.5 text-[0.88rem] ${
                        group === "also" || group === "languages" ? "text-muted" : "text-fg/90"
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
