export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

/** Resolve a public-folder path (e.g. "/images/a.png") against the Vite base. */
export function asset(path) {
    if (!path) return path;
    if (/^(https?:|data:|mailto:)/.test(path)) return path;
    return import.meta.env.BASE_URL + path.replace(/^\//, "");
}

/** Add a protocol to bare domains such as "example.com". */
export function externalUrl(url) {
    if (!url) return url;
    return /^(https?:|mailto:)/.test(url) ? url : `https://${url}`;
}

export function isRealUrl(url) {
    return typeof url === "string" && /^https?:\/\//.test(url);
}

export function prefersReducedMotion() {
    return (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/** Newest first by year, then month. */
export function byDateDesc(yearKey, monthKey) {
    return (a, b) =>
        Number(b[yearKey]) - Number(a[yearKey]) ||
        Number(b[monthKey] || 0) - Number(a[monthKey] || 0);
}

export async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        const area = document.createElement("textarea");
        area.value = text;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        area.remove();
        return ok;
    }
}
