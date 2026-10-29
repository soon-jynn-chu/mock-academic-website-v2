import { useId, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

/** items: [{ title, subtitle?, body }] — one panel open at a time. */
export default function Accordion({ items, defaultOpen = 0 }) {
    const [open, setOpen] = useState(defaultOpen);
    const uid = useId();

    return (
        <div className="accordion">
            {items.map((item, i) => {
                const isOpen = open === i;
                return (
                    <div key={i} className={`acc-item ${isOpen ? "open" : ""}`}>
                        <h3 className="acc-heading">
                            <button
                                type="button"
                                className="acc-button"
                                aria-expanded={isOpen}
                                aria-controls={`${uid}-${i}`}
                                onClick={() => setOpen(isOpen ? null : i)}
                            >
                                <span className="acc-title">
                                    {item.title}
                                    {item.subtitle && (
                                        <span className="acc-sub">
                                            {item.subtitle}
                                        </span>
                                    )}
                                </span>
                                <FaChevronDown className="acc-chevron" />
                            </button>
                        </h3>
                        <div
                            id={`${uid}-${i}`}
                            className="acc-panel"
                            role="region"
                            inert={!isOpen}
                        >
                            <div className="acc-inner">
                                <div className="acc-body">{item.body}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
