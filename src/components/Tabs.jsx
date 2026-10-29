import { useState } from "react";

/** tabs: [{ key, label, content }] */
export default function Tabs({ tabs, initial }) {
    const [active, setActive] = useState(initial || tabs[0].key);
    const current = tabs.find((tab) => tab.key === active) || tabs[0];

    const onKeyDown = (event) => {
        const index = tabs.findIndex((tab) => tab.key === current.key);
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft")
            next = (index - 1 + tabs.length) % tabs.length;
        else return;
        event.preventDefault();
        setActive(tabs[next].key);
        document.getElementById(`tab-${tabs[next].key}`)?.focus();
    };

    return (
        <div>
            <div
                className="tabs"
                role="tablist"
                onKeyDown={onKeyDown}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        id={`tab-${tab.key}`}
                        role="tab"
                        type="button"
                        aria-selected={tab.key === current.key}
                        aria-controls={`panel-${tab.key}`}
                        tabIndex={tab.key === current.key ? 0 : -1}
                        className={`tab ${tab.key === current.key ? "active" : ""}`}
                        onClick={() => setActive(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div
                key={current.key}
                id={`panel-${current.key}`}
                role="tabpanel"
                aria-labelledby={`tab-${current.key}`}
                className="tab-panel"
            >
                {current.content}
            </div>
        </div>
    );
}
