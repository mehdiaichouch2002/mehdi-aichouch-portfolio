import { LazyMotion, MotionConfig } from "motion/react";
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

import loadMotionFeatures from "./lib/loadMotionFeatures";

// `strict` makes sure nothing imports the full `motion` component by mistake (use `m`).

function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {/* With prefers-reduced-motion, motion drops transforms and keeps opacity fades */}
      <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <ResumeModalProvider>
          <div>
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:bg-fg focus:text-canvas focus:px-4 focus:py-2 focus:rounded-sm">
              Skip to content
            </a>
            <NavBar />
            <main id="main" tabIndex={-1} className="outline-none">
              <Home />
              <About />
              <Portfolio />
              <Skills />
              <Experience />
              <Contact />
            </main>
            <Footer />
          </div>
          <ResumeLanguageModal />
          <AIChatAssistant />
        </ResumeModalProvider>
      </LanguageProvider>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
