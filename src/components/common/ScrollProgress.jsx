import { useEffect, useRef } from "react";
import { cancelFrame, frame } from "motion/react";

// Thin line at the top of the header showing how far down the page the visitor is.
// Writes the transform directly instead of re-rendering on scroll. The read and the
// write go through Motion's frame loop (all reads, then all writes), so this doesn't
// force an extra style/layout pass after Motion's own scroll-linked writes.
const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let progress = 0;
    // The scrollable length only changes when the page or the window resizes
    let max = -1;

    const write = () => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const read = () => {
      if (max < 0) max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      frame.render(write);
    };
    const onScroll = () => frame.read(read);
    const onResize = () => {
      max = -1;
      onScroll();
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    onScroll(); // first read in a frame, not during mount (avoids a forced reflow)
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelFrame(read);
      cancelFrame(write);
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
