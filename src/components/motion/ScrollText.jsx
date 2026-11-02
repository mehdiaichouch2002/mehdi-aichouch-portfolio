import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

// One word whose opacity follows the scroll position. Opacity only, driven by a
// motion value, so scrolling never re-renders React.
const Word = ({ progress, range, children }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <m.span style={{ opacity }} className="inline">
      {children}
    </m.span>
  );
};

// Paragraph that "reads itself" as it scrolls through the viewport: words light up
// from dim to full. Split by word, never by letter. Plain text with reduced motion.
const ScrollText = ({ text, className = "" }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {/* Screen readers get the sentence once, not word by word */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
            {i < words.length - 1 && " "}
          </Word>
        ))}
      </span>
    </p>
  );
};

export default ScrollText;
