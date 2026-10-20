import { useLanguage } from "../context/LanguageContext";

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

const Skills = () => {
  const { t } = useLanguage();

  return (
    <section name="skills" className="border-t border-line">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-20 md:py-28 grid gap-10 md:grid-cols-[minmax(0,300px)_1fr] md:gap-14">
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="section-title">{t("skills.title")}</h2>
          <p className="mt-4 text-muted leading-relaxed max-w-[22rem]">{t("skills.description")}</p>
        </div>

        <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {Object.entries({ ...SKILL_GROUPS, languages: t("skills.spoken") }).map(([group, skills]) => (
            <div key={group}>
              <dt className="font-display font-bold text-fg text-[1rem] pb-2 border-b border-muted">
                {t(`skills.groups.${group}`)}
              </dt>
              <dd>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className={`px-3 py-1.5 rounded-md border border-line text-[0.95rem] ${
                        group === "also" ? "text-muted" : "text-fg/85"
                      }`}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Skills;
