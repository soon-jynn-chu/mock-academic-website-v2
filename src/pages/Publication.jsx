import { Fragment, useMemo, useRef, useState } from "react";
import {
    FaMagnifyingGlass,
    FaQuoteLeft,
    FaCode,
    FaLink,
    FaCheck,
    FaChevronDown,
} from "react-icons/fa6";

import PageHeader from "../components/PageHeader";
import Chips from "../components/Chips";
import Reveal from "../components/Reveal";
import { copyText } from "../lib/utils";
import {
    PUB_TYPES,
    authorNames,
    authorSeparator,
    formatCitation,
    pubYear,
    thesisLabel,
    toBibtex,
    venueOf,
} from "../lib/citations";
import username from "../data/username.json";
import references from "../data/references.json";

function Authors({ authors }) {
    const names = authorNames(authors);
    return names.map((name, i) => (
        <Fragment key={i}>
            {authorSeparator(i, names.length)}
            {name === username.abbrv ? <strong>{name}</strong> : name}
        </Fragment>
    ));
}

function Publication({ item, onCopy }) {
    const [expanded, setExpanded] = useState(false);
    const typeLabel = PUB_TYPES.find((t) => t.key === item.type)?.label;
    const venue = venueOf(item);

    return (
        <article className="card card-hover pub">
            <div className="meta-row">
                <span className="badge badge-accent">{typeLabel}</span>
                {item.type === "thesis" && <span className="badge">{thesisLabel(item)}</span>}
            </div>
            <h3>{item.title}</h3>
            <p className="pub-authors"><Authors authors={item.author} /></p>
            <p className="muted">
                {item.type === "paper-conference" && "in "}
                {venue && <em>{venue}</em>}
                {item.volume && `, vol. ${item.volume}`}
                {item.issue && `, no. ${item.issue}`}
                {item.page && `, pp. ${item.page}`}
                {`, ${pubYear(item)}`}
            </p>
            {item.abstract && (
                <>
                    <button
                        type="button"
                        className="text-link"
                        aria-expanded={expanded}
                        onClick={() => setExpanded((v) => !v)}
                    >
                        Abstract <FaChevronDown className={expanded ? "flip" : ""} />
                    </button>
                    {expanded && <p className="pub-abstract">{item.abstract}</p>}
                </>
            )}
            <div className="pub-actions">
                <button type="button" className="mini-btn" onClick={() => onCopy(formatCitation(item), "Citation copied")}>
                    <FaQuoteLeft /> Cite
                </button>
                <button type="button" className="mini-btn" onClick={() => onCopy(toBibtex(item), "BibTeX copied")}>
                    <FaCode /> BibTeX
                </button>
                {item.URL && (
                    <a className="mini-btn" href={item.URL} target="_blank" rel="noopener noreferrer">
                        <FaLink /> Link
                    </a>
                )}
            </div>
        </article>
    );
}

export default function PublicationPage() {
    const [type, setType] = useState("all");
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("newest");
    const [toast, setToast] = useState("");
    const toastTimer = useRef(null);

    const onCopy = async (text, message) => {
        const ok = await copyText(text);
        setToast(ok ? message : "Copy failed");
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(""), 2000);
    };

    const options = [
        { key: "all", label: "All", count: references.length },
        ...PUB_TYPES.map((t) => ({
            ...t,
            count: references.filter((r) => r.type === t.key).length,
        })).filter((t) => t.count > 0),
    ];

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        const filtered = references.filter((item) => {
            if (type !== "all" && item.type !== type) return false;
            if (!q) return true;
            const haystack = `${item.title} ${authorNames(item.author).join(" ")} ${venueOf(item)} ${pubYear(item)}`;
            return haystack.toLowerCase().includes(q);
        });
        const sorted = [...filtered];
        if (sort === "title") sorted.sort((a, b) => a.title.localeCompare(b.title));
        else sorted.sort((a, b) => (sort === "oldest" ? pubYear(a) - pubYear(b) : pubYear(b) - pubYear(a)));
        return sorted;
    }, [type, query, sort]);

    const byYear = sort !== "title";

    return (
        <div className="wrap">
            <PageHeader
                eyebrow="Research output"
                title="Publications"
                subtitle={`${references.length} papers, theses and documents. Cite them or copy BibTeX in one click.`}
            />

            <div className="toolbar">
                <Chips options={options} value={type} onChange={setType} label="Filter by publication type" />
                <div className="toolbar-right">
                    <label className="search-field">
                        <FaMagnifyingGlass aria-hidden="true" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search title, author, venue, year…"
                            aria-label="Search publications"
                        />
                    </label>
                    <select
                        className="select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        aria-label="Sort publications"
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="title">Title (A–Z)</option>
                    </select>
                </div>
            </div>

            <p className="result-count" aria-live="polite">
                {results.length} result{results.length === 1 ? "" : "s"}
            </p>

            {results.length === 0 && <p className="empty">No publications match your filters.</p>}

            <div className="stack">
                {results.map((item, i) => {
                    const year = pubYear(item);
                    const showYear = byYear && (i === 0 || pubYear(results[i - 1]) !== year);
                    return (
                        <Fragment key={item.id}>
                            {showYear && <h2 className="year-heading">{year}</h2>}
                            <Reveal delay={Math.min(i, 3) * 50}>
                                <Publication item={item} onCopy={onCopy} />
                            </Reveal>
                        </Fragment>
                    );
                })}
            </div>

            <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">
                <FaCheck /> {toast}
            </div>
        </div>
    );
}
