import React, { useEffect, useRef } from "react";
import { FiDownload, FiX } from "react-icons/fi";
import { useResumeModal } from "../../context/ResumeModalContext";
import { useLanguage } from "../../context/LanguageContext";

// Files live in public/ as MEHDI-AICHOUCH-<LANG>.pdf (one resume covers Magento and full-stack)
const LANGS = ["en", "fr"];

const ResumeLanguageModal = () => {
  const { isOpen, close } = useResumeModal();
  const { t, lang } = useLanguage();
  const dialogRef = useRef(null);

  const handleDownload = (language) => {
    const fileName = `MEHDI-AICHOUCH-${language.toUpperCase()}.pdf`;
    const link = document.createElement("a");
    link.href = `/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    close();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  // Offer the visitor's current language first
  const langOrder = lang === "fr" ? ["fr", "en"] : LANGS;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-[80] p-4"
      onClick={close}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        className="relative bg-surface border border-line rounded-lg p-6 sm:p-8 max-w-md w-full max-h-[90dvh] overflow-y-auto shadow-2xl focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={close} className="absolute top-4 right-4 p-1.5 text-muted hover:text-fg" aria-label={t("resumeModal.cancel")}>
          <FiX size={20} />
        </button>

        <h2 id="resume-title" className="font-display text-2xl font-bold text-fg">
          {t("resumeModal.title")}
        </h2>
        <p className="mt-1 text-muted">{t("resumeModal.subtitle")}</p>

        <div className="mt-6 grid gap-2">
          {langOrder.map((l, i) => (
            <button
              key={l}
              onClick={() => handleDownload(l)}
              className={`${i === 0 ? "btn-primary" : "btn-secondary"} w-full justify-between`}
            >
              {t(`resumeModal.${l === "en" ? "english" : "french"}`)}
              <FiDownload aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeLanguageModal;
