import {
  SiAdobe, SiAdyen, SiAlpinedotjs, SiClaude, SiComposer, SiDocker, SiDotnet, SiElasticsearch,
  SiGit, SiGithubactions, SiJavascript, SiJsonwebtokens, SiLaravel, SiMagento, SiMysql, SiNginx,
  SiOpenjdk, SiPaypal, SiPhp, SiPython, SiReact, SiRedis, SiSpringboot, SiTailwindcss, SiUbuntu,
} from "react-icons/si";

// Brand marks (inline SVG) where one exists; other skills show as plain text
export const ICONS = {
  "PHP 8": SiPhp,
  "Magento 2.4.x / Adobe Commerce": SiMagento,
  Laravel: SiLaravel,
  "Alpine.js": SiAlpinedotjs,
  "Tailwind CSS": SiTailwindcss,
  React: SiReact,
  "JavaScript (ES6+)": SiJavascript,
  "JWT / OAuth2": SiJsonwebtokens,
  Adyen: SiAdyen,
  PayPal: SiPaypal,
  MySQL: SiMysql,
  "Elasticsearch / OpenSearch": SiElasticsearch,
  Redis: SiRedis,
  Docker: SiDocker,
  "Git / GitHub": SiGit,
  "CI/CD (GitHub Actions)": SiGithubactions,
  Nginx: SiNginx,
  "Linux (Ubuntu)": SiUbuntu,
  Composer: SiComposer,
  "Claude Code / MCP": SiClaude,
  "Java / Java EE": SiOpenjdk,
  "Spring Boot": SiSpringboot,
  "C# / .NET": SiDotnet,
  Python: SiPython,
};

// The hero tile of the grid gets the platform marks large
export const BackendMark = () => (
  <div className="pointer-events-none absolute -bottom-5 -right-3 flex gap-3 text-[5.5rem] text-fg/[0.04]" aria-hidden="true">
    <SiMagento />
    <SiAdobe />
  </div>
);

