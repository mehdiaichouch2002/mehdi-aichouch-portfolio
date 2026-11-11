import { lazy, Suspense, useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import useChat from "../../hooks/useChat";

// The panel (and the markdown renderer it needs) is a separate chunk,
// fetched when the visitor first hovers, focuses or opens the launcher.
const loadPanel = () => import("./ChatPanel");
const ChatPanel = lazy(loadPanel);

export default function AIChatAssistant() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Lives here, not in the panel, so the conversation survives closing it
  const chat = useChat();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const toggle = () => {
    setMounted(true);
    setIsOpen((v) => !v);
  };

  return (
    <>
      <button
        onClick={toggle}
        onPointerEnter={loadPanel}
        onFocus={loadPanel}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 h-12 w-12 sm:w-auto justify-center sm:pl-4 sm:pr-5 rounded-full bg-surface-2/90 backdrop-blur text-fg border border-line-strong shadow-panel flex items-center gap-2 text-[0.9rem] font-semibold transition-[border-color,transform] duration-fast ease-out hover:border-accent/60 active:scale-95"
        aria-label={isOpen ? t("chat.close") : t("chat.open")}
        aria-expanded={isOpen}
      >
        {isOpen ? <BsX size={22} aria-hidden="true" /> : <FiMessageSquare size={18} aria-hidden="true" />}
        <span className="hidden sm:inline">{isOpen ? t("chat.close") : t("chat.open")}</span>
      </button>

      {mounted && (
        <Suspense fallback={null}>
          <ChatPanel isOpen={isOpen} chat={chat} />
        </Suspense>
      )}
    </>
  );
}
