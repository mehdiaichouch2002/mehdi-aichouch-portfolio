import { useEffect, useState } from "react";

// True while the visitor scrolls down past the hero, false as soon as they scroll
// up (or are near the top). Read once per frame; React only re-renders on a change.
const useHideOnScroll = ({ offset = 160, threshold = 6 } = {}) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = null;
    const update = () => {
      frame = null;
      const y = window.scrollY;
      const delta = y - last;
      if (y < offset) setHidden(false);
      else if (delta > threshold) setHidden(true);
      else if (delta < -threshold) setHidden(false);
      if (Math.abs(delta) > threshold || y < offset) last = y;
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [offset, threshold]);

  return hidden;
};

export default useHideOnScroll;
