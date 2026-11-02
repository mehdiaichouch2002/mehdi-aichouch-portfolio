import "@testing-library/jest-dom";

// Give <LazyMotion> its features synchronously so no state update lands after a test
jest.mock("./lib/loadMotionFeatures", () => ({
  __esModule: true,
  default: require("motion/react").domMax,
}));

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

window.scrollTo = window.scrollTo || (() => {});
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || (() => {});

// App state (e.g. selected language) persists in localStorage;
// isolate tests from each other
afterEach(() => {
  localStorage.clear();
});
