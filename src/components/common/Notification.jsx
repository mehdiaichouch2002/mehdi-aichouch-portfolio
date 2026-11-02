import React from "react";
import { FiX } from "react-icons/fi";

const Notification = ({ type, onClose, successMsg, errorMsg }) => (
  <div
    role="status"
    aria-live="polite"
    className={`fixed top-20 inset-x-0 mx-auto max-w-md z-50 px-4 transition-[transform,opacity] duration-base ease-out ${
      type ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
    }`}
  >
    {type && (
      <div
        className={`flex items-start justify-between gap-4 rounded-sm border bg-surface-2 px-4 py-3 text-fg shadow-panel ${
          type === "success" ? "border-accent/40" : "border-danger/60"
        }`}
      >
        <span>{type === "success" ? successMsg : errorMsg}</span>
        <button onClick={onClose} className="grid h-8 w-8 shrink-0 place-items-center text-muted hover:text-fg" aria-label="Close notification">
          <FiX size={18} />
        </button>
      </div>
    )}
  </div>
);

export default Notification;
