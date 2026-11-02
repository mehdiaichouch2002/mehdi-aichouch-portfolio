import { useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { hasFinePointer } from "../../lib/motion";

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

// Pulls its child a few pixels toward the cursor while hovered, then springs back.
// Mouse/trackpad only; does nothing on touch or with reduced motion.
const Magnetic = ({ strength = 0.25, className = "", children }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const onMove = (e) => {
    if (reduce || !hasFinePointer()) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`inline-flex ${className}`}
    >
      {children}
    </m.span>
  );
};

export default Magnetic;
