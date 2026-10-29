import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/utils";

const LINK_DISTANCE = 130;
const MOUSE_DISTANCE = 170;

/** Interactive network of drifting nodes that reacts to the pointer. */
export default function ParticleBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const root = document.documentElement;
        const reduced = prefersReducedMotion();

        let width = 0;
        let height = 0;
        let nodes = [];
        let frame;
        let rgb = "0,207,255";
        const mouse = { x: -9999, y: -9999 };

        const readColor = () => {
            rgb =
                getComputedStyle(root).getPropertyValue("--particle-rgb").trim() ||
                rgb;
        };

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(85, Math.floor((width * height) / 15000));
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: 1 + Math.random() * 1.6,
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            for (const n of nodes) {
                if (!reduced) {
                    const dx = n.x - mouse.x;
                    const dy = n.y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 110 && dist > 0) {
                        n.x += (dx / dist) * 1.2;
                        n.y += (dy / dist) * 1.2;
                    }
                    n.x += n.vx;
                    n.y += n.vy;
                    if (n.x < 0 || n.x > width) n.vx *= -1;
                    if (n.y < 0 || n.y > height) n.vy *= -1;
                }
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb},0.75)`;
                ctx.fill();
            }

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const d = Math.hypot(
                        nodes[i].x - nodes[j].x,
                        nodes[i].y - nodes[j].y
                    );
                    if (d < LINK_DISTANCE) {
                        ctx.strokeStyle = `rgba(${rgb},${(1 - d / LINK_DISTANCE) * 0.3})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
                const dm = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
                if (dm < MOUSE_DISTANCE) {
                    ctx.strokeStyle = `rgba(${rgb},${(1 - dm / MOUSE_DISTANCE) * 0.6})`;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        };

        const loop = () => {
            if (!document.hidden) draw();
            frame = requestAnimationFrame(loop);
        };

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const onLeave = () => {
            mouse.x = mouse.y = -9999;
        };

        readColor();
        resize();
        if (reduced) draw();
        else frame = requestAnimationFrame(loop);

        const resizeObserver = new ResizeObserver(() => {
            resize();
            if (reduced) draw();
        });
        resizeObserver.observe(canvas.parentElement);

        const themeObserver = new MutationObserver(() => {
            readColor();
            if (reduced) draw();
        });
        themeObserver.observe(root, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        window.addEventListener("pointermove", onMove);
        document.addEventListener("pointerleave", onLeave);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            themeObserver.disconnect();
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}
