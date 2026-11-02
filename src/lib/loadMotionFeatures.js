// Animation features (including layout animations for the case-study transition)
// load as their own request after the first render. Tests swap this for the
// synchronous feature object (see setupTests.js).
const loadMotionFeatures = () => import("./motionFeatures").then((mod) => mod.default);

export default loadMotionFeatures;
