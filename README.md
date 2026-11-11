# mehdi-aichouch-portfolio

My personal portfolio, live at **[mehdiaichouch.com](https://www.mehdiaichouch.com)**.

Full-stack developer in Fès, Morocco. Most recently Magento 2 / Adobe Commerce stores for European brands.

## What's inside

- **React 18 + Tailwind CSS 3**, single page, English (`/`) and French (`/fr`)
- **Prerendered**: the build renders both languages to static HTML with their own meta tags, hreflang and JSON-LD (`scripts/seo/prerender.js`), and the browser hydrates it. Notes in [`docs/SEO.md`](docs/SEO.md)
- **"The stack"**: the hero visual, four glass layers (interface, commerce, API, data) with a request travelling through them, in pure CSS 3D (no WebGL, so it paints with the first frame on every device)
- **Motion** for reveals and shared-element transitions, Lenis smooth scrolling on desktop, `prefers-reduced-motion` respected throughout
- **AI assistant** that answers questions about my work (OpenRouter, streamed)
- **Project covers** generated from live screenshots and HTML mockups (`scripts/covers/`)
- Lighthouse 100 on mobile and desktop

## Run it

```bash
npm install
cp .env.example .env               # EmailJS (contact form) and OpenRouter (AI chat) keys
npm start                          # http://localhost:3000
CI=false npm run build             # production build + prerender in build/
CI=true npx react-scripts test --watchAll=false
```
