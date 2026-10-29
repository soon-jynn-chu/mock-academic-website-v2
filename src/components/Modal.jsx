import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";

export default function Modal({ open, onClose, title, wide, children }) {
    const closeRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const previouslyFocused = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();

        const onKey = (event) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previousOverflow;
            previouslyFocused?.focus?.();
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div
            className="modal-backdrop"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                className={`modal-panel ${wide ? "wide" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label={title}
            >
                <div className="modal-head">
                    <h2>{title}</h2>
                    <button
                        ref={closeRef}
                        type="button"
                        className="icon-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <FaXmark />
                    </button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>,
        document.body
    );
}
