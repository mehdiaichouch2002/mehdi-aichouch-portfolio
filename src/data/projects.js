import AnitaImg from "../assets/projects/anita.svg";
import CarharttImg from "../assets/projects/carhartt.svg";
import FreespaceImg from "../assets/projects/freespace.svg";
import EdwwinImg from "../assets/projects/edwin.svg";
import PortfolioImg from "../assets/projects/portfolio.svg";
import RequestifyImg from "../assets/projects/requestify.svg";
import SlackBotImg from "../assets/projects/slackbot.svg";
import LibraryImg from "../assets/projects/library.svg";
import AttributeImportImg from "../assets/projects/attribute-import.svg";
import MagentoFeaturesImg from "../assets/projects/magento-features.svg";
import EChallengeImg from "../assets/projects/echallenge.svg";
import JeeProductsImg from "../assets/projects/jee-products.svg";
import FreespaceBlogImg from "../assets/projects/freespace-blog.svg";
import AtelierImg from "../assets/projects/atelier.svg";
import JobBotImg from "../assets/projects/job-bot.svg";

const projects = [
  {
    id: 14,
    src: AtelierImg,
    href: "https://github.com/mehdiaichouch2002/atelier-artisanat",
    title: "Atelier",
    hosted: false,
    category: "opensource",
    descriptionKey: "atelier",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
  },
  {
    id: 15,
    src: JobBotImg,
    href: "https://github.com/mehdiaichouch2002/job-bot",
    title: "Job Application Bot",
    hosted: false,
    category: "opensource",
    descriptionKey: "jobBot",
    tech: ["Python", "SQLite", "LLM", "GitHub Actions"],
  },
  {
    id: 11,
    src: EChallengeImg,
    href: "https://github.com/mehdiaichouch2002/echallenge",
    title: "EChallenge",
    hosted: false,
    category: "opensource",
    descriptionKey: "echallenge",
    tech: ["Spring Boot", "React", "MySQL"],
  },
  {
    id: 12,
    src: FreespaceBlogImg,
    href: "https://github.com/mehdiaichouch2002/free-space-blog",
    title: "Free Space Blog",
    hosted: false,
    category: "opensource",
    descriptionKey: "freespaceBlog",
    tech: ["Django", "MySQL", "Tailwind"],
  },
  {
    id: 13,
    src: JeeProductsImg,
    href: "https://github.com/mehdiaichouch2002/JEE-Product-management",
    title: "JEE Product Management",
    hosted: false,
    category: "opensource",
    descriptionKey: "jeeProducts",
    tech: ["Java EE", "MySQL"],
  },
  {
    id: 1,
    src: FreespaceImg,
    href: "https://github.com/mehdiaichouch2002/Freespace",
    title: "Freespace",
    hosted: false,
    category: "opensource",
    descriptionKey: "freespace",
    tech: ["PHP"],
  },
  {
    id: 2,
    src: RequestifyImg,
    href: "https://github.com/mehdiaichouch2002/Requestify",
    title: "Requestify",
    hosted: false,
    category: "opensource",
    descriptionKey: "requestify",
    tech: ["Laravel"],
  },
  {
    id: 3,
    src: CarharttImg,
    href: "https://b2b.carhartt-wip.com",
    title: "B2B Carhartt WIP",
    hosted: true,
    category: "commercial",
    descriptionKey: "carhartt",
    tech: ["Magento 2.4", "PHP 8", "REST API", "Entra ID SSO", "Amplience"],
  },
  {
    id: 4,
    src: AnitaImg,
    href: "https://www.anita.com",
    title: "Anita",
    hosted: true,
    category: "commercial",
    descriptionKey: "anita",
    tech: ["Magento 2.4", "PHP 8"],
  },
  {
    id: 5,
    src: EdwwinImg,
    href: "https://edwin-europe.com",
    title: "Edwin",
    hosted: true,
    category: "commercial",
    descriptionKey: "edwin",
    tech: ["Magento 2.4", "PHP 8", "Adyen"],
  },
  {
    id: 6,
    src: PortfolioImg,
    href: "https://github.com/mehdiaichouch2002/reart-portfolio",
    title: "Portfolio",
    hosted: false,
    category: "personal",
    descriptionKey: "portfolio",
    tech: ["React", "Tailwind"],
  },
  {
    id: 7,
    src: SlackBotImg,
    href: "https://github.com/mehdiaichouch2002/Daily-Meeting-Host-Python-Slack-bot-",
    title: "Daily Meeting Host Slack Bot",
    hosted: false,
    category: "opensource",
    descriptionKey: "slackbot",
    tech: ["Python", "Slack API"],
  },
  {
    id: 8,
    src: LibraryImg,
    href: "https://github.com/mehdiaichouch2002/library-system",
    title: "Library Management System",
    hosted: false,
    category: "opensource",
    descriptionKey: "library",
    tech: ["PHP", "MySQL", "Nginx", "Docker"],
  },
  {
    id: 9,
    src: AttributeImportImg,
    href: "https://github.com/mehdiaichouch2002/Aichouchm-AttributeImport",
    title: "Attribute Import",
    hosted: false,
    category: "opensource",
    descriptionKey: "attributeImport",
    tech: ["Magento 2", "PHP"],
  },
  {
    id: 10,
    src: MagentoFeaturesImg,
    href: "https://github.com/mehdiaichouch2002/magento-features",
    title: "Magento 2 Innovation Lab",
    hosted: false,
    category: "opensource",
    descriptionKey: "magentoFeatures",
    tech: ["Magento 2", "Docker", "PHP"],
  },
];

export default projects;
