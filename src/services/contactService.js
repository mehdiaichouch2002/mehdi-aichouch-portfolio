const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// EmailJS is only downloaded when someone actually sends a message
export const submitContact = async (data) => {
  const { default: emailjs } = await import("@emailjs/browser");
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
};
