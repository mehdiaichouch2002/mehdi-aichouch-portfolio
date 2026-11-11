import "@testing-library/jest-dom";

// jsdom has no layout, so layout/exit animations would never settle: finish them instantly
require("motion/react").MotionGlobalConfig.skipAnimations = true;

// jsdom doesn't implement these browser APIs used by
// motion (whileInView, useScroll)
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      media: "",
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };
  };

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver =
  window.IntersectionObserver || MockIntersectionObserver;
window.ResizeObserver = window.ResizeObserver || MockIntersectionObserver;

window.scrollTo = window.scrollTo || (() => {});
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || (() => {});

// The selected language persists in localStorage and in the URL (/fr);
// isolate tests from each other
afterEach(() => {
  localStorage.clear();
  window.history.replaceState(null, "", "/");
});
