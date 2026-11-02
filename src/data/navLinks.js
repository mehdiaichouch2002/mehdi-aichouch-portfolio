// Order matches the sections in App.jsx; `link` is the section's `name` attribute
const navLinks = [
  { id: 1, link: "home" },
  { id: 2, link: "about" },
  { id: 3, link: "portfolio" },
  { id: 4, link: "skills" },
  { id: 5, link: "experience" },
  { id: 6, link: "contact" },
];

// "01", "02"… for the micro-labels; home has no number
export const sectionNumber = (link) => {
  const i = navLinks.findIndex((n) => n.link === link);
  return i > 0 ? String(i).padStart(2, "0") : "";
};

export default navLinks;
