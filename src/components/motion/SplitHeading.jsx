import { Fragment } from "react";
import { m } from "motion/react";
import { DUR, EASE } from "../../lib/motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const word = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: DUR.slow, ease: EASE } },
};

// Short headings only: each word slides up from behind its own mask, once.
// The full text stays in the DOM as normal text, so screen readers read it as one string.
const SplitHeading = ({ as = "h2", text, className = "", ...rest }) => {
  const Tag = m[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      {...rest}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
            <m.span className="inline-block" variants={word}>
              {w}
            </m.span>
          </span>
          {/* The space sits between masks so words still wrap normally */}
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
};

export default SplitHeading;
