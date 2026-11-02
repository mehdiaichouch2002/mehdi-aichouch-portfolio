import { useEffect, useRef } from "react";

// Thin line at the top of the header showing how far down the page the visitor is.
// Writes the transform directly (once per frame) instead of re-rendering on scroll.
const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    onScroll(); // first read in a frame, not during mount (avoids a forced reflow)
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="absolute top-0 inset-x-0 h-[2px] pointer-events-none" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};

export default ScrollProgress;
