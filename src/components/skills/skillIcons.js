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


// Brand colours, lightened where the official one would vanish on the dark page
// (GitHub and JWT are black, .NET, Python, MySQL, Elastic and Composer too dark)
export const COLORS = {
  "PHP 8": "#8892BF",
  Laravel: "#FF2D20",
  "Magento 2 / Adobe Commerce": "#EE672F",
  "Java / Spring Boot": "#6DB33F",
  "C# / .NET": "#8C6CFF",
  Python: "#FFD43B",
  React: "#61DAFB",
  "JavaScript (ES6+)": "#F7DF1E",
  "Alpine.js": "#8BC0D0",
  "Tailwind CSS": "#38BDF8",
  "HTML5 / CSS3": "#E34F26",
  "OAuth2 / JWT": "#FB015B",
  "MySQL (query and index tuning)": "#F29111",
  "Elasticsearch / OpenSearch": "#00BFB3",
  Redis: "#FF4438",
  Docker: "#2496ED",
  "Git / GitHub": "#F0F0F0",
  "CI/CD pipelines": "#2088FF",
  Nginx: "#1FAF55",
  "Linux (Ubuntu)": "#E95420",
  Composer: "#C58B5A",
};
