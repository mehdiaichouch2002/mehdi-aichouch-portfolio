// A monochrome landscape drawn in ASCII: three mountain ridges, the far ones
// lighter, filled with a density ramp. Built once at module load from fixed
// math (no randomness, no clock), so the prerendered HTML and the browser agree.
// Purely decorative; styles: .ascii-field in index.css.

const COLS = 240;
const ROWS = 26;
const RAMP = " .,:-=+*#%";

const ridge = (x, seed, base, amp) =>
  base -
  amp *
    (0.55 * Math.sin(x * 0.045 + seed) +
      0.3 * Math.sin(x * 0.11 + seed * 2.3) +
      0.15 * Math.sin(x * 0.27 + seed * 4.1));

// Back to front: each ridge covers the ones behind it
const RIDGES = [
  { seed: 1.7, base: 10, amp: 7, tone: 1 },
  { seed: 4.2, base: 16, amp: 6, tone: 3 },
  { seed: 0.6, base: 22, amp: 4, tone: 5 },
];

const build = () => {
  const lines = [];
  for (let y = 0; y < ROWS; y++) {
    let line = "";
    for (let x = 0; x < COLS; x++) {
      let ch = " ";
      for (const { seed, base, amp, tone } of RIDGES) {
        const top = Math.round(ridge(x, seed, base, amp));
        if (y === top) {
          const slope = Math.round(ridge(x + 1, seed, base, amp)) - top;
          ch = slope < 0 ? "/" : slope > 0 ? "\\" : "_";
        } else if (y > top) {
          // One step denser every few rows down the slope, with a sparse fixed dither
          const step = Math.floor((y - top) / 4) + ((x * 7 + y * 13) % 11 === 0 ? 1 : 0);
          ch = (x + y) % 2 && tone < 3 ? " " : RAMP[Math.min(RAMP.length - 1, tone + step)];
        }
      }
      line += ch;
    }
    lines.push(line.replace(/\s+$/, ""));
  }
  return lines.join("\n");
};

const ART = build();

const AsciiField = ({ className = "" }) => (
  // suppressHydrationWarning: Math.sin may differ in the last bit between JS engines
  <pre className={`ascii-field ${className}`} aria-hidden="true" suppressHydrationWarning>
    {ART}
  </pre>
);

export default AsciiField;
