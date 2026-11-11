/* eslint-disable no-console */
// Runs after `react-scripts build` (see the "build" script in package.json).
//
// A CRA build ships an empty <div id="root">: crawlers that don't run JavaScript
// (Bing in part, link previews, AI crawlers) see no content, and Google only sees
// it after a second, delayed rendering pass. This script renders <App /> to HTML in
// Node, once per language, and writes:
//
//   build/index.html      English, https://<site>/
//   build/fr/index.html   French,  https://<site>/fr
//   build/sitemap.xml, build/robots.txt
//
// with a language-specific <head> (title, description, canonical, hreflang,
// Open Graph, JSON-LD). The browser then hydrates that HTML (src/index.js).
// Everything SEO-related comes from src/data/site.js, src/i18n/translations.js,
// src/data/projects.js and src/data/contactLinks.js, so it can't drift from the page.
//
// It ends by checking its own output and exits non-zero on a problem, which fails
// the build rather than deploying a page with broken SEO tags.

process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";

const fs = require("fs");
const path = require("path");
const Module = require("module");
const { execSync } = require("child_process");
const babel = require("@babel/core");

const ROOT = path.resolve(__dirname, "../..");
const SRC = path.join(ROOT, "src");
const BUILD = path.join(ROOT, "build");

try {
  require("dotenv").config({ path: path.join(ROOT, ".env") });
} catch {
  // dotenv comes with react-scripts; without it only real environment variables are read
}

// ── Load the app's source in Node ──────────────────────────────────────────────
// Same Babel preset as the CRA build, plus CommonJS modules so `require` can load it.
const compile = (module, filename) => {
  const { code } = babel.transformSync(fs.readFileSync(filename, "utf8"), {
    filename,
    babelrc: false,
    configFile: false,
    presets: [[require.resolve("babel-preset-react-app"), { runtime: "automatic" }]],
    plugins: [require.resolve("@babel/plugin-transform-modules-commonjs")],
  });
  module._compile(code, filename);
};
const defaultJs = Module._extensions[".js"];
Module._extensions[".js"] = (module, filename) =>
  filename.startsWith(SRC + path.sep) ? compile(module, filename) : defaultJs(module, filename);
Module._extensions[".jsx"] = compile;
Module._extensions[".css"] = () => {};

// Imported images resolve to the URLs webpack gave them. Small PNG/AVIF files are
// not in the manifest because webpack inlines them as data URIs: do the same.
const assets = require(path.join(BUILD, "asset-manifest.json")).files;
const MIME = { ".avif": "image/avif", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif" };
for (const ext of [".webp", ".avif", ".png", ".jpg", ".jpeg", ".gif", ".svg"]) {
  Module._extensions[ext] = (module, filename) => {
    const url = assets[`static/media/${path.basename(filename)}`];
    if (url) module.exports = url;
    else if (MIME[ext]) module.exports = `data:${MIME[ext]};base64,${fs.readFileSync(filename).toString("base64")}`;
    else throw new Error(`prerender: no built asset for ${filename}`);
  };
}

const React = require("react");
const { renderToString } = require("react-dom/server");
const App = require(path.join(SRC, "App.jsx")).default;
const translations = require(path.join(SRC, "i18n/translations.js")).default;
const projects = require(path.join(SRC, "data/projects.js")).default;
const { contactLinks, EMAIL } = require(path.join(SRC, "data/contactLinks.js"));
const { SITE_URL, PERSON_NAME, LANGS, DEFAULT_LANG, langPath } = require(path.join(SRC, "data/site.js"));

// ── Head ───────────────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pageUrl = (lang) => SITE_URL + langPath(lang);
const OG_LOCALE = { en: "en_US", fr: "fr_FR" };
const OG_IMAGE = `${SITE_URL}/og-image.png`;
// A stable, unhashed URL for the portrait (public/), referenced by the Person schema
const PORTRAIT = { url: `${SITE_URL}/mehdi-aichouch.jpg`, width: 800, height: 1000 };
const [givenName, familyName] = PERSON_NAME.split(" ");

// Date of the deployed commit: the last time the page's content can have changed
let lastModified = null;
try {
  lastModified = execSync("git log -1 --format=%cI", { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || null;
} catch {
  // No git (or a build outside a checkout): leave the dates out rather than guess
}

const KNOWS_ABOUT = [
  "Full-stack web development", "E-commerce development", "Magento 2", "Adobe Commerce", "PHP", "Laravel", "React",
  "JavaScript", "MySQL", "REST APIs", "Hyvä Themes", "Alpine.js", "Tailwind CSS", "Elasticsearch", "Redis", "Varnish",
  "Docker", "CI/CD", "B2B e-commerce", "Web performance optimization",
];
// Same order as translations.<lang>.education
const SCHOOL_TYPES = ["CollegeOrUniversity", "EducationalOrganization"];

const jsonLd = (lang) => {
  const t = translations[lang];
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const url = pageUrl(lang);

  // Only work Mehdi authored. Client stores belong to their brands and stay out of the schema.
  const ownWork = projects
    .filter((p) => p.category !== "commercial")
    .map((p) => {
      const onGitHub = p.href.startsWith("https://github.com/");
      return {
        "@type": onGitHub ? "SoftwareSourceCode" : "CreativeWork",
        name: p.title,
        description: t.portfolio.projects[p.descriptionKey],
        ...(onGitHub ? { codeRepository: p.href } : { url: p.href }),
        keywords: p.tech.join(", "),
        author: { "@id": personId },
      };
    });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${SITE_URL}/`,
        name: PERSON_NAME,
        alternateName: [`${PERSON_NAME} Portfolio`, new URL(SITE_URL).hostname.replace(/^www\./, "")],
        description: translations[DEFAULT_LANG].seo.description,
        inLanguage: LANGS,
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profilepage`,
        url,
        name: t.seo.title,
        description: t.seo.description,
        inLanguage: lang,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: { "@id": `${SITE_URL}/#portrait` },
        ...(lastModified && { dateModified: lastModified }),
      },
      {
        "@type": "Person",
        "@id": personId,
        name: PERSON_NAME,
        givenName,
        familyName,
        url: `${SITE_URL}/`,
        mainEntityOfPage: { "@id": `${url}#profilepage` },
        image: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#portrait`,
          url: PORTRAIT.url,
          contentUrl: PORTRAIT.url,
          width: PORTRAIT.width,
          height: PORTRAIT.height,
          caption: t.about.photoAlt,
        },
        jobTitle: t.seo.jobTitle,
        description: t.about.lead,
        email: `mailto:${EMAIL}`,
        address: { "@type": "PostalAddress", addressLocality: "Fès", addressRegion: "Fès-Meknès", addressCountry: "MA" },
        alumniOf: t.education.map((school, i) => ({ "@type": SCHOOL_TYPES[i] || "EducationalOrganization", name: school.org })),
        knowsAbout: KNOWS_ABOUT,
        knowsLanguage: ["ar", "en", "fr"],
        sameAs: contactLinks.map((link) => link.href),
      },
      ...ownWork,
    ],
  };
};

const head = (lang) => {
  const t = translations[lang].seo;
  const url = pageUrl(lang);
  const verification = [
    ["google-site-verification", process.env.REACT_APP_GOOGLE_SITE_VERIFICATION],
    ["msvalidate.01", process.env.REACT_APP_BING_SITE_VERIFICATION],
  ].filter(([, value]) => value);

  return [
    `<title>${esc(t.title)}</title>`,
    `<meta name="description" content="${esc(t.description)}"/>`,
    `<meta name="author" content="${esc(PERSON_NAME)}"/>`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"/>`,
    `<link rel="canonical" href="${url}"/>`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${pageUrl(l)}"/>`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANG)}"/>`,
    ...contactLinks.map((link) => `<link rel="me" href="${esc(link.href)}"/>`),
    `<meta property="og:type" content="profile"/>`,
    `<meta property="og:site_name" content="${esc(PERSON_NAME)}"/>`,
    `<meta property="og:url" content="${url}"/>`,
    `<meta property="og:title" content="${esc(t.title)}"/>`,
    `<meta property="og:description" content="${esc(t.description)}"/>`,
    `<meta property="og:image" content="${OG_IMAGE}"/>`,
    `<meta property="og:image:type" content="image/png"/>`,
    `<meta property="og:image:width" content="1200"/>`,
    `<meta property="og:image:height" content="630"/>`,
    `<meta property="og:image:alt" content="${esc(t.title)}"/>`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}"/>`,
    ...LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}"/>`),
    `<meta property="profile:first_name" content="${esc(givenName)}"/>`,
    `<meta property="profile:last_name" content="${esc(familyName)}"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${esc(t.title)}"/>`,
    `<meta name="twitter:description" content="${esc(t.description)}"/>`,
    `<meta name="twitter:image" content="${OG_IMAGE}"/>`,
    `<meta name="twitter:image:alt" content="${esc(t.title)}"/>`,
    ...verification.map(([name, value]) => `<meta name="${name}" content="${esc(value)}"/>`),
    // Without JavaScript nothing plays the entrance animations: show their end state
    `<noscript><style>#root [style*="opacity"]{opacity:1!important}#root [style*="transform"]:not(.origin-left){transform:none!important}#root span[aria-hidden][class~="origin-top"][class~="bg-surface-2"]{display:none}</style></noscript>`,
  ].join("");
};

// ── Pages ──────────────────────────────────────────────────────────────────────
const template = fs.readFileSync(path.join(BUILD, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error("prerender: build/index.html has no empty #root (already prerendered? run the full build)");
}

const render = (lang) => {
  const app = renderToString(
    React.createElement(React.StrictMode, null, React.createElement(App, { prerendered: true, initialLang: lang }))
  );
  return template
    .replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
    .replace(/<meta name="description"[^>]*>/, "")
    .replace(/<title>[^<]*<\/title>/, () => head(lang))
    .replace(/<noscript>[^<]*<\/noscript>/, "")
    .replace('<div id="root"></div>', () => `<div id="root">${app}</div>`)
    // At the end of the body: 7 kB of JSON-LD in the head would sit in front of the content
    .replace("</body>", () => `<script type="application/ld+json">${JSON.stringify(jsonLd(lang)).replace(/</g, "\\u003c")}</script></body>`);
};

const pages = {};
for (const lang of LANGS) pages[lang] = render(lang);

// ── sitemap.xml and robots.txt ─────────────────────────────────────────────────
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map(
  (lang) => `  <url>
    <loc>${pageUrl(lang)}</loc>${lastModified ? `\n    <lastmod>${lastModified.slice(0, 10)}</lastmod>` : ""}
${[...LANGS.map((l) => [l, pageUrl(l)]), ["x-default", pageUrl(DEFAULT_LANG)]]
  .map(([code, href]) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${href}"/>`)
  .join("\n")}
  </url>`
).join("\n")}
</urlset>
`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

// ── Check the output ───────────────────────────────────────────────────────────
const problems = [];
const check = (ok, message) => ok || problems.push(message);
const seen = { title: new Set(), description: new Set() };

for (const lang of LANGS) {
  const html = pages[lang];
  const t = translations[lang];
  const tag = (re) => (html.match(re) || [])[1];

  check(html.includes(`<html lang="${lang}">`), `${lang}: wrong <html lang>`);
  check((html.match(/<title>/g) || []).length === 1, `${lang}: expected exactly one <title>`);
  check((html.match(/<h1[\s>]/g) || []).length === 1, `${lang}: expected exactly one <h1>`);
  check(/<h1[^>]*>.*?Mehdi Aichouch.*?<\/h1>/s.test(html), `${lang}: the <h1> doesn't contain the name`);
  check(tag(/<link rel="canonical" href="([^"]*)"/) === pageUrl(lang), `${lang}: wrong canonical`);
  check((html.match(/hreflang=/g) || []).length === LANGS.length + 1, `${lang}: wrong number of hreflang links`);
  check(!/noindex/i.test(html), `${lang}: page contains a noindex`);
  check(!html.includes("Aichouche"), `${lang}: misspelt name "Aichouche"`);
  check(!html.includes("mehdi-aichouch.vercel.app"), `${lang}: still references the vercel.app domain`);
  check(t.seo.title.length <= 60, `${lang}: title is ${t.seo.title.length} characters (max 60)`);
  check(t.seo.description.length <= 160, `${lang}: description is ${t.seo.description.length} characters (max 160)`);
  // Every section made it into the HTML
  for (const id of ["home", "about", "portfolio", "skills", "experience", "contact"]) {
    check(html.includes(`<section id="${id}"`), `${lang}: section #${id} is missing from the HTML`);
  }
  check(html.replace(/&#x27;/g, "'").includes(esc(t.experience[0].points[0]).slice(0, 40)), `${lang}: experience text is missing from the HTML`);
  check(!/<img(?![^>]*\salt="[^"]+")[^>]*>/.test(html), `${lang}: an <img> has no alt text`);
  check(seen.title.size === seen.title.add(t.seo.title).size - 1, `${lang}: duplicate title`);
  check(seen.description.size === seen.description.add(t.seo.description).size - 1, `${lang}: duplicate description`);

  try {
    const graph = JSON.parse(tag(/<script type="application\/ld\+json">(.*?)<\/script>/s))["@graph"];
    const person = graph.find((node) => node["@type"] === "Person");
    check(person?.name === PERSON_NAME && person.sameAs.length >= 2, `${lang}: Person schema is incomplete`);
    check(graph.some((node) => node["@type"] === "ProfilePage" && node.mainEntity["@id"] === person["@id"]), `${lang}: ProfilePage doesn't point at the Person`);
  } catch (e) {
    problems.push(`${lang}: JSON-LD doesn't parse (${e.message})`);
  }
}
for (const file of ["mehdi-aichouch.jpg", "og-image.png", "404.html"]) {
  check(fs.existsSync(path.join(BUILD, file)), `build/${file} is missing`);
}

if (problems.length) {
  console.error("prerender: the generated pages have problems:\n  - " + problems.join("\n  - "));
  process.exit(1);
}

// Nothing is written unless every check passed
for (const lang of LANGS) {
  const file = path.join(BUILD, langPath(lang), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, pages[lang]);
}
fs.writeFileSync(path.join(BUILD, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(BUILD, "robots.txt"), robots);

console.log(
  `prerender: wrote ${LANGS.map((l) => `${langPath(l)} (${(pages[l].length / 1024).toFixed(0)} kB)`).join(", ")}, sitemap.xml, robots.txt for ${SITE_URL}`
);
