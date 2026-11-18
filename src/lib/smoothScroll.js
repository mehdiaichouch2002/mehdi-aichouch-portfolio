import { cancelFrame, frame } from "motion/react";
import { hasFinePointer } from "./motion";

// Inertial smooth scrolling (Lenis), desktop only: touch devices keep native
// scrolling, which already has momentum and feels wrong when hijacked. Loaded as
// its own small chunk once the page is idle, and skipped with reduced motion.
// Lenis scrolls the real window, so motion's useScroll, sticky elements and
// IntersectionObserver keep working unchanged.

let lenis = null;

export const getLenis = () => lenis;

// Smooth when Lenis runs, native otherwise
export const scrollToTarget = (target, options = {}) => {
  if (lenis) lenis.scrollTo(target, { offset: options.offset ?? 0, immediate: options.immediate });
  else if (typeof target === "number") window.scrollTo({ top: target });
  else target?.scrollIntoView?.();
};

export const startSmoothScroll = () => {
  if (lenis || !hasFinePointer()) return undefined;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

  let cancelled = false;
  let observer;
  // Lenis is stepped from Motion's frame loop (its "update" phase, before Motion's
  // reads and writes) rather than its own requestAnimationFrame: the scroll write then
  // lands before the frame's style writes instead of after them, which would force
  // an extra style/layout pass every frame.
  const step = ({ timestamp }) => lenis?.raf(timestamp);
  const run = () =>
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        // In-page <a href="#id"> links: smooth. Lenis honours the page's
        // scroll-padding-top (the fixed header), so no extra offset here.
        anchors: true,
        // Chat history, dialogs and other scroll boxes scroll on their own
        allowNestedScroll: true,
        prevent: (node) => !!node.closest?.("[role='dialog'], [data-lenis-prevent]"),
      });
      // Modals lock the page with body.overflow-hidden: pause Lenis meanwhile
      const sync = () => (document.body.classList.contains("overflow-hidden") ? lenis.stop() : lenis.start());
      observer = new MutationObserver(sync);
      observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
      sync();
      frame.update(step, true);
    });

  const id = window.requestIdleCallback ? window.requestIdleCallback(run, { timeout: 2000 }) : setTimeout(run, 600);
  return () => {
    cancelled = true;
    (window.cancelIdleCallback || clearTimeout)(id);
    cancelFrame(step);
    observer?.disconnect();
    lenis?.destroy();
    lenis = null;
  };
};
