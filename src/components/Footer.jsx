import { Link } from "react-router";
import SocialLinks from "./SocialLinks";
import username from "../data/username.json";
import { ALL_PAGES } from "../lib/nav";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="wrap footer-grid">
                <div>
                    <p className="footer-name">{username.full}</p>
                    <p className="muted">
                        AI, Robotics &amp; Psychology research.
                    </p>
                    <SocialLinks size={18} />
                </div>
                <nav aria-label="Footer">
                    <ul className="footer-links">
                        {ALL_PAGES.filter((p) => p.to !== "/").map((page) => (
                            <li key={page.to}>
                                <Link to={page.to}>{page.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="wrap footer-base">
                <p>
                    © {new Date().getFullYear()} {username.full}. All rights
                    reserved.
                </p>
                <p className="muted">Built with React &amp; Vite</p>
            </div>
        </footer>
    );
}
