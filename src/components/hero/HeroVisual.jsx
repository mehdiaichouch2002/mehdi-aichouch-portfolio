import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import HeroFallback from "./HeroFallback";

const HeroScene = lazy(() => import("./HeroScene"));

// The 3D object runs on desktops and phones alike (it is plain WebGL, a few kB).
// It is skipped with reduced motion, Save-Data and on very weak devices, which
// keep the static fallback. WebGL support is checked by HeroScene itself.
const deviceQualifies = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (navigator.deviceMemory && navigator.deviceMemory < 2) return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false;
  if (navigator.connection?.saveData) return false;
  return true;
};

// Start loading the 3D chunk on the visitor's first sign of activity (a desktop
// visitor moves the mouse almost immediately, a phone visitor touches or scrolls),
// or a few seconds after load at the latest, during idle time. Compiling the shader then never
// competes with first paint, the LCP or the page settling down.
const INTENT_EVENTS = ["pointermove", "pointerdown", "scroll", "keydown"];
const FALLBACK_DELAY = 4000;

const whenVisitorIsActive = (cb) => {
  let done = false;
  let timer;
  let idleId;
  const fire = () => {
    if (done) return;
    done = true;
    cleanup();
    idleId = window.requestIdleCallback ? window.requestIdleCallback(cb, { timeout: 1000 }) : setTimeout(cb, 0);
  };
  const startTimer = () => {
    timer = setTimeout(fire, FALLBACK_DELAY);
  };
  const cleanup = () => {
    INTENT_EVENTS.forEach((e) => window.removeEventListener(e, fire));
    window.removeEventListener("load", startTimer);
    clearTimeout(timer);
  };

  INTENT_EVENTS.forEach((e) => window.addEventListener(e, fire, { once: true, passive: true }));
  if (document.readyState === "complete") startTimer();
  else window.addEventListener("load", startTimer, { once: true });

  return () => {
    done = true;
    cleanup();
    if (idleId !== undefined) (window.cancelIdleCallback || clearTimeout)(idleId);
  };
};

// Fixed-ratio box, so nothing shifts when the 3D scene arrives
const HeroVisual = ({ className = "" }) => {
  const [mount3D, setMount3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!deviceQualifies()) return undefined;
    return whenVisitorIsActive(() => setMount3D(true));
  }, []);

  const onReady = useCallback(() => setReady(true), []);
  // No WebGL, a failed shader or a lost context: back to the static sphere
  const onFail = useCallback(() => {
    setReady(false);
    setMount3D(false);
  }, []);

  return (
    <div className={`aspect-square ${className}`} aria-hidden="true">
      <div className="relative h-full w-full">
        <HeroFallback sphereHidden={ready} />
        {mount3D && (
          <Suspense fallback={null}>
            <div className={`absolute inset-0 transition-opacity duration-slow ease-out ${ready ? "opacity-100" : "opacity-0"}`}>
              <HeroScene onReady={onReady} onFail={onFail} />
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default HeroVisual;
