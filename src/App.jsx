import { startTransition, useEffect, useState } from "react";
import { domMax, LazyMotion, MotionConfig } from "motion/react";
import About from "./components/About";
import Skills from "./components/Skills";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Portfolio from "./components/Portfolio";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ResumeModalProvider } from "./context/ResumeModalContext";
import { LanguageProvider } from "./context/LanguageContext";
import ResumeLanguageModal from "./components/common/ResumeLanguageModal";
import AIChatAssistant from "./components/chat/AIChatAssistant";
import { startSmoothScroll } from "./lib/smoothScroll";

// The hero renders in the first pass. Everything below the fold renders right after,
// inside a transition, so React time-slices that rendering instead of running it
// inside the initial long task. This keeps Total Blocking Time and INP down.
const useBelowFold = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    startTransition(() => setReady(true));
  }, []);

  // A deep link like /#contact points at a section that didn't exist on first paint
  useEffect(() => {
    if (ready && window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }
  }, [ready]);

  return ready;
};

function App() {
  const belowFold = useBelowFold();
  // Desktop inertial scrolling, loaded when the page is idle (see lib/smoothScroll.js)
  useEffect(() => startSmoothScroll(), []);

  return (
    // Features are passed synchronously on purpose: they're already in the main bundle
    // (m components share the same runtime), and loading them async made LazyMotion
    // re-render the whole app in one long task when they arrived.
    // `strict` makes sure nothing imports the full `motion` component by mistake (use `m`).
    <LazyMotion features={domMax} strict>
      {/* With prefers-reduced-motion, motion drops transforms and keeps opacity fades */}
      <MotionConfig reducedMotion="user">
        <LanguageProvider>
          <ResumeModalProvider>
            {/* isolate: own stacking context for the footer curtain (index.css) */}
            <div className="isolate">
              <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:bg-fg focus:text-canvas focus:px-4 focus:py-2 focus:rounded-sm">
                Skip to content
              </a>
              <NavBar />
              <main id="main" tabIndex={-1} className="page-sheet outline-none">
                <Home />
                {belowFold && (
                  <>
                    <About />
                    <Portfolio />
                    <Skills />
                    <Experience />
                    <Contact />
                  </>
                )}
              </main>
              {belowFold && <Footer />}
              {/* Inside the isolated wrapper so their z-indexes still rank against the
                  nav, the menu and the project dialog */}
              <ResumeLanguageModal />
              <AIChatAssistant />
            </div>
          </ResumeModalProvider>
        </LanguageProvider>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
