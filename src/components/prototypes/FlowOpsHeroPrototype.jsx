import React from "react";
import SplineHeroCore from "./SplineHeroCore";

const PALETTE = {
    background: "#010206",
    cyan: "#00D1FF",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.64)",
};

export default function FlowOpsHeroPrototype() {
    return (
        <section
            style={{
                width: "100%",
                minHeight: "100vh",
                background: PALETTE.background,
                color: PALETTE.textPrimary,
                fontFamily: "Inter, system-ui, sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    overflow: "hidden",
                }}
                aria-hidden="true"
            >
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "30%",
                        width: "min(1700px, 130vw)",
                        height: "min(1100px, 112vh)",
                        transform: "translateY(-50%) scale(0.9)",
                        transformOrigin: "center center",
                        opacity: 0.94,
                    }}
                >
                    <SplineHeroCore />
                </div>
            </div>

            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "1280px",
                    margin: "0 auto",
                    minHeight: "100vh",
                    padding: "48px 24px",
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 560px) 1fr",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            letterSpacing: "0.24em",
                            color: PALETTE.cyan,
                            textTransform: "uppercase",
                        }}
                    >
                        Neural Operating System
                    </div>

                    <h1
                        style={{
                            fontSize: "clamp(48px, 5.5vw, 84px)",
                            fontWeight: 800,
                            lineHeight: 1.02,
                            letterSpacing: "-0.03em",
                            margin: 0,
                        }}
                    >
                        FlowOps <br /> Studio
                    </h1>

                    <p
                        style={{
                            fontSize: "clamp(16px, 1.3vw, 22px)",
                            lineHeight: 1.6,
                            color: PALETTE.textSecondary,
                            margin: 0,
                            maxWidth: "520px",
                        }}
                    >
                        Architecting the future of agentic intelligence. Deploy precise,
                        engineered neural engines that think, learn, and scale.
                    </p>

                    <div>
                        <a
                            href="#initialize"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "18px 36px",
                                background: PALETTE.cyan,
                                color: "#010206",
                                borderRadius: "6px",
                                fontWeight: 700,
                                fontSize: "16px",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                textDecoration: "none",
                                boxShadow: "0 12px 32px rgba(0, 209, 255, 0.2)",
                                width: "fit-content",
                            }}
                        >
                            Initialize Engine
                        </a>
                    </div>
                </div>

                <div />
            </div>

            <style>{`
                @media (max-width: 900px) {
                    section > div:last-child {
                        grid-template-columns: 1fr !important;
                        align-items: flex-start !important;
                        padding-top: 56px !important;
                        padding-bottom: 320px !important;
                    }

                    section > div:first-child > div {
                        left: -6% !important;
                        top: auto !important;
                        bottom: -6% !important;
                        width: min(165vw, 1100px) !important;
                        height: min(74vh, 700px) !important;
                        transform: scale(0.88) !important;
                    }
                }
            `}</style>
        </section>
    );
}
