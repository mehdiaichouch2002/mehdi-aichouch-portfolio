import { lazy, Suspense, useEffect, useState } from "react";
import HeroFallback from "./HeroFallback";

const HeroScene = lazy(() => import("./HeroScene"));

// The 3D object only runs where it stays smooth: a large screen with a mouse,
// no reduced-motion preference, a reasonably strong device and no Save-Data.
// Everyone else keeps the static fallback, and three.js is never downloaded.
const deviceQualifies = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches) return false;
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false;
  if (navigator.connection?.saveData) return false;
  return true;
};

// Creating a WebGL context can block the main thread for a long time, so this probe
// only runs in the deferred callback, never during page load, and is released at once.
const hasWebGL = () => {
  try {
    const gl = document.createElement("canvas").getContext("webgl2") || document.createElement("canvas").getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
};

// Start loading the 3D chunk on the visitor's first sign of activity (a desktop
// visitor moves the mouse almost immediately), or a few seconds after load at the
// latest, during idle time. Parsing three.js and compiling the shader then never
// competes with first paint, the LCP or the page settling down.
const INTENT_EVENTS = ["pointermove", "scroll", "keydown"];
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
    // Re-check at fire time: the window may have been resized in the meantime
    return whenVisitorIsActive(() => deviceQualifies() && hasWebGL() && setMount3D(true));
  }, []);

  return (
    <div className={`aspect-square ${className}`} aria-hidden="true">
      <div className="relative h-full w-full">
        <HeroFallback sphereHidden={ready} />
        {mount3D && (
          <Suspense fallback={null}>
            <div className={`absolute inset-0 transition-opacity duration-slow ease-out ${ready ? "opacity-100" : "opacity-0"}`}>
              <HeroScene onReady={() => setReady(true)} />
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default HeroVisual;
