import HeroFallback from "./HeroFallback";

// Fixed-ratio box for the hero object, so nothing shifts when the 3D scene arrives
const HeroVisual = ({ className = "" }) => (
  <div className={`aspect-square ${className}`} aria-hidden="true">
    <div className="relative h-full w-full">
      <HeroFallback />
    </div>
  </div>
);

export default HeroVisual;
