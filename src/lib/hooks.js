import { useCallback, useEffect, useState } from "react";
import { asset } from "./utils";
import username from "../data/username.json";

export function useTheme() {
    const [theme, setTheme] = useState(
        () => document.documentElement.getAttribute("data-theme") || "dark"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggle = useCallback(() => {
        setTheme((current) => {
            const next = current === "dark" ? "light" : "dark";
            try {
                localStorage.setItem("theme", next);
            } catch {
                /* storage unavailable: theme just won't persist */
            }
            return next;
        });
    }, []);

    return { theme, toggle };
}

/** Loads the paragraphs of public/assets/about.txt. */
export function useAbout() {
    const [paragraphs, setParagraphs] = useState([]);

    useEffect(() => {
        let cancelled = false;
        fetch(asset("/assets/about.txt"))
            .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
            .then((text) => {
                if (cancelled) return;
                setParagraphs(
                    text
                        .split("\n")
                        .map((line) => line.replace(/\r/g, "").trim())
                        .filter(Boolean)
                );
            })
            .catch((err) => console.error("Could not load about.txt", err));
        return () => {
            cancelled = true;
        };
    }, []);

    return paragraphs;
}

export function usePageTitle(title) {
    useEffect(() => {
        document.title = title
            ? `${title} | ${username.full}`
            : `${username.full} | AI, Robotics & Psychology Researcher`;
    }, [title]);
}
