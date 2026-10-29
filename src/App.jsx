import { useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import { BackToTop, ScrollProgress, ScrollToTop } from "./components/ScrollWidgets";
import { useTheme } from "./lib/hooks";

import Home from "./pages/Home";
import About from "./pages/About";
import Mentorship from "./pages/Mentorship";
import Achievement from "./pages/Achievement";
import Activity from "./pages/Activity";
import CV from "./pages/CV";
import Project from "./pages/Project";
import Publication from "./pages/Publication";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

function AnimatedRoutes() {
    const { pathname } = useLocation();
    return (
        <div key={pathname} className="page">
            <Routes>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="about/mentorship" element={<Mentorship />} />
                <Route path="about/achievement" element={<Achievement />} />
                <Route path="about/activity" element={<Activity />} />
                <Route path="about/cv" element={<CV />} />
                <Route path="project" element={<Project />} />
                <Route path="publication" element={<Publication />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </div>
    );
}

export default function App() {
    const { theme, toggle } = useTheme();
    const [paletteOpen, setPaletteOpen] = useState(false);

    return (
        // HashRouter keeps deep links working on GitHub Pages without a server.
        <HashRouter>
            <ScrollToTop />
            <a href="#main" className="skip-link">
                Skip to content
            </a>
            <ScrollProgress />
            <Navbar
                theme={theme}
                onToggleTheme={toggle}
                onOpenPalette={() => setPaletteOpen(true)}
            />
            <main id="main">
                <AnimatedRoutes />
            </main>
            <Footer />
            <BackToTop />
            <CommandPalette
                open={paletteOpen}
                setOpen={setPaletteOpen}
                onToggleTheme={toggle}
            />
        </HashRouter>
    );
}
