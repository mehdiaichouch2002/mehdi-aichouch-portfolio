// Captures desktop + mobile screenshots of the live client stores (and this site)
// for the project covers. Output: scripts/covers/.shots/<name>-{desktop,mobile}.png
//
//   npm i --no-save puppeteer-core
//   node scripts/covers/capture.js [name]        # e.g. node scripts/covers/capture.js edwin
//
// The portfolio shot expects the production build served on :5232
// (CI=false npm run build && cd build && python -m http.server 5232).
// CHROME env var overrides the Chrome path.
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = path.join(__dirname, ".shots");

const SITES = {
  // closeModals: store/language picker; click: its close button on desktop, which has no label to find it by
  anita: { url: "https://www.anita.com/en/", closeModals: true, click: { desktop: [970, 166] } },
  // The home hero is a video headless Chrome can't decode: the category page shows the products instead
  edwin: { url: "https://edwin-europe.com/gb-en/men" },
  carhartt: { url: "https://b2b.carhartt-wip.com/" },
  portfolio: { url: "http://127.0.0.1:5232/" },
};

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};

const UA = {
  desktop: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  mobile: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Accepts cookie banners (including ones inside shadow roots), then closes any store/language picker modal
const clearOverlays = (page) =>
  page.evaluate(() => {
    const accept = /^(accept all|allow all|alles akzeptieren|accept|ok)$/i;
    const scan = (root) => {
      for (const el of root.querySelectorAll("button, a, [role=button]")) {
        if (accept.test(el.textContent.trim())) {
          el.click();
          return true;
        }
      }
      for (const el of root.querySelectorAll("*")) if (el.shadowRoot && scan(el.shadowRoot)) return true;
      return false;
    };
    scan(document);
  });

const closeModals = (page) =>
  page.evaluate(() => {
    for (const el of document.querySelectorAll(".modal-popup._show .action-close, .modal-popup._show [class*='close'], [aria-label='Close'], [aria-label='close']")) {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) el.click();
    }
  });

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv[2];
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--hide-scrollbars", "--lang=en-US"] });

  for (const [name, { url, closeModals: close, click }] of Object.entries(SITES)) {
    if (only && only !== name) continue;
    for (const [kind, viewport] of Object.entries(VIEWPORTS)) {
      const page = await browser.newPage();
      await page.setUserAgent(UA[kind]);
      await page.setViewport(viewport);
      if (name === "portfolio") await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      try {
        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
      } catch (e) {
        console.warn(name, kind, e.message);
      }
      await wait(4000);
      await clearOverlays(page);
      await wait(1500);
      if (close) await page.keyboard.press("Escape");
      if (close) await closeModals(page);
      if (click?.[kind]) await page.mouse.click(...click[kind]);
      await wait(2500);
      const file = path.join(OUT, `${name}-${kind}.png`);
      await page.screenshot({ path: file });
      console.log("saved", path.relative(process.cwd(), file));
      await page.close();
    }
  }
  await browser.close();
})();
