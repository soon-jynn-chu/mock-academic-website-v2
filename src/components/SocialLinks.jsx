import {
    FaLinkedin,
    FaGithub,
    FaGoogleScholar,
    FaOrcid,
    FaEnvelope,
} from "react-icons/fa6";
import socialLinks from "../data/socialMediaURL.json";
import site from "../data/site.json";
import { isRealUrl } from "../lib/utils";

export const SOCIALS = [
    { key: "linkedin", label: "LinkedIn", icon: FaLinkedin, href: socialLinks.linkedin },
    { key: "github", label: "GitHub", icon: FaGithub, href: socialLinks.github },
    { key: "scholar", label: "Google Scholar", icon: FaGoogleScholar, href: socialLinks.googlescholar },
    { key: "orcid", label: "ORCID", icon: FaOrcid, href: socialLinks.orcid },
    { key: "email", label: "Email", icon: FaEnvelope, href: `mailto:${site.email}` },
].filter((item) => isRealUrl(item.href) || item.href.startsWith("mailto:"));

export default function SocialLinks({ size = 20 }) {
    return (
        <ul className="social-links">
            {SOCIALS.map(({ key, label, icon: Icon, href }) => (
                <li key={key}>
                    <a
                        href={href}
                        aria-label={label}
                        title={label}
                        className="social-btn"
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                    >
                        <Icon size={size} />
                    </a>
                </li>
            ))}
        </ul>
    );
}
