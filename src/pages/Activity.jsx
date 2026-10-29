import PageHeader from "../components/PageHeader";
import Tabs from "../components/Tabs";
import Accordion from "../components/Accordion";
import Reveal from "../components/Reveal";
import { byDateDesc } from "../lib/utils";

import leadershipData from "../data/leaderships.json";
import academicServiceData from "../data/academicServices.json";
import membershipData from "../data/memberships.json";
import communityEngagementData from "../data/communityEngagements.json";
import invitedTalksData from "../data/invitedTalks.json";

function Leadership() {
    const sorted = [...leadershipData].sort(byDateDesc("lastActiveYear", "lastActiveMonth"));
    return (
        <Accordion
            items={sorted.map((item) => ({
                title: item.organization,
                subtitle: `${item.role} · ${item.yearsActive[0]} – ${item.yearsActive[1]}`,
                body: (
                    <>
                        <p>{item.description}</p>
                        <h4>Highlights</h4>
                        <ul>{item.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                    </>
                ),
            }))}
        />
    );
}

function AcademicService() {
    const sorted = [...academicServiceData].sort(byDateDesc("year", "month"));
    return (
        <div className="stack">
            {sorted.map((item, i) => (
                <Reveal key={i} delay={Math.min(i, 4) * 50} className="card row-card">
                    <span className="year-badge">{item.year}</span>
                    <div>
                        <strong>{item.organization}</strong>
                        <p className="muted">{item.location}</p>
                    </div>
                    <span className="badge badge-accent">{item.role}</span>
                </Reveal>
            ))}
        </div>
    );
}

function InvitedTalks() {
    const sorted = [...invitedTalksData].sort(byDateDesc("year", "month"));
    return (
        <div className="stack">
            {sorted.map((item, i) => (
                <Reveal key={i} delay={Math.min(i, 4) * 50} className="card row-card">
                    <span className="year-badge">{item.year}</span>
                    <div>
                        <strong>{item.institution}</strong>
                        <p className="muted">{item.location}</p>
                        <p>{item.description}</p>
                    </div>
                </Reveal>
            ))}
        </div>
    );
}

function Memberships() {
    const sorted = [...membershipData].sort(byDateDesc("lastActiveYear", "lastActiveMonth"));
    return (
        <div className="stack">
            {sorted.map((item, i) => (
                <Reveal key={i} delay={Math.min(i, 4) * 50} className="card row-card">
                    <span className="year-badge">{item.lastActiveYear}</span>
                    <div>
                        <strong>{item.organization}</strong>
                        <p className="muted">{item.yearsActive.join(" · ")}</p>
                    </div>
                    <span className="badge badge-accent">{item.title}</span>
                </Reveal>
            ))}
        </div>
    );
}

function Community() {
    const sorted = [...communityEngagementData].sort(byDateDesc("lastengagedyear", "lastengagedmonth"));
    return (
        <Accordion
            items={sorted.map((item) => ({
                title: item.title,
                subtitle: `${item.organization} · ${item.location}`,
                body: (
                    <>
                        <p>{item.description}</p>
                        <dl className="facts">
                            <dt>Year(s)</dt>
                            <dd>{item.years.join(", ")}</dd>
                            {item.url && (
                                <>
                                    <dt>Website</dt>
                                    <dd>
                                        <a className="url" href={item.url} target="_blank" rel="noopener noreferrer">
                                            {item.url}
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

export default function Activity() {
    return (
        <div className="wrap">
            <PageHeader eyebrow="Beyond the lab" title="Activity" subtitle="Leadership, academic service, invited talks, memberships and community work." />
            <Tabs
                tabs={[
                    { key: "leadership", label: "Leadership", content: <Leadership /> },
                    { key: "service", label: "Academic Service", content: <AcademicService /> },
                    { key: "talks", label: "Invited Talks", content: <InvitedTalks /> },
                    { key: "membership", label: "Memberships", content: <Memberships /> },
                    { key: "community", label: "Community", content: <Community /> },
                ]}
            />
        </div>
    );
}
