import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { FiArrowUpRight, FiCheck, FiCopy, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import useContactForm from "../hooks/useContactForm";
import LoadingOverlay from "./common/LoadingOverlay";
import Notification from "./common/Notification";
import SectionHeader from "./common/SectionHeader";
import Magnetic from "./motion/Magnetic";
import Reveal from "./motion/Reveal";
import RollText from "./motion/RollText";
import { useLanguage } from "../context/LanguageContext";
import { useResumeModal } from "../context/ResumeModalContext";
import { contactLinks, EMAIL } from "../data/contactLinks";
import { DUR, EASE } from "../lib/motion";

// Copies the address and confirms in place for 2s (icon swap + a polite live region)
const CopyEmail = ({ label, doneLabel }) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const swap = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: DUR.fast * 1.5, ease: EASE },
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      title={label}
      className={`grid h-11 shrink-0 grid-cols-[auto] place-items-center overflow-hidden rounded-full px-3 font-mono text-[0.72rem] transition-colors duration-fast ${
        copied ? "text-live" : "text-muted hover:text-accent"
      }`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {copied ? (
          <m.span key="done" {...swap} className="inline-flex items-center gap-1.5">
            <FiCheck aria-hidden="true" />
            {/* Icon only on phones, where the text would squeeze the address */}
            <span className="hidden sm:inline" aria-hidden="true">{doneLabel}</span>
          </m.span>
        ) : (
          <m.span key="copy" {...swap} className="inline-flex">
            <FiCopy aria-hidden="true" />
          </m.span>
        )}
      </AnimatePresence>
      <span className="sr-only" role="status">
        {copied ? doneLabel : ""}
      </span>
    </button>
  );
};

const LINK_ICONS = { LinkedIn: FiLinkedin, GitHub: FiGithub };

const inputClass = (hasError) =>
  `w-full rounded-sm border bg-canvas px-4 py-3 text-fg placeholder-muted/60 transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-accent/25 ${
    hasError ? "border-danger focus:border-danger" : "border-line hover:border-line-strong focus:border-accent"
  }`;

const Contact = () => {
  const { formData, formErrors, isLoading, notification, handleChange, handleSubmit, setNotification } = useContactForm();
  const { t } = useLanguage();
  const { open: openResume } = useResumeModal();

  // Called as a function (not <Field/>) so inputs keep focus between renders
  const Field = ({ id, name, label, children }) => (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
        {label}
      </label>
      {children}
      {formErrors[name] && (
        <p role="alert" id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {t(`contact.errors.${name}`)}
        </p>
      )}
    </div>
  );

  const rowBase = "group flex min-h-[56px] items-center gap-4 py-3 text-fg transition-colors duration-fast hover:text-accent";
  const rowClass = `${rowBase} border-b border-line`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_50%_60%_at_20%_0%,rgb(var(--accent)/0.08),transparent)]" aria-hidden="true" />
      <div className="page grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <SectionHeader id="contact-title" section="contact" title={t("contact.title")} intro={t("contact.subtitle")} />

          <p className="eyebrow mt-12">{t("contact.direct")}</p>
          <ul className="mt-3 border-t border-line">
            <li className="flex items-center border-b border-line">
              <a href={`mailto:${EMAIL}`} className={`${rowBase} min-w-0 flex-1`}>
                <FiMail className="shrink-0 text-muted group-hover:text-accent" aria-hidden="true" />
                <span className="break-all">{EMAIL}</span>
              </a>
              <CopyEmail label={t("contact.copyEmail")} doneLabel={t("contact.copied")} />
            </li>
            {contactLinks.map(({ label, href }) => {
              const Icon = LINK_ICONS[label];
              return (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className={rowClass}>
                    {Icon && <Icon className="shrink-0 text-muted group-hover:text-accent" aria-hidden="true" />}
                    <span className="flex-1">{label}</span>
                    <FiArrowUpRight className="text-muted transition-transform duration-fast ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
            <li>
              <button onClick={openResume} className={`${rowClass} w-full text-left`}>
                <FiDownload className="shrink-0 text-muted group-hover:text-accent" aria-hidden="true" />
                {t("contact.resume")}
              </button>
            </li>
          </ul>
        </div>

        <Reveal delay={0.1} className="lg:mt-[4.5rem]">
        <form onSubmit={handleSubmit} noValidate className="card flex flex-col gap-6 p-6 md:p-10">
          {Field({
            id: "contact-name",
            name: "name",
            label: t("contact.nameLabel"),
            children: (
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!formErrors.name}
                aria-describedby={formErrors.name ? "contact-name-error" : undefined}
                className={inputClass(formErrors.name)}
              />
            ),
          })}
          {Field({
            id: "contact-email",
            name: "email",
            label: t("contact.emailLabel"),
            children: (
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "contact-email-error" : undefined}
                className={inputClass(formErrors.email)}
              />
            ),
          })}
          {Field({
            id: "contact-message",
            name: "message",
            label: t("contact.messageLabel"),
            children: (
              <textarea
                id="contact-message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={!!formErrors.message}
                aria-describedby={formErrors.message ? "contact-message-error" : undefined}
                className={`min-h-[9rem] resize-y ${inputClass(formErrors.message)}`}
              />
            ),
          })}

          <Magnetic className="self-start">
            <button type="submit" disabled={isLoading} className="btn-primary group disabled:cursor-not-allowed disabled:opacity-60">
              <RollText>{isLoading ? t("contact.sending") : t("contact.cta")}</RollText>
            </button>
          </Magnetic>
        </form>
        </Reveal>
      </div>

      <Notification
        type={notification}
        onClose={() => setNotification(null)}
        successMsg={t("notification.success")}
        errorMsg={t("notification.error")}
      />
      {isLoading && <LoadingOverlay />}
    </section>
  );
};

export default Contact;
