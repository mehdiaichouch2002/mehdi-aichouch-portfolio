import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { hasFinePointer } from "../lib/motion";

const SPRING = { stiffness: 180, damping: 20, mass: 0.5 };

// Cursor effects for cards:
// - spotlight: writes --mx/--my on the element (read by .spotlight::before in index.css)
// - tilt (optional): a few degrees of rotateX/rotateY toward the cursor, as springs
// Both bypass React state, so moving the mouse never re-renders the card.
const usePointerCard = ({ tilt = 0 } = {}) => {
  const reduce = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);

  const onPointerMove = (e) => {
    if (!hasFinePointer()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (tilt && !reduce) {
      rotateY.set((px - 0.5) * tilt * 2);
      rotateX.set((0.5 - py) * tilt * 2);
    }
  };
  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return {
    handlers: { onPointerMove, onPointerLeave },
    style: tilt ? { rotateX, rotateY, transformPerspective: 1200 } : undefined,
  };
};

export default usePointerCard;
