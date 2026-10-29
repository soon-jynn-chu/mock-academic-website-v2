import { FaDownload } from "react-icons/fa6";
import PageHeader from "../components/PageHeader";
import { asset } from "../lib/utils";

export default function CV() {
    const src = asset("/assets/cv.pdf");
    return (
        <div className="wrap">
            <PageHeader eyebrow="Résumé" title="Curriculum Vitae" />
            <div className="cv-actions">
                <a href={src} download className="btn btn-primary">
                    <FaDownload /> Download PDF
                </a>
                <a href={src} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    Open in new tab
                </a>
            </div>
            <object
                className="cv-frame"
                data={`${src}#navpanes=0&view=FitH`}
                type="application/pdf"
                aria-label="Curriculum vitae PDF"
            >
                <p className="empty">
                    Your browser can&apos;t display PDFs inline.{" "}
                    <a className="url" href={src}>Download the CV</a> instead.
                </p>
            </object>
        </div>
    );
}
