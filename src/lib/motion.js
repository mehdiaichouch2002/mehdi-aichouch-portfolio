// Motion tokens, mirrored from the CSS variables in src/index.css.
// One easing curve and three durations for the whole site.
export const EASE = [0.22, 1, 0.36, 1];
export const DUR = { fast: 0.15, base: 0.4, slow: 0.8 };

// Fade-up on enter, played once. Spread onto an `m.*` element.
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: DUR.slow, ease: EASE, delay },
});

// Parent/child variants for staggered lists
export const stagger = (step = 0.06) => ({
  hidden: {},
  show: { transition: { staggerChildren: step } },
});
export const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base * 1.5, ease: EASE } },
};

// True when the device has a mouse/trackpad (hover effects, magnetism, tilt)
export const hasFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
