// Google Analytics 4, off by default. It only loads when REACT_APP_GA_MEASUREMENT_ID
// is set at build time (see .env.example), in the production build, once the page is
// idle, and never for visitors who send Do Not Track or Global Privacy Control.
// Consent Mode keeps every storage type denied, so GA sets no cookies and only
// receives anonymous, cookieless pings. If a consent banner is added later, call
// gtag("consent", "update", { analytics_storage: "granted" }) from it.
const ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

export const startAnalytics = () => {
  if (!ID || process.env.NODE_ENV !== "production") return;
  if (navigator.doNotTrack === "1" || navigator.globalPrivacyControl) return;

  const load = () => {
    window.dataLayer = window.dataLayer || [];
    // gtag.js reads the `arguments` objects themselves, so this can't be an arrow function
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", ID);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ID)}`;
    document.head.appendChild(script);
  };

  if (window.requestIdleCallback) window.requestIdleCallback(load, { timeout: 4000 });
  else setTimeout(load, 2500);
};
