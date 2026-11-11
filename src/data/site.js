// The one canonical origin of the site. It has to be the host that answers 200:
// Vercel redirects mehdiaichouch.com (308) to www, so www is the canonical one.
// If the primary domain is ever switched in Vercel, change it here only: the
// canonical URL, hreflang, Open Graph, JSON-LD, sitemap.xml and robots.txt are
// all generated from this file at build time (scripts/seo/prerender.js).
export const SITE_URL = "https://www.mehdiaichouch.com";

export const PERSON_NAME = "Mehdi Aichouch";

// Each language has its own URL: English at the root, French under /fr
export const LANGS = ["en", "fr"];
export const DEFAULT_LANG = "en";
export const langPath = (lang) => (lang === DEFAULT_LANG ? "/" : `/${lang}`);
export const langFromPath = (pathname = "/") => {
  const first = pathname.split("/")[1];
  return LANGS.includes(first) ? first : DEFAULT_LANG;
};
