import { useState } from "react";
import { FaPaperPlane, FaLocationDot } from "react-icons/fa6";

import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { SOCIALS } from "../components/SocialLinks";
import site from "../data/site.json";

export default function Contact() {
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error

    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        if (data.get("_gotcha")) return; // honeypot: bots fill this in

        // No Formspree endpoint configured: open the visitor's mail app instead.
        if (!site.formspreeId) {
            const subject = encodeURIComponent(`Message from ${data.get("name")}`);
            const body = encodeURIComponent(
                `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`
            );
            window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
            setStatus("sent");
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: data,
            });
            if (!res.ok) throw new Error(res.statusText);
            form.reset();
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="wrap">
            <PageHeader
                eyebrow="Say hello"
                title="Contact Me"
                subtitle="I'm always excited to meet curious, open-minded people who are passionate about what they do."
            />

            <div className="contact-grid">
                <Reveal className="contact-info">
                    <h2>Find me here</h2>
                    <p className="muted">
                        Whether you have questions about my work or just want to
                        share your own journey and ideas, I&apos;d love to hear
                        from you.
                    </p>
                    <ul className="contact-list">
                        {SOCIALS.map(({ key, label, icon: Icon, href }) => (
                            <li key={key}>
                                <a
                                    href={href}
                                    className="card card-hover contact-link"
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                >
                                    <span className="tile-icon"><Icon /></span>
                                    <span>
                                        <strong>{label}</strong>
                                        <span className="muted block">
                                            {key === "email" ? site.email : href.replace(/^https?:\/\/(www\.)?/, "")}
                                        </span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="muted location"><FaLocationDot /> {site.location}</p>
                </Reveal>

                <Reveal delay={100}>
                    <form className="card form" onSubmit={onSubmit}>
                        <h2>Send a message</h2>
                        <label>
                            Name
                            <input name="name" type="text" required autoComplete="name" />
                        </label>
                        <label>
                            Email
                            <input name="email" type="email" required autoComplete="email" />
                        </label>
                        <label>
                            Message
                            <textarea name="message" rows="6" required />
                        </label>
                        {/* Honeypot field, hidden from people */}
                        <input name="_gotcha" type="text" tabIndex="-1" autoComplete="off" className="hp" aria-hidden="true" />
                        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
                            {status === "sending" ? "Sending…" : <>Send message <FaPaperPlane /></>}
                        </button>
                        <p className={`form-status ${status}`} role="status" aria-live="polite">
                            {status === "sent" && "Thanks! Your message is on its way."}
                            {status === "error" && "Something went wrong. Please try again or email me directly."}
                        </p>
                    </form>
                </Reveal>
            </div>
        </div>
    );
}
