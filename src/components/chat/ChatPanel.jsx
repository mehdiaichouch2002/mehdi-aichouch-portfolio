import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "motion/react";
import { BsSendFill } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage } from "../../context/LanguageContext";
import { DUR, EASE } from "../../lib/motion";

const mdComponents = {
  p:      ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
  em:     ({ children }) => <em className="italic">{children}</em>,
  a:      ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-link">
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc pl-5 space-y-0.5 mb-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 space-y-0.5 mb-2">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  // Headings inside a chat bubble would break the page outline, so render them as text
  h1: ({ children }) => <p className="text-base font-semibold text-fg mb-1 mt-2">{children}</p>,
  h2: ({ children }) => <p className="text-sm font-semibold text-fg mb-1 mt-2">{children}</p>,
  h3: ({ children }) => <p className="text-sm font-semibold text-accent mb-1 mt-2">{children}</p>,
  code: ({ inline, children }) =>
    inline ? (
      <code className="bg-line text-fg text-xs px-1.5 py-0.5 rounded-sm font-mono">{children}</code>
    ) : (
      <code className="block bg-canvas text-fg text-xs p-3 rounded-sm font-mono overflow-x-auto my-2">{children}</code>
    ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-2">
      <table className="text-xs w-full border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-b border-line">{children}</thead>,
  th:    ({ children }) => <th className="text-left font-semibold py-1.5 pr-3">{children}</th>,
  td:    ({ children }) => <td className="py-1.5 pr-3 border-b border-line">{children}</td>,
  hr:    () => <hr className="border-line my-2" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent/40 pl-3 italic text-muted my-2">{children}</blockquote>
  ),
};

// Only visible while waiting for the first token
const TypingDots = () => (
  <span className="inline-flex items-center gap-1 py-1" aria-label="Typing">
    {[0, 150, 300].map((d) => (
      <span
        key={d}
        className="w-1.5 h-1.5 bg-muted rounded-full animate-pulse"
        style={{ animationDelay: `${d}ms` }}
      />
    ))}
  </span>
);

const UserBubble = ({ text }) => (
  <div className="flex justify-end">
    <div className="max-w-[80%] rounded-[14px] rounded-br-[4px] px-3.5 py-2.5 text-[0.93rem] leading-relaxed bg-accent text-canvas">
      {text}
    </div>
  </div>
);

const AssistantBubble = ({ text, streaming }) => (
  <div className="flex justify-start">
    <div className="max-w-[88%] rounded-[14px] rounded-bl-[4px] px-3.5 py-2.5 text-[0.93rem] bg-canvas text-fg/90 border border-line">
      {streaming && !text ? (
        <TypingDots />
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {text}
        </ReactMarkdown>
      )}
    </div>
  </div>
);

export default function ChatPanel({ isOpen, chat }) {
  const { t } = useLanguage();
  const inputRef = useRef(null);
  const { messages, input, setInput, streaming, sendMessage, handleKeyDown, messagesEndRef } = chat;
  const suggestions = t("chat.suggestions") || [];

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: DUR.base * 0.6, ease: EASE }}
          role="dialog"
          aria-label={t("chat.title")}
          className="fixed bottom-20 sm:bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-50 w-auto sm:w-[380px] origin-bottom-right bg-surface-2 rounded-lg shadow-panel border border-line-strong flex flex-col overflow-hidden"
          style={{ height: "min(520px, calc(100dvh - 110px))" }}
        >
          <div className="px-4 py-3 border-b border-line flex-shrink-0">
            <p className="font-semibold text-fg leading-tight">{t("chat.title")}</p>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted truncate mt-0.5">
              {t("chat.subtitle")}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite">
            {messages.length === 0 && (
              <div className="pt-2">
                <p className="text-fg/85 leading-relaxed">{t("chat.greeting")}</p>
                <div className="mt-4 flex flex-col items-start gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      disabled={streaming}
                      className="text-sm text-accent border border-accent/30 hover:border-accent hover:bg-accent-soft px-3 py-2 rounded-full transition-colors duration-fast text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) =>
              msg.role === "user" ? (
                <UserBubble key={i} text={msg.content} />
              ) : (
                <AssistantBubble key={i} text={msg.content} streaming={streaming && i === messages.length - 1} />
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 pt-3 pb-2 border-t border-line flex-shrink-0">
            <div className="flex items-center gap-2 bg-canvas border border-line rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-accent transition-colors duration-fast">
              <label htmlFor="chat-input" className="sr-only">{t("chat.placeholder")}</label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("chat.placeholder")}
                disabled={streaming}
                className="flex-1 min-w-0 bg-transparent text-fg placeholder-muted text-[0.93rem] outline-none disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={streaming || !input.trim()}
                className="grid place-items-center w-9 h-9 rounded-full bg-accent text-canvas disabled:bg-line disabled:text-muted disabled:cursor-not-allowed transition-colors duration-fast flex-shrink-0"
                aria-label="Send"
              >
                <BsSendFill size={14} aria-hidden="true" />
              </button>
            </div>
            <p className="text-center text-muted text-[11px] mt-1.5">{t("chat.disclaimer")}</p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
