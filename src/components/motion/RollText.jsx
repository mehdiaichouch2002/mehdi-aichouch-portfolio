// Button label that rolls up on hover: the text slides out the top while a copy
// slides in from below. CSS only (.roll in index.css), mouse/trackpad only.
// The copy is aria-hidden, so the label is read once.
const RollText = ({ children }) => (
  <span className="roll">
    <span className="roll-a">{children}</span>
    <span className="roll-b" aria-hidden="true">
      {children}
    </span>
  </span>
);

export default RollText;
