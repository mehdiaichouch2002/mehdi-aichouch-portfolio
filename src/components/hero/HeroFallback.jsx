// Static stand-in for the 3D object: same box, same palette, zero JS cost.
// Rendered first everywhere, and kept as the final visual on mobile,
// low-end devices and with prefers-reduced-motion.
const HeroFallback = () => (
  <div className="absolute inset-0" aria-hidden="true">
    {/* Iridescent halo */}
    <div
      className="absolute inset-[16%] rounded-full opacity-50 blur-3xl"
      style={{ background: "conic-gradient(from 210deg, #4cc9ff, #9d8cff, #ffb8e6, #9ff5dc, #4cc9ff)" }}
    />
    {/* Glossy dark sphere with a chrome rim */}
    <div
      className="absolute inset-[18%] rounded-full"
      style={{
        background:
          "radial-gradient(circle at 34% 28%, rgb(255 255 255 / 0.22) 0%, transparent 18%), radial-gradient(circle at 50% 50%, #17181d 0%, #0d0d10 62%, #0a0a0b 100%)",
        boxShadow:
          "inset 0 0 0 1px rgb(255 255 255 / 0.07), inset -28px -36px 80px rgb(76 201 255 / 0.22), inset 30px 26px 70px rgb(255 184 230 / 0.10)",
      }}
    />
  </div>
);

export default HeroFallback;
