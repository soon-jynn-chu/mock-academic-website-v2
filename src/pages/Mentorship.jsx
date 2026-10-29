import { useState } from "react";
import { FaGlobe, FaEnvelope } from "react-icons/fa6";

import PageHeader from "../components/PageHeader";
import Tabs from "../components/Tabs";
import Accordion from "../components/Accordion";
import Modal from "../components/Modal";
import Chips from "../components/Chips";
import Reveal from "../components/Reveal";
import { asset, byDateDesc, externalUrl } from "../lib/utils";

import teachingData from "../data/teachings.json";
import adviseeData from "../data/advisees.json";

function Teaching() {
    const sorted = [...teachingData].sort(byDateDesc("lastOfferedYear", "lastOfferedMonth"));
    return (
        <Accordion
            items={sorted.map((item) => ({
                title: item.title,
                subtitle: `${item.courseNumber} · ${item.level} · ${item.institute}`,
                body: (
                    <>
                        <p>{item.description}</p>
                        <dl className="facts">
                            <dt>Instructor(s)</dt>
                            <dd>{item.instructors.join(", ")}</dd>
                            {item.teachingAssistants && (
                                <>
                                    <dt>TA(s)</dt>
                                    <dd>{item.teachingAssistants.join(", ")}</dd>
                                </>
                            )}
                            <dt>Semester(s)</dt>
                            <dd>{item.semesters.join(", ")}</dd>
                            {item.lectureNotesUrl && (
                                <>
                                    <dt>Notes</dt>
                                    <dd>
                                        <a className="url" href={item.lectureNotesUrl} target="_blank" rel="noopener noreferrer">
                                            {item.lectureNotesUrl}
                                        </a>
                                    </dd>
                                </>
                            )}
                        </dl>
                    </>
                ),
            }))}
        />
    );
}

function AdviseeDetails({ item }) {
    return (
        <div className="advisee-detail">
            <div className="advisee-side">
                <img src={asset(item.image || "/images/default-profile.svg")} alt={`${item.name}`} />
                <div className="advisee-links">
                    {item.website && (
                        <a href={externalUrl(item.website)} className="url" target="_blank" rel="noopener noreferrer">
                            <FaGlobe /> Website
                        </a>
                    )}
                    {item.email && (
                        <a href={`mailto:${item.email}`} className="url">
                            <FaEnvelope /> Email
                        </a>
                    )}
                </div>
            </div>
            <div>
                <p>
                    <strong>{item.major}</strong>, <em>{item.institution}</em>
                </p>
                <p className="muted">
                    {item.classFull} · {item.startYear} – {item.endYear || "present"}
                </p>
                {item.description && <blockquote>{item.description}</blockquote>}
                <dl className="facts">
                    {item.thesisTitle && (<><dt>Thesis</dt><dd>{item.thesisTitle}</dd></>)}
                    {item.graduated && item.currentRole && (<><dt>Current role</dt><dd>{item.currentRole}</dd></>)}
                </dl>
                {item.awards?.length > 0 && (
                    <>
                        <h4>Awards</h4>
                        <ul>{item.awards.map((x) => <li key={x}>{x}</li>)}</ul>
                    </>
                )}
                {item.projectInvolved?.length > 0 && (
                    <>
                        <h4>Projects involved</h4>
                        <ul>{item.projectInvolved.map((x) => <li key={x}>{x}</li>)}</ul>
                    </>
                )}
                {item.keywords?.length > 0 && (
                    <div className="meta-row">
                        {item.keywords.map((k) => <span key={k} className="badge">{k}</span>)}
                    </div>
                )}
            </div>
        </div>
    );
}

function Advising() {
    const [status, setStatus] = useState("current");
    const [selected, setSelected] = useState(null);

    const people = adviseeData
        .filter((x) => x.graduated === (status === "past"))
        .sort((a, b) => a.name.localeCompare(b.name));

    const options = [
        { key: "current", label: "Current students", count: adviseeData.filter((x) => !x.graduated).length },
        { key: "past", label: "Past students", count: adviseeData.filter((x) => x.graduated).length },
    ];

    return (
        <>
            <Chips options={options} value={status} onChange={setStatus} label="Student status" />
            <div className="grid-people">
                {people.map((item, i) => (
                    <Reveal key={item.name} delay={Math.min(i, 5) * 50}>
                        <button type="button" className="card card-hover person" onClick={() => setSelected(item)}>
                            <img src={asset(item.image || "/images/default-profile.svg")} alt="" loading="lazy" />
                            <strong>{item.name}</strong>
                            <span className="muted">{item.advisingRole}</span>
                        </button>
                    </Reveal>
                ))}
            </div>
            <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ""} wide>
                {selected && <AdviseeDetails item={selected} />}
            </Modal>
        </>
    );
}

export default function Mentorship() {
    return (
        <div className="wrap">
            <PageHeader eyebrow="Teaching & advising" title="Mentorship" subtitle="Courses I have taught and the students I have had the privilege to advise." />
            <Tabs
                initial="advising"
                tabs={[
                    { key: "teaching", label: "Teaching", content: <Teaching /> },
                    { key: "advising", label: "Advising", content: <Advising /> },
                ]}
            />
        </div>
    );
}
