import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../lib/utils";

/** Types and deletes each word in turn. */
export default function Typing({ words }) {
    const [text, setText] = useState(() =>
        prefersReducedMotion() ? words[0] : ""
    );

    useEffect(() => {
        if (prefersReducedMotion()) return;
        let word = 0;
        let chars = 0;
        let deleting = false;
        let timer;

        const tick = () => {
            const current = words[word];
            chars += deleting ? -1 : 1;
            setText(current.slice(0, chars));

            let delay = deleting ? 35 : 70;
            if (!deleting && chars === current.length) {
                deleting = true;
                delay = 1500;
            } else if (deleting && chars === 0) {
                deleting = false;
                word = (word + 1) % words.length;
                delay = 350;
            }
            timer = setTimeout(tick, delay);
        };

        timer = setTimeout(tick, 600);
        return () => clearTimeout(timer);
    }, [words]);

    return (
        <span className="typing" aria-label={words.join(", ")}>
            <span aria-hidden="true">{text}</span>
            <span className="caret" aria-hidden="true" />
        </span>
    );
}
