import { Link } from "react-router";
import { PiHeadCircuitThin } from "react-icons/pi";
import { FaArrowRight, FaMicrochip, FaRobot, FaBrain } from "react-icons/fa6";

import ParticleBackground from "../components/ParticleBackground";
import Typing from "../components/Typing";
import Counter from "../components/Counter";
import Reveal from "../components/Reveal";
import SocialLinks from "../components/SocialLinks";

import { useAbout, usePageTitle } from "../lib/hooks";
import { asset } from "../lib/utils";
import { pubYear, venueOf } from "../lib/citations";
import username from "../data/username.json";
import site from "../data/site.json";
import projects from "../data/projects.json";
import references from "../data/references.json";
import invitedTalks from "../data/invitedTalks.json";
import advisees from "../data/advisees.json";
import awards from "../data/awards.json";

const STATS = [
    { label: "Publications", value: references.length },
    { label: "Invited Talks", value: invitedTalks.length },
    { label: "Students Advised", value: advisees.length },
    { label: "Awards & Honors", value: awards.length },
];

const latestPublications = [...references]
    .sort((a, b) => pubYear(b) - pubYear(a))
    .slice(0, 3);

export default function Home() {
    usePageTitle("");
    const about = useAbout();

    return (
        <>
            <section className="hero">
                <ParticleBackground />
                <div className="wrap hero-grid">
                    <div className="hero-copy">
                        <p className="eyebrow">Researcher · Engineer · Educator</p>
                        <h1>
                            Hi, I&apos;m <span className="gradient-text">{username.full}</span>
                        </h1>
                        <p className="hero-typing">
                            Exploring <Typing words={site.roles} />
                        </p>
                        <p className="lead">{site.tagline}</p>
                        <div className="hero-actions">
                            <Link to="/project" className="btn btn-primary">
                                Explore projects <FaArrowRight />
                            </Link>
                            <Link to="/contact" className="btn btn-ghost">
                                Contact me
                            </Link>
                        </div>
                        <SocialLinks />
                    </div>

                    <div className="hero-visual" aria-hidden="true">
                        <div className="orbit orbit-1">
                            <span className="orbit-dot"><FaMicrochip /></span>
                        </div>
                        <div className="orbit orbit-2">
                            <span className="orbit-dot"><FaRobot /></span>
                        </div>
                        <div className="orbit orbit-3">
                            <span className="orbit-dot"><FaBrain /></span>
                        </div>
                        <PiHeadCircuitThin className="hero-icon" />
                    </div>
                </div>
            </section>

            <section className="wrap section stats-section">
                <div className="stats">
                    {STATS.map((stat, i) => (
                        <Reveal key={stat.label} delay={i * 80} className="stat">
                            <span className="stat-value">
                                <Counter to={stat.value} />
                            </span>
                            <span className="stat-label">{stat.label}</span>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="wrap section">
                <Reveal className="about-teaser card">
                    <img
                        src={asset("/images/Rd546UhwY4GgEHb5.webp")}
                        alt={`Portrait of ${username.full}`}
                        className="about-teaser-img"
                        loading="lazy"
                    />
                    <div>
                        <p className="eyebrow">About</p>
                        <h2>Research at the crossroads of minds and machines</h2>
                        <p className="muted clamp-4">{about[0]}</p>
                        <Link to="/about" className="text-link">
                            Read my story <FaArrowRight />
                        </Link>
                    </div>
                </Reveal>
            </section>

            <section className="wrap section">
                <Reveal className="section-head">
                    <div>
                        <p className="eyebrow">Selected work</p>
                        <h2>Featured projects</h2>
                    </div>
                    <Link to="/project" className="text-link">
                        All projects <FaArrowRight />
                    </Link>
                </Reveal>
                <div className="grid-3">
                    {projects.slice(0, 3).map((project, i) => (
                        <Reveal key={project.title} delay={i * 100}>
                            <Link to="/project" className="card card-hover project-mini">
                                <img src={asset(project.image)} alt="" loading="lazy" />
                                <div className="project-mini-body">
                                    <h3>{project.title}</h3>
                                    <p className="muted clamp-3">{project.summary}</p>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="wrap section">
                <Reveal className="section-head">
                    <div>
                        <p className="eyebrow">Latest</p>
                        <h2>Recent publications</h2>
                    </div>
                    <Link to="/publication" className="text-link">
                        All publications <FaArrowRight />
                    </Link>
                </Reveal>
                <div className="stack">
                    {latestPublications.map((item, i) => (
                        <Reveal key={item.id} delay={i * 80}>
                            <Link to="/publication" className="card card-hover pub-mini">
                                <span className="year-badge">{pubYear(item)}</span>
                                <span>
                                    <strong>{item.title}</strong>
                                    <span className="muted block">{venueOf(item)}</span>
                                </span>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="wrap section">
                <Reveal className="cta">
                    <h2>Let&apos;s build something together</h2>
                    <p>
                        Open to collaborations, speaking invitations and curious
                        conversations about AI, robotics and psychology.
                    </p>
                    <Link to="/contact" className="btn btn-primary">
                        Get in touch <FaArrowRight />
                    </Link>
                </Reveal>
            </section>
        </>
    );
}
