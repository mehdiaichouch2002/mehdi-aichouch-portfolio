import { useState, useEffect } from "react";
import { cancelFrame, frame } from "motion/react";

// True once the page is scrolled past `threshold` px. Reads the scroll position in
// the read phase of Motion's frame loop (once per frame, before any style writes, so
// it never forces a style/layout pass) and only sets state when the answer flips.
const useScrolled = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = null;
    const update = () => {
      const next = window.scrollY > threshold;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }
    };
    const onScroll = () => frame.read(update);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelFrame(update);
    };
  }, [threshold]);

  return scrolled;
};

export default useScrolled;
