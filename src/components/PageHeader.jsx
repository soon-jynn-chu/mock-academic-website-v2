import { usePageTitle } from "../lib/hooks";

export default function PageHeader({ eyebrow, title, subtitle }) {
    usePageTitle(title);
    return (
        <header className="page-header">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1>{title}</h1>
            {subtitle && <p className="page-sub">{subtitle}</p>}
        </header>
    );
}
