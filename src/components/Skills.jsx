import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import SectionHeader from "./common/SectionHeader";
import Reveal from "./motion/Reveal";
import usePointerCard from "../hooks/usePointerCard";

// Mirrors the Skills section of the resume PDFs in public/. "also" holds what I've
// studied or used outside production, kept apart so it doesn't read as daily stack.
const SKILL_GROUPS = {
  backend: ["PHP 8", "Magento 2.4.x / Adobe Commerce", "Laravel", "Bagisto"],
  frontend: ["Hyvä", "Alpine.js", "Tailwind CSS", "React", "JavaScript (ES6+)", "Knockout.js"],
  apis: ["REST API design", "JWT / OAuth2", "Microsoft Entra ID SSO", "RBAC", "Amplience", "Adyen", "PayPal"],
  data: ["MySQL", "Elasticsearch / OpenSearch", "Redis", "Varnish"],
  tools: ["Docker", "Git / GitHub", "CI/CD (GitHub Actions)", "Nginx", "Linux (Ubuntu)", "Composer", "Claude Code / MCP"],
  quality: ["PHPStan", "Xdebug", "Pest", "Playwright"],
  also: ["Java / Java EE", "Spring Boot", "C# / .NET", "Python"],
};

// Bento placement on large screens (4 columns, 3 rows)
const LAYOUT = {
  backend: "lg:col-span-2",
  frontend: "lg:col-span-2",
  apis: "lg:col-span-2",
  data: "",
  quality: "",
  tools: "lg:col-span-2",
  also: "",
  languages: "",
};

// Brand icons are ~65 kB of SVG paths, so they load in their own chunk once the
// page is idle. Until then each chip keeps an icon-sized gap (no layout shift).
const loadIcons = () => import("./skills/skillIcons");
const HAS_ICON = new Set([
  "PHP 8", "Magento 2.4.x / Adobe Commerce", "Laravel", "Alpine.js", "Tailwind CSS", "React",
  "JavaScript (ES6+)", "JWT / OAuth2", "Adyen", "PayPal", "MySQL", "Elasticsearch / OpenSearch",
  "Redis", "Docker", "Git / GitHub", "CI/CD (GitHub Actions)", "Nginx", "Linux (Ubuntu)", "Composer",
  "Claude Code / MCP", "Java / Java EE", "Spring Boot", "C# / .NET", "Python",
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
              {group === "backend" && icons && <icons.BackendMark />}
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
                      {skill}
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
