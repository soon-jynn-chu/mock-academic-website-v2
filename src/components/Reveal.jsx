import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/utils";

/** Fades/slides its children in the first time they scroll into view. */
export default function Reveal({
    as: Tag = "div",
    delay = 0,
    className = "",
    children,
    ...rest
}) {
    const ref = useRef(null);
    const [shown, setShown] = useState(
        () =>
            prefersReducedMotion() || typeof IntersectionObserver === "undefined"
    );

    useEffect(() => {
        if (shown) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [shown]);

    return (
        <Tag
            ref={ref}
            className={`reveal ${shown ? "in" : ""} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
            {...rest}
        >
            {children}
        </Tag>
    );
}
