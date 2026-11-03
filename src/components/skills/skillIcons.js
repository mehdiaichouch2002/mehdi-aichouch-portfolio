import {
  SiAdobe, SiAdyen, SiAlpinedotjs, SiComposer, SiDocker, SiDotnet, SiElasticsearch, SiGit,
  SiGithubactions, SiJavascript, SiJsonwebtokens, SiLaravel, SiLinux, SiMagento, SiMysql, SiNginx,
  SiPhp, SiPython, SiReact, SiRedis, SiSpringboot, SiTailwindcss,
} from "react-icons/si";

// Brand marks (inline SVG) where one exists; other skills show as plain text
export const ICONS = {
  "Magento 2.4.x": SiMagento,
  "PHP 8": SiPhp,
  "Composer patches": SiComposer,
  "OAuth2 / JWT": SiJsonwebtokens,
  "Adyen / Apple Pay": SiAdyen,
  "Alpine.js": SiAlpinedotjs,
  "Tailwind CSS": SiTailwindcss,
  React: SiReact,
  "JavaScript (ES6+)": SiJavascript,
  "Elasticsearch / OpenSearch": SiElasticsearch,
  Redis: SiRedis,
  "MySQL tuning": SiMysql,
  Nginx: SiNginx,
  Docker: SiDocker,
  "CI/CD": SiGithubactions,
  Linux: SiLinux,
  Laravel: SiLaravel,
  "Java / Spring Boot": SiSpringboot,
  "C# / .NET": SiDotnet,
  Python: SiPython,
  Git: SiGit,
};

// The hero tile of the grid gets the platform marks large
export const BackendMark = () => (
  <div className="pointer-events-none absolute -bottom-5 -right-3 flex gap-3 text-[5.5rem] text-fg/[0.04]" aria-hidden="true">
    <SiMagento />
    <SiAdobe />
  </div>
);

