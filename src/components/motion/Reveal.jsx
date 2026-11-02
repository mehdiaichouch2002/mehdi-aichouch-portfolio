import { m } from "motion/react";
import { fadeUp } from "../../lib/motion";

// Fade-up once when the element enters the viewport.
// `as` picks the element (div, li, article…), so it can replace a wrapper 1:1.
const Reveal = ({ as = "div", delay = 0, children, ...rest }) => {
  const Tag = m[as];
  return (
    <Tag {...fadeUp(delay)} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
