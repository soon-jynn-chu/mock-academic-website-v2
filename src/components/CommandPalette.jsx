import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ALL_PAGES } from "../lib/nav";
import { SOCIALS } from "./SocialLinks";
import { asset } from "../lib/utils";

function Palette({ onClose, onToggleTheme }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [index, setIndex] = useState(0);
    const inputRef = useRef(null);

    const items = useMemo(
        () => [
            ...ALL_PAGES.map((p) => ({ label: p.label, hint: "Page", to: p.to })),
            { label: "Toggle light / dark theme", hint: "Action", action: onToggleTheme },
            { label: "Download CV (PDF)", hint: "Action", href: asset("/assets/cv.pdf") },
            ...SOCIALS.filter((s) => s.key !== "email").map((s) => ({
                label: `Open ${s.label}`,
                hint: "Link",
                href: s.href,
            })),
        ],
        [onToggleTheme]
    );

    const results = items.filter((item) =>
        item.label.toLowerCase().includes(query.trim().toLowerCase())
    );

    useEffect(() => {
        inputRef.current?.focus();
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, []);

    const run = (item) => {
        if (!item) return;
        onClose();
        if (item.to) navigate(item.to);
        else if (item.href) window.open(item.href, "_blank", "noopener");
        else item.action?.();
    };

    const onKeyDown = (event) => {
        if (event.key === "Escape") onClose();
        else if (event.key === "ArrowDown") {
            event.preventDefault();
            setIndex((i) => Math.min(i + 1, results.length - 1));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setIndex((i) => Math.max(i - 1, 0));
        } else if (event.key === "Enter") {
            event.preventDefault();
            run(results[index]);
        }
    };

    return createPortal(
        <div
            className="modal-backdrop palette-backdrop"
            onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
            <div
                className="palette"
                role="dialog"
                aria-modal="true"
                aria-label="Quick search"
                onKeyDown={onKeyDown}
            >
                <div className="palette-input">
                    <FaMagnifyingGlass aria-hidden="true" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIndex(0);
                        }}
                        placeholder="Jump to a page or action…"
                        aria-label="Search pages and actions"
                    />
                    <kbd>Esc</kbd>
                </div>
                <ul className="palette-list" role="listbox">
                    {results.length === 0 && (
                        <li className="palette-empty">No results</li>
                    )}
                    {results.map((item, i) => (
                        <li
                            key={item.label}
                            role="option"
                            aria-selected={i === index}
                            className={`palette-item ${i === index ? "active" : ""}`}
                            ref={(node) => {
                                if (node && i === index)
                                    node.scrollIntoView({ block: "nearest" });
                            }}
                            onMouseMove={() => setIndex(i)}
                            onClick={() => run(item)}
                        >
                            <span>{item.label}</span>
                            <span className="palette-hint">{item.hint}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>,
        document.body
    );
}

export default function CommandPalette({ open, setOpen, onToggleTheme }) {
    useEffect(() => {
        const onKey = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                setOpen((v) => !v);
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [setOpen]);

    if (!open) return null;
    return (
        <Palette
            onClose={() => setOpen(false)}
            onToggleTheme={onToggleTheme}
        />
    );
}
