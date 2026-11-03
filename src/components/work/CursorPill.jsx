import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { DUR, EASE, hasFinePointer } from "../../lib/motion";

const SPRING = { stiffness: 500, damping: 40, mass: 0.6 };

// "Case study →" pill that replaces the cursor over project cards (mouse/trackpad only).
// The cards call show(label, event) / show(null) through a ref; position lives in
// motion values, so following the pointer never re-renders React.
const CursorPill = forwardRef((_, ref) => {
  const [enabled] = useState(hasFinePointer);
  const [label, setLabel] = useState(null);
  const reduce = useReducedMotion();
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);
  const lastLabel = useRef(null);
  const shown = useRef(""); // text kept during the fade-out

  useImperativeHandle(ref, () => ({
    show: (next, e) => {
      if (!enabled) return;
      if (next && !lastLabel.current && e) {
        // Appear where the pointer is, not sliding in from the last spot
        rawX.jump(e.clientX);
        rawY.jump(e.clientY);
        springX.jump(e.clientX);
        springY.jump(e.clientY);
      }
      if (next !== lastLabel.current) {
        lastLabel.current = next;
        if (next) shown.current = next;
        setLabel(next);
      }
    },
  }));

  useEffect(() => {
    if (!enabled || !label) return undefined;
    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    // Scrolling moves the page under a still pointer: hide until it moves again
    const onScroll = () => {
      lastLabel.current = null;
      setLabel(null);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled, label, rawX, rawY]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[55]"
      style={{ x: reduce ? rawX : springX, y: reduce ? rawY : springY }}
    >
      {/* Centering lives on its own element: motion's scale would overwrite the translate */}
      <div className="-translate-x-1/2 -translate-y-1/2">
        <m.div
          className="whitespace-nowrap rounded-full bg-accent px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-canvas shadow-glow"
          initial={false}
          animate={label ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
          transition={{ duration: DUR.base, ease: EASE }}
        >
          {label ?? shown.current} →
        </m.div>
      </div>
    </m.div>
  );
});

export default CursorPill;
