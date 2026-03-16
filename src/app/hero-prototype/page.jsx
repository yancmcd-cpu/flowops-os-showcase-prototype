"use client";

import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageContext";
import Radar from "@/components/Radar";
import RevealSection from "@/components/RevealSection";
import FlowOpsFooter from "@/components/footer/FlowOpsFooter";
import MissionControlSection from "@/components/mission-control/MissionControlSection";
import KnowledgeVaultSection from "@/components/knowledge-vault/KnowledgeVaultSection";
import SolutionDesignSection from "@/components/solution-design/SolutionDesignSection";
import Gallery from "@/components/ui/gallery";
import styles from "./page.module.css";

function FlowOpsMark() {
    return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className={styles.flowOpsMark}>
            <path
                d="M21 22H74V32H37L49 52H82V62H49L61 84V118H51V87L21 34V22Z"
                fill="url(#flowops-mark-left)"
            />
            <path
                d="M83 22H114L73 87V118H63V84L90 34H79L65 58L56 53L83 22Z"
                fill="url(#flowops-mark-right)"
            />
            <defs>
                <linearGradient id="flowops-mark-left" x1="21" y1="22" x2="61" y2="118" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#48C7C2" />
                    <stop offset="100%" stopColor="#43B3B6" />
                </linearGradient>
                <linearGradient id="flowops-mark-right" x1="56" y1="22" x2="114" y2="118" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6F83FF" />
                    <stop offset="100%" stopColor="#5B74F0" />
                </linearGradient>
            </defs>
        </svg>
    );
}

const desktopSystemCards = [
    {
        title: "Signal Detected",
        status: "Opportunity Identified",
        color: "#06B6D4",
        glow: "rgba(6, 182, 212, 0.2)",
        left: "79%",
        top: "34%",
        delay: "0s",
    },
    {
        title: "Skill Selected",
        status: "System Orchestrating",
        color: "#6366F1",
        glow: "rgba(99, 102, 241, 0.2)",
        left: "81%",
        top: "51%",
        delay: "4s",
    },
    {
        title: "Workflow Routed",
        status: "Execution Active",
        color: "#10B981",
        glow: "rgba(16, 185, 129, 0.2)",
        left: "79%",
        top: "68%",
        delay: "8s",
    },
];

const mobileSystemCards = [
    {
        title: "Signal Detected",
        status: "Opportunity Identified",
        color: "#06B6D4",
        glow: "rgba(6, 182, 212, 0.2)",
        left: "60%",
        top: "34%",
        delay: "0s",
    },
    {
        title: "Skill Selected",
        status: "System Orchestrating",
        color: "#6366F1",
        glow: "rgba(99, 102, 241, 0.2)",
        left: "60%",
        top: "48%",
        delay: "4s",
    },
    {
        title: "Workflow Routed",
        status: "Execution Active",
        color: "#10B981",
        glow: "rgba(16, 185, 129, 0.2)",
        left: "60%",
        top: "61%",
        delay: "8s",
    },
];

const HERO_COPY = {
    en: {
        studio: "FLOWOPS STUDIO",
        titleBase: "Agency",
        titleOperating: "Operating",
        titleSystem: "System",
        description: "An intelligence system that detects opportunities, designs solutions, and orchestrates execution.",
        outputEyebrow: "SYSTEM OUTPUT",
    },
    th: {
        studio: "โฟลว์ออปส์ สตูดิโอ",
        titleBase: "ระบบปฏิบัติการ",
        titleOperating: "เอเจนซี",
        titleSystem: "อัจฉริยะ",
        description: "ระบบอัจฉริยะที่ตรวจจับโอกาส ออกแบบโซลูชัน และประสานการดำเนินงานให้เกิดผลลัพธ์",
        outputEyebrow: "ผลลัพธ์ของระบบ",
    },
};

const HERO_COPY_SAFE = {
    en: {
        studio: "FLOWOPS STUDIO",
        titleBase: "Agency",
        titleOperating: "Operating",
        titleSystem: "System",
        description: "An intelligence system that detects opportunities, designs solutions, and orchestrates execution.",
        outputEyebrow: "SYSTEM OUTPUT",
        loader: "INITIALIZING CORE",
    },
    th: {
        studio: "FLOWOPS STUDIO",
        titleBase: "ระบบ",
        titleOperating: "ปฏิบัติการ",
        titleSystem: "อัจฉริยะ",
        description: "ระบบอัจฉริยะที่ตรวจจับโอกาส ออกแบบโซลูชัน และประสานการดำเนินงานให้เกิดผลลัพธ์",
        outputEyebrow: "ผลลัพธ์ของระบบ",
        loader: "กำลังเริ่มต้นคอร์",
    },
};

const HERO_SYSTEM_CARDS = {
    en: {
        desktop: desktopSystemCards,
        mobile: mobileSystemCards,
    },
    th: {
        desktop: [
            { title: "ตรวจพบสัญญาณ", status: "ระบุโอกาสแล้ว", color: "#06B6D4", glow: "rgba(6, 182, 212, 0.2)", left: "79%", top: "34%", delay: "0s" },
            { title: "เลือกทักษะแล้ว", status: "ระบบกำลังประสานงาน", color: "#6366F1", glow: "rgba(99, 102, 241, 0.2)", left: "81%", top: "51%", delay: "4s" },
            { title: "ส่งเข้าเวิร์กโฟลว์แล้ว", status: "กำลังดำเนินการ", color: "#10B981", glow: "rgba(16, 185, 129, 0.2)", left: "79%", top: "68%", delay: "8s" },
        ],
        mobile: [
            { title: "ตรวจพบสัญญาณ", status: "ระบุโอกาสแล้ว", color: "#06B6D4", glow: "rgba(6, 182, 212, 0.2)", left: "60%", top: "34%", delay: "0s" },
            { title: "เลือกทักษะแล้ว", status: "ระบบกำลังประสานงาน", color: "#6366F1", glow: "rgba(99, 102, 241, 0.2)", left: "60%", top: "48%", delay: "4s" },
            { title: "ส่งเข้าเวิร์กโฟลว์แล้ว", status: "กำลังดำเนินการ", color: "#10B981", glow: "rgba(16, 185, 129, 0.2)", left: "60%", top: "61%", delay: "8s" },
        ],
    },
};

export default function FlowOpsPage() {
    const { language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [isCoreLoaded, setIsCoreLoaded] = useState(false);
    const [isSystemActive, setIsSystemActive] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [randomNodes, setRandomNodes] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const mediaQuery = window.matchMedia("(max-width: 980px)");
        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);

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

        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    const handleSplineLoad = () => {
        setIsCoreLoaded(true);
        setTimeout(() => setShowLoader(false), 300);
        setTimeout(() => setIsSystemActive(true), 800);
    };

    const systemCards = isMobile ? HERO_SYSTEM_CARDS[language].mobile : HERO_SYSTEM_CARDS[language].desktop;
    const heroCopy = HERO_COPY_SAFE[language];

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
                @keyframes ribbonFlow {
                    0% { stroke-dashoffset: 240; opacity: 0; }
                    12% { opacity: 1; }
                    84% { opacity: 1; }
                    100% { stroke-dashoffset: -120; opacity: 0; }
                }
                @keyframes outputCardCycle {
                    0% { opacity: 0; transform: translate(-50%, calc(-50% + 20px)) scale(0.82); filter: blur(12px); }
                    10% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0px); }
                    34% { opacity: 1; transform: translate(-50%, calc(-50% - 8px)) scale(1); filter: blur(0px); }
                    42% { opacity: 0; transform: translate(calc(-50% + 18px), calc(-50% - 4px)) scale(0.94); filter: blur(10px); }
                    100% { opacity: 0; }
                }
                @keyframes textMetallicFlare {
                    0%, 15% { background-position: 100% center; filter: brightness(0.9) contrast(1); text-shadow: 0 0 0 rgba(0,0,0,0); }
                    35%, 55% { background-position: 50% center; filter: brightness(1.2) contrast(1.34); text-shadow: 1px 1px 0 rgba(255,255,255,0.22), 0 8px 18px rgba(0,0,0,0.34); }
                    75%, 100% { background-position: 0% center; filter: brightness(0.9) contrast(1); text-shadow: 0 0 0 rgba(0,0,0,0); }
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
                @keyframes driftIndependent {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(var(--dx), var(--dy)); }
                }
            `,
                }}
            />

            <main className={styles.pageMain}>
                <LanguageToggle />
                <section id="hero-top" className={styles.heroSection}>
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

                    <div className={styles.heroShell}>
                        <div className={styles.heroCopy}>
                            <div className={styles.heroEyebrowRow}>
                                <FlowOpsMark />
                                <p className={styles.heroEyebrow}>{heroCopy.studio}</p>
                            </div>
                            <h1 className={styles.heroTitle}>
                                <span className={styles.heroTitleBase}>{heroCopy.titleBase}</span>
                                <span className={styles.heroTitleCluster}>
                                    <div style={{ position: "absolute", left: "36%", top: "54%", width: "112%", height: "128%", background: "radial-gradient(circle, rgba(59, 130, 246, 0.34) 0%, rgba(99, 102, 241, 0.22) 42%, transparent 76%)", filter: "blur(38px)", animation: isSystemActive ? "textGlowBloom 4s ease-in-out infinite" : "none", zIndex: -1, transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
                                    <span className={styles.heroTitleAccent} style={{ animation: isSystemActive ? "textMetallicFlare 4s ease-in-out infinite" : "none" }}>{heroCopy.titleOperating}</span>
                                    <span className={styles.heroTitleAccentTight} style={{ animation: isSystemActive ? "textMetallicFlare 4s ease-in-out infinite" : "none" }}>{heroCopy.titleSystem}</span>
                                </span>
                            </h1>
                            <p className={styles.heroDescription}>{heroCopy.description}</p>
                        </div>

                        <div className={styles.heroVisual}>
                            <div className={styles.heroVisualCluster} aria-hidden="true">
                                <div className={styles.splineStage} style={{ opacity: isCoreLoaded ? 0.96 : 0.82, transition: "opacity 1.2s" }}>
                                    {mounted && <Spline scene="https://prod.spline.design/jjy1wq7xWv8RUvFC/scene.splinecode" onLoad={handleSplineLoad} />}
                                </div>
                            </div>

                            {isMobile && (
                                <div className={styles.outputCardsLayer} aria-hidden="true">
                                    {systemCards.map((card, index) => (
                                        <div
                                            key={index}
                                            className={styles.outputCard}
                                            style={{
                                                left: card.left,
                                                top: card.top,
                                                opacity: 0,
                                                animation: isSystemActive ? `outputCardCycle 12s linear ${card.delay} infinite both` : "none",
                                            }}
                                        >
                                            <div className={styles.systemCardShell}>
                                                <div className={styles.systemCardHeader}>
                                                    <span className={styles.systemCardEyebrow}>{heroCopy.outputEyebrow}</span>
                                                    <div className={styles.systemCardDot} style={{ background: card.color, boxShadow: `0 0 10px ${card.color}` }} />
                                                </div>
                                                <div className={styles.systemCardTitle}>{card.title}</div>
                                                <div className={styles.systemCardStatus} style={{ color: card.color }}>{card.status}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {showLoader && (
                                <div className={styles.loader}>
                                    <div style={{ width: "45px", height: "45px", border: "3px solid rgba(255,255,255,0.05)", borderTopColor: "#3B82F6", borderRadius: "50%", animation: "activeCoreSpin 0.8s linear infinite", margin: "0 auto 15px" }} />
                                    <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", opacity: 0.4, fontWeight: 600 }}>{heroCopy.loader}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {!isMobile && (
                        <div className={styles.desktopBeam} style={{ opacity: isSystemActive ? 1 : 0 }}>
                            <svg viewBox="0 0 560 220" preserveAspectRatio="none" className={styles.desktopBeamSvg}>
                                <defs>
                                    <linearGradient id="heroBeamGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="rgba(255,255,255,0.96)" />
                                        <stop offset="18%" stopColor="rgba(255,255,255,0.92)" />
                                        <stop offset="52%" stopColor="rgba(34,211,238,0.66)" />
                                        <stop offset="78%" stopColor="rgba(99,102,241,0.52)" />
                                        <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                                    </linearGradient>
                                    <filter id="heroBeamBlur" x="-20%" y="-40%" width="140%" height="180%">
                                        <feGaussianBlur stdDeviation="12" />
                                    </filter>
                                </defs>
                                <path
                                    d="M 22 150 C 150 78, 280 68, 530 104"
                                    fill="none"
                                    stroke="url(#heroBeamGradient)"
                                    strokeWidth="16"
                                    strokeLinecap="round"
                                    filter="url(#heroBeamBlur)"
                                    style={{
                                        animation: isSystemActive ? "ribbonFlow 4s linear infinite" : "none",
                                        opacity: 0.32,
                                        strokeDasharray: "210 190",
                                    }}
                                />
                                <path
                                    d="M 22 150 C 150 78, 280 68, 530 104"
                                    fill="none"
                                    stroke="url(#heroBeamGradient)"
                                    strokeWidth="3.2"
                                    strokeLinecap="round"
                                    style={{
                                        animation: isSystemActive ? "ribbonFlow 4s linear infinite" : "none",
                                        opacity: 0.88,
                                        strokeDasharray: "46 174",
                                    }}
                                />
                            </svg>
                        </div>
                    )}

                    {!isMobile && (
                        <div className={styles.desktopOutputCardsLayer} aria-hidden="true">
                            {desktopSystemCards.map((card, index) => (
                                <div
                                    key={index}
                                    className={styles.desktopOutputCard}
                                    style={{
                                        left: card.left,
                                        top: card.top,
                                        opacity: 0,
                                        animation: isSystemActive ? `outputCardCycle 12s linear ${card.delay} infinite both` : "none",
                                    }}
                                >
                                    <div className={styles.systemCardShell}>
                                        <div className={styles.systemCardHeader}>
                                            <span className={styles.systemCardEyebrow}>{heroCopy.outputEyebrow}</span>
                                            <div className={styles.systemCardDot} style={{ background: card.color, boxShadow: `0 0 10px ${card.color}` }} />
                                        </div>
                                        <div className={styles.systemCardTitle}>{card.title}</div>
                                        <div className={styles.systemCardStatus} style={{ color: card.color }}>{card.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.heroMask} />
                </section>

                <RevealSection>
                    <div id="radar" style={{ position: "relative", zIndex: 2 }}>
                        <Radar />
                    </div>
                </RevealSection>

                <SolutionDesignSection />

                <RevealSection>
                    <Gallery />
                </RevealSection>

                <MissionControlSection />

                <KnowledgeVaultSection />

                <FlowOpsFooter />
            </main>
        </>
    );
}
