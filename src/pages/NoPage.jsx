import { Link } from "react-router";
import { usePageTitle } from "../lib/hooks";

export default function NoPage() {
    usePageTitle("Page not found");
    return (
        <div className="wrap not-found">
            <p className="not-found-code">404</p>
            <h1>Page not found</h1>
            <p className="muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
            <Link to="/" className="btn btn-primary">
                Return home
            </Link>
        </div>
    );
}
