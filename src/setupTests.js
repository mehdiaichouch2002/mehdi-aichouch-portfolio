import "@testing-library/jest-dom";

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
