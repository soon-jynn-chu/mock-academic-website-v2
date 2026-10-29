export const NAV = [
    { label: "Home", to: "/" },
    {
        label: "About",
        to: "/about",
        children: [
            { label: "Achievements", to: "/about/achievement" },
            { label: "Mentorship", to: "/about/mentorship" },
            { label: "Activity", to: "/about/activity" },
            { label: "CV", to: "/about/cv" },
        ],
    },
    { label: "Projects", to: "/project" },
    { label: "Publications", to: "/publication" },
    { label: "Contact", to: "/contact" },
];

export const ALL_PAGES = NAV.flatMap((item) => [
    { label: item.label, to: item.to },
    ...(item.children || []),
]);
