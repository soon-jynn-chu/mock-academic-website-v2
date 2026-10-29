import { useMemo, useState } from "react";
import {
    FaTrophy,
    FaAward,
    FaCertificate,
    FaBookOpen,
    FaMagnifyingGlass,
    FaArrowUpRightFromSquare,
} from "react-icons/fa6";

import PageHeader from "../components/PageHeader";
import Chips from "../components/Chips";
import Reveal from "../components/Reveal";
import { MONTHS } from "../lib/utils";

import awardData from "../data/awards.json";
import certificationData from "../data/certifications.json";
import competitionData from "../data/competitions.json";
import certificateData from "../data/certificates.json";

const CATEGORIES = [
    { key: "award", label: "Awards & Recognition", icon: FaAward, data: awardData },
    { key: "certification", label: "Certifications", icon: FaCertificate, data: certificationData },
    { key: "competition", label: "Competitions", icon: FaTrophy, data: competitionData },
    { key: "certificate", label: "Course Certificates", icon: FaBookOpen, data: certificateData },
];

const ITEMS = CATEGORIES.flatMap(({ key, icon, data }) =>
    data.map((item) => ({ ...item, category: key, icon, year: Number(item.year) }))
);

export default function Achievement() {
    const [category, setCategory] = useState("all");
    const [query, setQuery] = useState("");

    const options = [
        { key: "all", label: "All", count: ITEMS.length },
        ...CATEGORIES.map((c) => ({
            key: c.key,
            label: c.label,
            count: c.data.length,
        })),
    ];

    const years = useMemo(() => {
        const q = query.trim().toLowerCase();
        const filtered = ITEMS.filter(
            (item) =>
                (category === "all" || item.category === category) &&
                (!q || `${item.title} ${item.institute}`.toLowerCase().includes(q))
        );
        const grouped = new Map();
        filtered
            .sort((a, b) => b.year - a.year || Number(b.month || 0) - Number(a.month || 0))
            .forEach((item) => {
                if (!grouped.has(item.year)) grouped.set(item.year, []);
                grouped.get(item.year).push(item);
            });
        return [...grouped.entries()];
    }, [category, query]);

    return (
        <div className="wrap">
            <PageHeader
                eyebrow="Recognition"
                title="Achievements"
                subtitle="Awards, certifications, competitions and coursework, in chronological order."
            />

            <div className="toolbar">
                <Chips options={options} value={category} onChange={setCategory} label="Filter by category" />
                <label className="search-field">
                    <FaMagnifyingGlass aria-hidden="true" />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search achievements…"
                        aria-label="Search achievements"
                    />
                </label>
            </div>

            {years.length === 0 && <p className="empty">No achievements match your search.</p>}

            <div className="timeline">
                {years.map(([year, items]) => (
                    <div key={year} className="tl-group">
                        <h2 className="tl-year">{year}</h2>
                        <div className="tl-items">
                            {items.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <Reveal key={item.title} delay={Math.min(i, 4) * 60} className="tl-item card card-hover">
                                        <span className="tl-icon"><Icon /></span>
                                        <div className="tl-body">
                                            <h3>{item.title}</h3>
                                            <p className="muted">
                                                <em>{item.institute}</em>
                                                {item.month && ` · ${MONTHS[item.month - 1]}`}
                                            </p>
                                            <div className="meta-row">
                                                <span className="badge">
                                                    {CATEGORIES.find((c) => c.key === item.category).label}
                                                </span>
                                                {item.rank && <span className="badge badge-accent">Rank {item.rank}</span>}
                                            </div>
                                        </div>
                                        {item.url && (
                                            <a
                                                href={item.url}
                                                className="icon-btn"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Open ${item.title}`}
                                            >
                                                <FaArrowUpRightFromSquare />
                                            </a>
                                        )}
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
