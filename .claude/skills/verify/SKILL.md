---
name: verify
description: Build, serve and visually verify this portfolio (responsiveness + form flows)
---

# Verifying the portfolio

CRA app, no router — single page with scroll sections (`#home`, `#about`, `#portfolio`, `#skills`, `#experience`, `#contact`). Sections below the hero mount right after first paint (inside `startTransition`) and fade in on scroll (`whileInView`), so scroll through the page before full-page screenshots or measuring them.

## Build & serve

```bash
CI=false npm run build          # CRA production build
cd build && python3 -m http.server 5232 --bind 127.0.0.1 &
```

(`npx serve` also works but is slow to boot; check the port isn't already bound before assuming failure.)

## Unit tests

```bash
CI=true npx react-scripts test --watchAll=false
```

Gotchas already handled in the repo:
- `react-markdown`/`remark-gfm` are ESM-only → mocked via `jest.moduleNameMapper` in package.json → `src/__mocks__/`.
- `src/setupTests.js` mocks `matchMedia`, `IntersectionObserver`, `scrollIntoView`, loads motion features synchronously and skips animations (jsdom has no layout), and clears `localStorage` after each test (language choice persists there and leaks between tests otherwise).

## Responsiveness / visual checks

Drive with `puppeteer-core` + system Chrome (`/usr/bin/google-chrome`,
args `--no-sandbox --disable-gpu --hide-scrollbars`). Do NOT use bare
`google-chrome --headless --screenshot` — its window-size handling
renders a bogus layout at small widths.

Key checks:
- `document.documentElement.scrollWidth <= viewport` at 320/390/768/1024/1440. Note `html,body { overflow-x: clip }` masks overflow from scrollWidth — also scan `getBoundingClientRect()` of all elements for rects past the viewport edges. Expected false positives: the mobile menu parked off-screen at `translate-x-full` (`data-offscreen-ok`) and the decorative hero visual (`aria-hidden`), which deliberately bleeds past the right edge inside an `overflow-hidden` hero.
- Hero headline: the French headline is the longest — set `localStorage.setItem("lang","fr")`, reload, and check the h1 wraps inside the text column at 320px and 390px without overflowing. The hero CTAs ("See my work", "Get in touch", "Download resume") should be above the fold at 1440×720 in both languages. The desktop nav appears at ≥1024px; below that it's the hamburger (French labels overflow at 768px otherwise).
- Contact form: fill `#contact-name`/`#contact-email`/`#contact-message`, submit, assert `[role="alert"]` messages. Form is `noValidate` — validation is custom and bilingual.
- Smooth scrolling is on (`scroll-behavior: smooth`), so jump with `window.scrollTo({top, behavior: "instant"})` before screenshots, or you'll capture mid-scroll.
- AI chat: click `button[aria-label="Toggle AI Assistant"]`; window must fit a 320×600 viewport.
- Hero stack: four `.hs-layer` elements and four readable `.hs-label`s (not squashed: each label's rect height should be ~11px) at ≥1280px, with labels inside the viewport at 1280/1440 in both languages (the French "e-commerce"/"données" are the longest). Moving the mouse over the visual should add `is-open` to `.hs-root`. With `prefers-reduced-motion: reduce` the layers are spread out at once and nothing loops.
- Case study: clicking a card's "Case study"/"Details" button opens a `role="dialog"`; Escape must remove it from the DOM, clear `body.overflow-hidden`, and return focus to the button.
- Lighthouse mobile: `npx lighthouse <url> --form-factor=mobile --chrome-flags="--headless=new"`. Total Blocking Time varies between runs by ±100ms, so run it 2–3 times.
