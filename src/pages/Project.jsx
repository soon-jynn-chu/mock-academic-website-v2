import { useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import PageHeader from "../components/PageHeader";
import Chips from "../components/Chips";
import Modal from "../components/Modal";
import Reveal from "../components/Reveal";
import { asset } from "../lib/utils";
import projects from "../data/projects.json";

const TAGS = [...new Set(projects.flatMap((p) => p.tags))].sort();

export default function Project() {
    const [tag, setTag] = useState("all");
    const [selected, setSelected] = useState(null);

    const options = [
        { key: "all", label: "All", count: projects.length },
        ...TAGS.map((t) => ({
            key: t,
            label: t,
            count: projects.filter((p) => p.tags.includes(t)).length,
        })),
    ];
    const visible = projects.filter((p) => tag === "all" || p.tags.includes(tag));

    return (
        <div className="wrap">
            <PageHeader
                eyebrow="Selected work"
                title="Highlighted Projects"
                subtitle="Select a project to read more."
            />
            <Chips options={options} value={tag} onChange={setTag} label="Filter projects by topic" />

            <div className="grid-2">
                {visible.map((project, i) => (
                    <Reveal key={project.title} delay={Math.min(i, 3) * 80}>
                        <button type="button" className="card card-hover project-card" onClick={() => setSelected(project)}>
                            <div className="project-img">
                                <img src={asset(project.image)} alt="" loading="lazy" />
                            </div>
                            <div className="project-body">
                                <div className="meta-row">
                                    <span className="badge badge-accent">{project.year}</span>
                                    {project.tags.map((t) => (
                                        <span key={t} className="badge">{t}</span>
                                    ))}
                                </div>
                                <h3>{project.title}</h3>
                                <p className="muted">{project.summary}</p>
                                <span className="text-link">View details</span>
                            </div>
                        </button>
                    </Reveal>
                ))}
            </div>

            <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title || ""} wide>
                {selected && (
                    <div className="project-detail">
                        <img src={asset(selected.image)} alt={selected.title} />
                        <div className="meta-row">
                            <span className="badge badge-accent">{selected.year}</span>
                            {selected.tags.map((t) => (
                                <span key={t} className="badge">{t}</span>
                            ))}
                        </div>
                        <p>{selected.content}</p>
                        {selected.link && (
                            <a href={selected.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                View project <FaArrowUpRightFromSquare />
                            </a>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}
