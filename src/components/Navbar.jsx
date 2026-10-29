import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { FaBars, FaChevronDown, FaMagnifyingGlass, FaMoon, FaSun, FaXmark } from "react-icons/fa6";
import { NAV } from "../lib/nav";
import username from "../data/username.json";

function Dropdown({ item, onNavigate }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const { pathname } = useLocation();
    const active = pathname.startsWith(item.to);

    useEffect(() => {
        if (!open) return;
        const close = (event) => {
            if (!ref.current?.contains(event.target)) setOpen(false);
        };
        const onKey = (event) => event.key === "Escape" && setOpen(false);
        document.addEventListener("pointerdown", close);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", close);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <li
            ref={ref}
            className={`nav-item has-menu ${open ? "open" : ""}`}
            onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="nav-split">
                <NavLink
                    to={item.to}
                    end
                    className={`nav-link ${active ? "active" : ""}`}
                    onClick={onNavigate}
                >
                    {item.label}
                </NavLink>
                <button
                    type="button"
                    className="nav-caret"
                    aria-label={`${item.label} menu`}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                >
                    <FaChevronDown />
                </button>
            </div>
            <ul className="menu">
                {item.children.map((child) => (
                    <li key={child.to}>
                        <NavLink to={child.to} className="menu-link" onClick={onNavigate}>
                            {child.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </li>
    );
}

export default function Navbar({ theme, onToggleTheme, onOpenPalette }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const close = () => setOpen(false);

    return (
        <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
            <div className="wrap nav-bar">
                <Link to="/" className="brand" onClick={close}>
                    <span className="brand-mark" aria-hidden="true" />
                    {username.full}
                </Link>

                <nav
                    id="primary-nav"
                    className={`nav ${open ? "open" : ""}`}
                    aria-label="Primary"
                >
                    <ul className="nav-list">
                        {NAV.map((item) =>
                            item.children ? (
                                <Dropdown key={item.to} item={item} onNavigate={close} />
                            ) : (
                                <li key={item.to} className="nav-item">
                                    <NavLink
                                        to={item.to}
                                        end={item.to === "/"}
                                        className="nav-link"
                                        onClick={close}
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            )
                        )}
                    </ul>
                </nav>

                <div className="nav-actions">
                    <button
                        type="button"
                        className="search-btn"
                        onClick={onOpenPalette}
                        aria-label="Open quick search"
                    >
                        <FaMagnifyingGlass />
                        <span className="search-label">Search</span>
                        <kbd>Ctrl K</kbd>
                    </button>
                    <button
                        type="button"
                        className="icon-btn"
                        onClick={onToggleTheme}
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                    >
                        {theme === "dark" ? <FaSun /> : <FaMoon />}
                    </button>
                    <button
                        type="button"
                        className="icon-btn menu-toggle"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle navigation"
                        aria-expanded={open}
                        aria-controls="primary-nav"
                    >
                        {open ? <FaXmark /> : <FaBars />}
                    </button>
                </div>
            </div>
        </header>
    );
}
