import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { FaArrowUp } from "react-icons/fa6";

export function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

/** Thin bar at the top of the viewport showing how far the page is scrolled. */
export function ScrollProgress() {
    const barRef = useRef(null);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const max =
                document.documentElement.scrollHeight - window.innerHeight;
            const ratio = max > 0 ? window.scrollY / max : 0;
            if (barRef.current)
                barRef.current.style.transform = `scaleX(${Math.min(ratio, 1)})`;
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <div className="scroll-progress" aria-hidden="true">
            <div ref={barRef} className="scroll-progress-bar" />
        </div>
    );
}

export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <button
            type="button"
            className={`back-to-top ${visible ? "show" : ""}`}
            aria-label="Back to top"
            tabIndex={visible ? 0 : -1}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <FaArrowUp />
        </button>
    );
}
