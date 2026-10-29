import { Link } from "react-router";
import { FaTrophy, FaChalkboardUser, FaPeopleGroup, FaFilePdf } from "react-icons/fa6";

import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { useAbout } from "../lib/hooks";
import { asset } from "../lib/utils";
import username from "../data/username.json";

const TILES = [
    { to: "/about/achievement", icon: FaTrophy, title: "Achievements", text: "Awards, certifications and competitions." },
    { to: "/about/mentorship", icon: FaChalkboardUser, title: "Mentorship", text: "Teaching and the students I advise." },
    { to: "/about/activity", icon: FaPeopleGroup, title: "Activity", text: "Leadership, service, talks and community." },
    { to: "/about/cv", icon: FaFilePdf, title: "Curriculum Vitae", text: "View or download my CV." },
];

export default function About() {
    const paragraphs = useAbout();

    return (
        <div className="wrap">
            <PageHeader eyebrow="Who I am" title="About Me" />

            <div className="about-layout">
                <Reveal className="about-photo">
                    <img
                        src={asset("/images/Rd546UhwY4GgEHb5.webp")}
                        alt={`Portrait of ${username.full}`}
                    />
                </Reveal>
                <div className="prose">
                    {paragraphs.map((text, i) => (
                        <Reveal key={i} as="p" delay={Math.min(i, 4) * 60}>
                            {text}
                        </Reveal>
                    ))}
                </div>
            </div>

            <h2 className="subhead">Explore more</h2>
            <div className="grid-4">
                {TILES.map(({ to, icon: Icon, title, text }, i) => (
                    <Reveal key={to} delay={i * 70}>
                        <Link to={to} className="card card-hover tile">
                            <span className="tile-icon">
                                <Icon />
                            </span>
                            <h3>{title}</h3>
                            <p className="muted">{text}</p>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </div>
    );
}
