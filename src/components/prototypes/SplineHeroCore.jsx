import React from "react";
import Script from "next/script";

export default function SplineHeroCore() {
    return (
        <>
            <Script
                type="module"
                src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"
            />
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
                aria-hidden="true"
            >
                <spline-viewer
                    url="https://prod.spline.design/jjy1wq7xWv8RUvFC/scene.splinecode"
                    loading-anim-type="none"
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        background: "transparent",
                        pointerEvents: "none",
                    }}
                ></spline-viewer>
            </div>
        </>
    );
}
