export const PUB_TYPES = [
    { key: "article-journal", label: "Journal" },
    { key: "paper-conference", label: "Conference" },
    { key: "thesis", label: "Thesis" },
    { key: "document", label: "Other" },
];

export function pubYear(item) {
    return parseInt(item.issued["date-parts"][0][0]);
}

export function authorNames(authors) {
    return authors.map((author) => {
        if (author.family?.toLowerCase() === "others") return "others";
        const initials = author.given
            .split(" ")
            .map((n) => n[0].toUpperCase() + ".")
            .join(" ");
        return `${initials} ${author.family}`;
    });
}

/** Separator placed before the name at `index` ("A, B, and C" / "A and B"). */
export function authorSeparator(index, total) {
    if (index === 0) return "";
    if (index === total - 1) return total > 2 ? ", and " : " and ";
    return ", ";
}

export function venueOf(item) {
    return item["container-title"] || item.publisher || "";
}

export function thesisLabel(item) {
    return item.genre === "phdthesis" ? "Ph.D. Dissertation" : "M.S. Thesis";
}

/** Plain-text, IEEE-style citation. */
export function formatCitation(item) {
    const names = authorNames(item.author);
    const authors = names
        .map((n, i) => authorSeparator(i, names.length) + n)
        .join("");
    const parts = [`${authors}, "${item.title},"`];
    if (item.type === "thesis") parts.push(`${thesisLabel(item)},`);
    const venue = venueOf(item);
    if (venue)
        parts.push(`${item.type === "paper-conference" ? "in " : ""}${venue},`);
    if (item.volume) parts.push(`vol. ${item.volume},`);
    if (item.issue) parts.push(`no. ${item.issue},`);
    if (item.page) parts.push(`pp. ${item.page},`);
    parts.push(`${pubYear(item)}.`);
    if (item.URL) parts.push(`[Online]. Available: ${item.URL}`);
    return parts.join(" ");
}

export function toBibtex(item) {
    const entry = {
        "article-journal": "article",
        "paper-conference": "inproceedings",
        thesis: item.genre === "phdthesis" ? "phdthesis" : "mastersthesis",
        document: "misc",
    }[item.type];

    const venueField = {
        "article-journal": "journal",
        "paper-conference": "booktitle",
        thesis: "school",
        document: "publisher",
    }[item.type];

    const fields = {
        author: item.author
            .map((a) =>
                a.family?.toLowerCase() === "others"
                    ? "others"
                    : `${a.family}, ${a.given}`
            )
            .join(" and "),
        title: item.title,
        [venueField]: venueOf(item),
        volume: item.volume,
        number: item.issue,
        pages: item.page,
        year: String(pubYear(item)),
        url: item.URL,
    };

    const body = Object.entries(fields)
        .filter(([, value]) => value)
        .map(([key, value]) => `  ${key} = {${value}}`)
        .join(",\n");

    return `@${entry}{${item["citation-key"] || item.id},\n${body}\n}`;
}
