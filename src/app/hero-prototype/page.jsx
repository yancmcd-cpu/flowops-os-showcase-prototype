"use client";

import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import Radar from "@/components/Radar";
import SolutionDesignSection from "@/components/solution-design/SolutionDesignSection";

const systemCards = [
    {
        title: "Opportunity Found",
        status: "Signal Captured",
        color: "#06B6D4",
        glow: "rgba(6, 182, 212, 0.2)",
        offsetX: -210,
        offsetY: -160,
        delay: "0s",
    },
    {
        title: "Skill Selected",
        status: "Orchestrating",
        color: "#6366F1",
        glow: "rgba(99, 102, 241, 0.2)",
        offsetX: -280,
        offsetY: 20,
        delay: "4s",
    },
    {
        title: "Workflow Routed",
        status: "Execution Live",
        color: "#10B981",
        glow: "rgba(16, 185, 129, 0.2)",
        offsetX: -210,
        offsetY: 190,
        delay: "8s",
    },
];

const ARCHITECTURE_LAYERS = [
    {
        id: "hero",
        label: "Intelligence Core",
        sub: "L1: Neural Engine",
        primary: "#3B82F6",
        glow: "#60A5FA",
        target: "hero-top",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "60%", height: "60%" }}>
                <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                <path d="M12 12L2.5 12" />
                <path d="M12 12l9.5 0" />
                <path d="M12 12l-6.7 6.7" />
                <path d="M12 12l6.7 6.7" />
                <circle cx="12" cy="12" r="3" fill={color} opacity="0.3" />
            </svg>
        ),
    },
    {
        id: "radar",
        label: "Signal Detection",
        sub: "L2: Data Radar",
        primary: "#06B6D4",
        glow: "#22D3EE",
        target: "radar",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "60%", height: "60%" }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 12L19 7.5" />
                <path d="M12 12v7" />
                <circle cx="12" cy="12" r="2" fill={color} />
            </svg>
        ),
    },
    {
        id: "blueprint",
        label: "Solution Design",
        sub: "L3: Arch-Gen",
        primary: "#6366F1",
        glow: "#818CF8",
        target: "blueprint",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "60%", height: "60%" }}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
                <path d="M15 3v18" />
                <path d="M3 9h18" />
                <path d="M3 15h18" />
            </svg>
        ),
    },
    {
        id: "ops",
        label: "Automation + Implementation",
        sub: "L4: Live Ops",
        primary: "#10B981",
        glow: "#34D399",
        target: "ops",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "60%", height: "60%" }}>
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.93 19.07l2.83-2.83" />
                <path d="M16.24 7.76l2.83-2.83" />
            </svg>
        ),
    },
    {
        id: "refine",
        label: "Continuous Improvement",
        sub: "L5: Refinement",
        primary: "#F59E0B",
        glow: "#FBBF24",
        target: "refine",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "60%", height: "60%" }}>
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
            </svg>
        ),
    },
];

export default function FlowOpsPage() {
    const [mounted, setMounted] = useState(false);
    const [isCoreLoaded, setIsCoreLoaded] = useState(false);
    const [isSystemActive, setIsSystemActive] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [randomNodes, setRandomNodes] = useState([]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeLayer, setActiveLayer] = useState(0);
    const [hoveredLayer, setHoveredLayer] = useState(null);

    useEffect(() => {
        setMounted(true);
        const nodes = [...Array(35)].map((_, i) => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${1 + Math.random() * 2}px`,
            dx: `${(Math.random() - 0.5) * 200}px`,
            dy: `${(Math.random() - 0.5) * 200}px`,
            duration: i % 2 === 0 ? 25 + Math.random() * 5 : 18 + Math.random() * 4,
            pulseDur: 6 + Math.random() * 10,
            color: i % 4 === 0 ? "#6366F1" : i % 4 === 1 ? "#06B6D4" : "white",
        }));
        setRandomNodes(nodes);

        const handleScroll = () => {
            const scrolled = window.scrollY;
            const vh = window.innerHeight;
            const progress = Math.min(scrolled / (vh * 0.55), 1);
            setScrollProgress(progress);

            const sections = ARCHITECTURE_LAYERS.map((layer) => document.getElementById(layer.target));
            let currentActive = 0;
            sections.forEach((section, idx) => {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= vh * 0.45) currentActive = idx;
                }
            });
            setActiveLayer(currentActive);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSplineLoad = () => {
        setIsCoreLoaded(true);
        setTimeout(() => setShowLoader(false), 300);
        setTimeout(() => setIsSystemActive(true), 800);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    const renderLayerItems = (vertical) => (
        ARCHITECTURE_LAYERS.map((layer, index) => {
            const isActive = activeLayer === index;
            const isHovered = hoveredLayer === index;
            const visualActive = isActive || isHovered;

            return (
                <div
                    key={`${vertical ? "vertical" : "horizontal"}-${layer.id}`}
                    onClick={() => scrollToSection(layer.target)}
                    onMouseEnter={() => setHoveredLayer(index)}
                    onMouseLeave={() => setHoveredLayer(null)}
                    style={{
                        display: "flex",
                        flexDirection: vertical ? "row" : "column",
                        alignItems: "center",
                        gap: vertical ? "20px" : "16px",
                        position: "relative",
                        zIndex: 2,
                        opacity: isSystemActive ? 1 : 0,
                        transform: isSystemActive ? "translateZ(0)" : "translateZ(-100px)",
                        transition: `all 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.05}s`,
                        cursor: "pointer",
                        width: vertical ? "100%" : "19.2%",
                        minWidth: vertical ? "0" : "205px",
                    }}
                >
                    <div
                        style={{
                            width: vertical ? "50px" : "78px",
                            height: vertical ? "50px" : "78px",
                            position: "relative",
                            transformStyle: "preserve-3d",
                            transform: vertical ? "rotateY(0deg)" : "rotateX(20deg) rotateY(5deg)",
                            transition: "all 0.4s ease",
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: visualActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.03)",
                                border: `2px solid ${visualActive ? layer.primary : "rgba(255,255,255,0.2)"}`,
                                borderRadius: vertical ? "14px" : "16px",
                                backdropFilter: "blur(12px)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: visualActive ? `0 0 38px ${layer.glow}66` : "0 0 0 rgba(0,0,0,0)",
                                transition: "all 0.4s ease",
                                transform: isHovered ? "scale(1.1) translateZ(20px)" : "scale(1)",
                                color: visualActive ? layer.primary : "rgba(255,255,255,0.4)",
                            }}
                        >
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", animation: visualActive ? "iconFloat 3s ease-in-out infinite" : "none" }}>
                                {layer.icon(visualActive ? layer.primary : "rgba(255,255,255,0.4)")}
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: vertical ? "flex-start" : "center",
                            textAlign: vertical ? "left" : "center",
                            minWidth: vertical ? "200px" : "100%",
                            maxWidth: vertical ? "200px" : "255px",
                            opacity: visualActive ? 1 : vertical ? 0.4 : 0.6,
                            transition: "all 0.4s ease",
                            transform: isHovered && vertical ? "translateX(8px)" : "none",
                        }}
                    >
                        <span style={{ fontSize: vertical ? "0.85rem" : "0.72rem", textTransform: "uppercase", letterSpacing: visualActive ? (vertical ? "0.25em" : "0.2em") : (vertical ? "0.2em" : "0.18em"), color: visualActive ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.72)", lineHeight: 1.35, fontWeight: visualActive ? 800 : 700, transition: "all 0.5s ease", whiteSpace: vertical ? "normal" : "nowrap" }}>{layer.label}</span>
                        <span style={{ fontSize: vertical ? "0.55rem" : "0.56rem", color: visualActive ? layer.primary : "rgba(255,255,255,0.34)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: vertical ? "4px" : "6px", transition: "all 0.5s ease", whiteSpace: "nowrap", fontWeight: 700 }}>{layer.sub}</span>
                    </div>
                </div>
            );
        })
    );

    const handoffStart = 0.58;
    const handoffEnd = 0.9;
    const handoffProgress = Math.min(Math.max((scrollProgress - handoffStart) / (handoffEnd - handoffStart), 0), 1);
    const isSticky = handoffProgress > 0.12;
    const horizontalOpacity = 1 - handoffProgress;
    const verticalOpacity = handoffProgress;
    const horizontalTranslateY = handoffProgress * 26;
    const verticalTranslateX = (1 - handoffProgress) * -26;
    const verticalTranslateY = (1 - handoffProgress) * 18;
    const verticalScale = 0.94 + handoffProgress * 0.06;

    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes ingest-right {
                    0% { transform: translate(100vw, 20vh) scale(0.2); opacity: 0; }
                    10% { opacity: 0.7; }
                    40% { transform: translate(60vw, -10vh) scale(1.2); }
                    70% { transform: translate(40vw, 10vh) scale(0.8); }
                    100% { transform: translate(25vw, 0vh) scale(0); opacity: 0; }
                }
                @keyframes nodePulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 35px currentColor; }
                }
                @keyframes conduitEnergyFlowHorizontal {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                @keyframes conduitEnergyFlowVertical {
                    0% { background-position: 0 200%; }
                    100% { background-position: 0 -200%; }
                }
                @keyframes ribbonFlow {
                    0% { stroke-dashoffset: 200; opacity: 0; }
                    15% { opacity: 1; }
                    85% { opacity: 1; }
                    100% { stroke-dashoffset: -100; opacity: 0; }
                }
                @keyframes systemCardLoop {
                    0% { opacity: 0; transform: translate(calc(-50% + var(--tx) * 0.6), calc(-50% + var(--ty) * 0.6)) scale(0.65); filter: blur(12px); }
                    8% { opacity: 1; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1); filter: blur(0px); }
                    33% { opacity: 1; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty) - 8px)) scale(1); filter: blur(0px); }
                    36% { opacity: 0; transform: translate(calc(-50% + var(--tx) + 20px), calc(-50% + var(--ty))) scale(0.9); filter: blur(10px); }
                    100% { opacity: 0; }
                }
                @keyframes tetherDraw {
                    0% { stroke-dashoffset: 100; opacity: 0; }
                    8% { stroke-dashoffset: 0; opacity: 0.4; }
                    33% { stroke-dashoffset: 0; opacity: 0.4; }
                    36%, 100% { stroke-dashoffset: -100; opacity: 0; }
                }
                @keyframes textMetallicFlare {
                    0%, 15% { background-position: 100% center; filter: brightness(0.9) contrast(1); transform: scale(1); }
                    35%, 55% { background-position: 50% center; filter: brightness(1.4) contrast(1.5); text-shadow: 1px 1px 0px rgba(255,255,255,0.4), -1px -1px 0px rgba(0,0,0,0.8), 4px 4px 15px rgba(0,0,0,0.9); transform: scale(1.02); }
                    75%, 100% { background-position: 0% center; filter: brightness(0.9) contrast(1); transform: scale(1); }
                }
                @keyframes textGlowBloom {
                    0%, 15% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.85); }
                    35%, 55% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.1); }
                    75%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.85); }
                }
                @keyframes activeCoreSpin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes iconFloat {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes driftIndependent {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(var(--dx), var(--dy)); }
                }
            `,
                }}
            />

            <main style={{ position: "relative", width: "100vw", background: "#010204", color: "white", fontFamily: "Inter, sans-serif", overflowX: "hidden" }}>
                <section id="hero-top" style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
                        {mounted && (
                            <>
                                <div style={{ position: "absolute", left: 0, top: 0, width: "12px", height: "12px", background: "white", borderRadius: "50%", boxShadow: "0 0 25px white", animation: "ingest-right 14s ease-in-out infinite" }} />
                                {randomNodes.map((node, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            position: "absolute",
                                            left: node.left,
                                            top: node.top,
                                            width: node.size,
                                            height: node.size,
                                            background: node.color,
                                            borderRadius: "50%",
                                            opacity: 0.045,
                                            boxShadow: "0 0 4px white",
                                            "--dx": node.dx,
                                            "--dy": node.dy,
                                            animation: `driftIndependent ${node.duration}s linear infinite alternate, nodePulse ${node.pulseDur}s ease-in-out infinite`,
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    </div>

                    <div style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none", opacity: isSystemActive ? 1 : 0 }}>
                        <svg viewBox="0 0 1000 500" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                            <defs>
                                <linearGradient id="ribbonGrad" x1="1" y1="0" x2="0" y2="0">
                                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                                    <stop offset="40%" stopColor="rgba(99, 102, 241, 0.8)" />
                                    <stop offset="80%" stopColor="rgba(6, 182, 212, 1)" />
                                    <stop offset="100%" stopColor="white" />
                                </linearGradient>
                            </defs>
                            <path d="M 750 200 C 600 50, 400 350, 220 200" fill="none" stroke="url(#ribbonGrad)" strokeWidth="12" strokeLinecap="round" style={{ animation: isSystemActive ? "ribbonFlow 4s linear infinite" : "none", filter: "blur(16px)", opacity: 0.3 }} />
                            <path d="M 750 200 C 600 50, 400 350, 220 200" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: isSystemActive ? "ribbonFlow 4s linear infinite" : "none", opacity: 0.7, strokeDasharray: "40 160" }} />
                        </svg>
                    </div>

                    <div style={{ position: "absolute", left: "20.5vw", top: "38.5%", transform: "translateY(-50%)", width: "100%", maxWidth: "700px", zIndex: 20, display: "flex", flexDirection: "column", fontFamily: "Inter Tight, Segoe UI, Helvetica Neue, sans-serif" }}>
                        <p style={{ fontSize: "0.82rem", letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(163, 176, 204, 0.88)", margin: "0 0 1.5rem 0", fontWeight: 700 }}>FLOWOPS STUDIO</p>
                        <h1 style={{ fontSize: "6.05rem", lineHeight: 0.96, margin: "0 0 1.85rem 0", letterSpacing: "-0.075em", position: "relative" }}>
                            <span style={{ fontWeight: 700, color: "#f8fafc", display: "block" }}>Agency</span>
                            <span style={{ position: "relative", display: "inline-block" }}>
                                <div style={{ position: "absolute", left: "36%", top: "54%", width: "112%", height: "128%", background: "radial-gradient(circle, rgba(59, 130, 246, 0.34) 0%, rgba(99, 102, 241, 0.22) 42%, transparent 76%)", filter: "blur(38px)", animation: isSystemActive ? "textGlowBloom 4s ease-in-out infinite" : "none", zIndex: -1, transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
                                <span style={{ fontWeight: 800, letterSpacing: "-0.078em", display: "block", background: "linear-gradient(180deg, #8B5CF6 0%, #6366F1 52%, #4F46E5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: isSystemActive ? "textMetallicFlare 4s ease-in-out infinite" : "none" }}>Operating</span>
                                <span style={{ fontWeight: 800, letterSpacing: "-0.078em", display: "block", marginTop: "-0.08em", background: "linear-gradient(180deg, #8B5CF6 0%, #6366F1 52%, #4F46E5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: isSystemActive ? "textMetallicFlare 4s ease-in-out infinite" : "none" }}>System</span>
                            </span>
                        </h1>
                        <p style={{ fontSize: "1.28rem", lineHeight: 1.6, color: "rgba(203, 213, 225, 0.76)", margin: "0 0 2.5rem 0", maxWidth: "540px", fontWeight: 400 }}>A modular intelligence engine coordinating strategy, architecture, and live agency orchestration.</p>
                    </div>

                    <div style={{ position: "absolute", right: "92px", top: "38.8%", transform: "translateY(-50%)", width: "1425px", height: "960px", zIndex: 5, opacity: isCoreLoaded ? 1 : 0, transition: "opacity 1.2s", pointerEvents: "none" }}>
                        {mounted && <Spline scene="https://prod.spline.design/jjy1wq7xWv8RUvFC/scene.splinecode" onLoad={handleSplineLoad} />}
                    </div>

                    <div className="core-origin" style={{ position: "absolute", right: "27.2vw", top: "39.1%", transform: "translateY(-50%)", zIndex: 10 }}>
                        <div style={{ position: "absolute", inset: 0, overflow: "visible" }}>
                            <svg style={{ position: "absolute", left: "-500px", top: "-500px", width: "1000px", height: "1000px", overflow: "visible" }}>
                                {systemCards.map((card, index) => (
                                    <line key={index} x1="500" y1="500" x2={500 + card.offsetX} y2={500 + card.offsetY} stroke={card.color} strokeWidth="1.5" opacity="0" pathLength="100" strokeDasharray="100 100" style={{ animation: isSystemActive ? `tetherDraw 12s linear ${card.delay} infinite both` : "none" }} />
                                ))}
                            </svg>
                        </div>
                        {systemCards.map((card, index) => (
                            <div key={index} style={{ position: "absolute", opacity: 0, "--tx": `${card.offsetX}px`, "--ty": `${card.offsetY}px`, animation: isSystemActive ? `systemCardLoop 12s linear ${card.delay} infinite both` : "none" }}>
                                <div style={{ background: "linear-gradient(180deg, rgba(16, 21, 31, 0.85), rgba(8, 10, 15, 0.95))", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "18px 24px", minWidth: "220px", transform: "translate(-50%, -50%)", boxShadow: "0 20px 50px rgba(0,0,0,0.7)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                                        <span style={{ fontSize: "0.6rem", opacity: 0.4, letterSpacing: "0.15em", fontWeight: 700 }}>SYSTEM OUTPUT</span>
                                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: card.color, boxShadow: `0 0 10px ${card.color}` }} />
                                    </div>
                                    <div style={{ fontSize: "1.1rem", fontWeight: 500, color: "white" }}>{card.title}</div>
                                    <div style={{ fontSize: "0.75rem", color: card.color, marginTop: "4px", fontWeight: 500 }}>{card.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {showLoader && (
                        <div style={{ position: "absolute", right: "27.2vw", top: "39.1%", transform: "translate(50%, -50%)", zIndex: 100, textAlign: "center" }}>
                            <div style={{ width: "45px", height: "45px", border: "3px solid rgba(255,255,255,0.05)", borderTopColor: "#3B82F6", borderRadius: "50%", animation: "activeCoreSpin 0.8s linear infinite", margin: "0 auto 15px" }} />
                            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", opacity: 0.4, fontWeight: 600 }}>INITIALIZING CORE</p>
                        </div>
                    )}

                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 75% 50%, transparent 20%, rgba(2,3,6,0.3) 70%, #010204 100%)", zIndex: 6, pointerEvents: "none" }} />
                </section>

                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "calc(100vh - 235px)",
                        transform: `translate(-50%, calc(-50% + ${horizontalTranslateY}px)) scale(${1 - handoffProgress * 0.05})`,
                        width: "100%",
                        maxWidth: "1480px",
                        zIndex: 100,
                        padding: "0 28px",
                        opacity: horizontalOpacity,
                        pointerEvents: handoffProgress > 0.7 ? "none" : "auto",
                        transition: "opacity 0.18s linear, transform 0.18s linear",
                        perspective: "2000px",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", position: "relative", gap: "18px", width: "100%", paddingTop: "12px" }}>
                        <div
                            style={{
                                position: "absolute",
                                left: "8%",
                                right: "8%",
                                top: "49px",
                                height: "3px",
                                background: "rgba(255, 255, 255, 0.06)",
                                zIndex: 1,
                                pointerEvents: "none",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: `linear-gradient(90deg, transparent, ${ARCHITECTURE_LAYERS[activeLayer].primary}, transparent)`,
                                    transition: "background 0.4s ease",
                                    boxShadow: `0 0 15px ${ARCHITECTURE_LAYERS[activeLayer].primary}66`,
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 65%, transparent 100%)",
                                    backgroundSize: "200% 100%",
                                    animation: "conduitEnergyFlowHorizontal 2.5s linear infinite",
                                    opacity: 0.9,
                                }}
                            />
                        </div>
                        {renderLayerItems(false)}
                    </div>
                </div>

                <div
                    style={{
                        position: "fixed",
                        left: "30px",
                        top: "50%",
                        transform: `translate(${verticalTranslateX}px, calc(-50% + ${verticalTranslateY}px)) scale(${verticalScale})`,
                        width: "280px",
                        maxWidth: "280px",
                        zIndex: 101,
                        padding: "20px",
                        opacity: verticalOpacity,
                        pointerEvents: handoffProgress < 0.12 ? "none" : "auto",
                        transition: "opacity 0.18s linear, transform 0.18s linear",
                        perspective: "2000px",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", position: "relative", gap: "35px", width: "100%" }}>
                        <div
                            style={{
                                position: "absolute",
                                left: "25px",
                                top: "25px",
                                height: "calc(100% - 50px)",
                                width: "3px",
                                background: "rgba(255, 255, 255, 0.03)",
                                zIndex: 1,
                                pointerEvents: "none",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: `linear-gradient(180deg, transparent, ${ARCHITECTURE_LAYERS[activeLayer].primary}, transparent)`,
                                    transition: "background 0.4s ease",
                                    boxShadow: `0 0 15px ${ARCHITECTURE_LAYERS[activeLayer].primary}66`,
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 65%, transparent 100%)",
                                    backgroundSize: "100% 200%",
                                    animation: "conduitEnergyFlowVertical 2.5s linear infinite",
                                    opacity: 0.9,
                                }}
                            />
                        </div>
                        {renderLayerItems(true)}
                    </div>
                </div>
                <div id="radar" style={{ minHeight: "120vh", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#010204", position: "relative", zIndex: 2 }}>
                    <Radar />
                </div>

                <SolutionDesignSection />

                <section id="ops" style={{ height: "120vh", padding: "20vh 25vw 20vh 380px", background: "#010204", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 style={{ fontSize: "0.8rem", color: "#10B981", letterSpacing: "0.4em", marginBottom: "30px", textTransform: "uppercase" }}>04 // Automation + Implementation</h2>
                    <p style={{ fontSize: "4.5rem", fontWeight: 200, lineHeight: 1.1 }}>Execution Engine <br /><span style={{ opacity: 0.3 }}>Swarm Orchestration.</span></p>
                </section>

                <section id="refine" style={{ height: "120vh", padding: "20vh 25vw 20vh 380px", background: "linear-gradient(180deg, #010204, #080c14)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 style={{ fontSize: "0.8rem", color: "#F59E0B", letterSpacing: "0.4em", marginBottom: "30px", textTransform: "uppercase" }}>05 // Continuous Improvement</h2>
                    <p style={{ fontSize: "4.5rem", fontWeight: 200, lineHeight: 1.1 }}>Recursive Loop <br /><span style={{ opacity: 0.3 }}>Continuous Optimization.</span></p>
                </section>
            </main>
        </>
    );
}






