import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/utils";

/** Counts up to `to` when scrolled into view. */
export default function Counter({ to }) {
    const ref = useRef(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
            setValue(to);
            return;
        }

        let frame;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            const start = performance.now();
            const step = (now) => {
                const progress = Math.min((now - start) / 1400, 1);
                setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
                if (progress < 1) frame = requestAnimationFrame(step);
            };
            frame = requestAnimationFrame(step);
        });
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [to]);

    return <span ref={ref}>{value}</span>;
}
