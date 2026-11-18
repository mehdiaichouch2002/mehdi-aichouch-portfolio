import {
  SiComposer, SiDocker, SiDotnet, SiElasticsearch, SiGithub, SiGithubactions, SiHtml5, SiJavascript,
  SiJsonwebtokens, SiLaravel, SiMagento, SiMysql, SiNginx, SiPhp, SiPython, SiReact, SiRedis, SiSpringboot,
  SiTailwindcss, SiUbuntu, SiAlpinedotjs,
} from "react-icons/si";

// Brand marks (inline SVG) where one exists; other skills show as plain text
export const ICONS = {
  "PHP 8": SiPhp,
  Laravel: SiLaravel,
  "Magento 2 / Adobe Commerce": SiMagento,
  "Java / Spring Boot": SiSpringboot,
  "C# / .NET": SiDotnet,
  Python: SiPython,
  React: SiReact,
  "JavaScript (ES6+)": SiJavascript,
  "Alpine.js": SiAlpinedotjs,
  "Tailwind CSS": SiTailwindcss,
  "HTML5 / CSS3": SiHtml5,
  "OAuth2 / JWT": SiJsonwebtokens,
  "MySQL (query and index tuning)": SiMysql,
  "Elasticsearch / OpenSearch": SiElasticsearch,
  Redis: SiRedis,
  Docker: SiDocker,
  "Git / GitHub": SiGithub,
  "CI/CD pipelines": SiGithubactions,
  Nginx: SiNginx,
  "Linux (Ubuntu)": SiUbuntu,
  Composer: SiComposer,
};

// The hero tile of the grid gets the platform marks large
export const BackendMark = () => (
  <div className="pointer-events-none absolute -bottom-5 -right-3 flex gap-3 text-[5.5rem] text-fg/[0.04]" aria-hidden="true">
    <SiPhp />
    <SiLaravel />
    <SiMagento />
  </div>
);

