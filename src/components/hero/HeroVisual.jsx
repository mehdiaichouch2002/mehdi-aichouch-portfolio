import { lazy, Suspense, useEffect, useState } from "react";
import HeroFallback from "./HeroFallback";

const HeroScene = lazy(() => import("./HeroScene"));

// The 3D object only runs where it stays smooth: a large screen with a mouse,
// no reduced-motion preference, a reasonably strong device and working WebGL.
// Everyone else keeps the static fallback, and three.js is never downloaded.
const canRender3D = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches) return false;
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return false;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return false;
  if (navigator.connection?.saveData) return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

// Wait for the page to finish loading, then for an idle moment, so the 3D chunk
// never competes with first paint or the LCP.
const whenIdleAfterLoad = (cb) => {
  let idleId;
  const schedule = () => {
    idleId = window.requestIdleCallback ? window.requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 1200);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    window.removeEventListener("load", schedule);
    if (idleId !== undefined) (window.cancelIdleCallback || clearTimeout)(idleId);
  };
};

// Fixed-ratio box, so nothing shifts when the 3D scene arrives
const HeroVisual = ({ className = "" }) => {
  const [mount3D, setMount3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return undefined;
    // Re-check at fire time: the window may have been resized in the meantime
    return whenIdleAfterLoad(() => canRender3D() && setMount3D(true));
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
