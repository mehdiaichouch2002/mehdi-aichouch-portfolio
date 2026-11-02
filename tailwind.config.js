/** @type {import('tailwindcss').Config} */

// Every color is a semantic CSS variable (defined in src/index.css as "R G B"
// triplets) so a light theme only has to redefine the variables.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // Replaces (not extends) the default scale: only these two weights are loaded,
    // so classes like font-bold don't exist and can't trigger faux-bold.
    fontWeight: {
      normal: "400",
      semibold: "600",
    },
    extend: {
      colors: {
        canvas: token("bg"),
        surface: { DEFAULT: token("surface"), 2: token("surface-2") },
        fg: token("text"),
        muted: token("muted"),
        line: { DEFAULT: token("border"), strong: token("border-strong") },
        accent: { DEFAULT: token("accent"), soft: "var(--accent-soft)" },
        live: token("live"), // only for the "live store" status dot
        danger: token("danger"),
      },
      fontFamily: {
        sans: ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        panel: "var(--shadow-panel)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },
      maxWidth: {
        page: "var(--page-max)",
      },
      spacing: {
        nav: "var(--nav-h)",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
