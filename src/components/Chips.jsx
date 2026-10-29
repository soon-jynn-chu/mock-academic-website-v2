/** options: [{ key, label, count? }] */
export default function Chips({ options, value, onChange, label }) {
    return (
        <div className="chips" role="group" aria-label={label}>
            {options.map((option) => (
                <button
                    key={option.key}
                    type="button"
                    aria-pressed={value === option.key}
                    className={`chip ${value === option.key ? "active" : ""}`}
                    onClick={() => onChange(option.key)}
                >
                    {option.label}
                    {option.count !== undefined && (
                        <span className="chip-count">{option.count}</span>
                    )}
                </button>
            ))}
        </div>
    );
}
