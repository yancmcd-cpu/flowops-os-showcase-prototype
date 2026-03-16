"use client";

import styles from "./SectionAtmosphere.module.css";

const NODE_FIELD = [
  { left: "6%", top: "16%", size: "3px", color: "white", dx: "34px", dy: "-22px", duration: "22s", delay: "0s" },
  { left: "13%", top: "58%", size: "2px", color: "#06B6D4", dx: "-28px", dy: "24px", duration: "18s", delay: "-2s" },
  { left: "19%", top: "32%", size: "2px", color: "#6366F1", dx: "26px", dy: "18px", duration: "20s", delay: "-4s" },
  { left: "27%", top: "76%", size: "3px", color: "white", dx: "-20px", dy: "-18px", duration: "24s", delay: "-1s" },
  { left: "34%", top: "12%", size: "2px", color: "#06B6D4", dx: "14px", dy: "20px", duration: "19s", delay: "-6s" },
  { left: "42%", top: "64%", size: "2px", color: "white", dx: "20px", dy: "-14px", duration: "17s", delay: "-3s" },
  { left: "51%", top: "24%", size: "3px", color: "#6366F1", dx: "-24px", dy: "18px", duration: "25s", delay: "-7s" },
  { left: "59%", top: "72%", size: "2px", color: "#06B6D4", dx: "18px", dy: "-22px", duration: "21s", delay: "-5s" },
  { left: "68%", top: "18%", size: "2px", color: "white", dx: "24px", dy: "16px", duration: "18s", delay: "-8s" },
  { left: "76%", top: "54%", size: "3px", color: "#6366F1", dx: "-18px", dy: "22px", duration: "23s", delay: "-9s" },
  { left: "84%", top: "29%", size: "2px", color: "#06B6D4", dx: "12px", dy: "-18px", duration: "20s", delay: "-10s" },
  { left: "91%", top: "68%", size: "2px", color: "white", dx: "-22px", dy: "-16px", duration: "26s", delay: "-12s" },
];

const ORBS = [
  { className: styles.orbOne, delay: "0s" },
  { className: styles.orbTwo, delay: "-4s" },
];

export default function SectionAtmosphere({ className = "" }) {
  return (
    <div className={`${styles.atmosphere} ${className}`.trim()} aria-hidden="true">
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />
      <div className={styles.glowLower} />
      {ORBS.map((orb, index) => (
        <div key={index} className={`${styles.travelOrb} ${orb.className}`} style={{ animationDelay: orb.delay }} />
      ))}
      {NODE_FIELD.map((node, index) => (
        <span
          key={index}
          className={styles.node}
          style={{
            left: node.left,
            top: node.top,
            width: node.size,
            height: node.size,
            color: node.color,
            "--dx": node.dx,
            "--dy": node.dy,
            "--duration": node.duration,
            "--delay": node.delay,
          }}
        />
      ))}
    </div>
  );
}
