import styles from './SystemBackground.module.css';

export default function SystemBackground() {
    return (
        <div className={styles.container}>
            <div className={styles.gridOverlay} />

            <svg className={styles.svgLayer} preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 1000">
                {/* Subtle connecting lines */}
                <path d="M200,300 L600,400 L800,200 L400,100 Z" className={styles.line} />
                <path d="M600,400 L700,800 L300,700 L200,300" className={styles.line} />
                <path d="M400,100 L500,500 L700,800 L200,300" className={styles.line} />

                {/* Orbiting particles */}
                <circle cx="200" cy="300" r="4" className={styles.nodeBase} />
                <circle cx="600" cy="400" r="6" className={styles.nodeActive} />
                <circle cx="800" cy="200" r="3" className={styles.nodeBase} />
                <circle cx="400" cy="100" r="5" className={styles.nodeAccent} />
                <circle cx="700" cy="800" r="4" className={styles.nodeBase} />
                <circle cx="300" cy="700" r="5" className={styles.nodeActive} />
                <circle cx="500" cy="500" r="8" className={styles.nodeCore} />

                {/* Animated data packets (pulses) */}
                <circle cx="0" cy="0" r="2.5" className={styles.packet1}>
                    <animateMotion dur="8s" repeatCount="indefinite" path="M200,300 L600,400 L800,200 L400,100 Z" />
                </circle>
                <circle cx="0" cy="0" r="2.5" className={styles.packet2}>
                    <animateMotion dur="12s" repeatCount="indefinite" path="M600,400 L700,800 L300,700 L200,300" />
                </circle>
                <circle cx="0" cy="0" r="2.5" className={styles.packet3}>
                    <animateMotion dur="10s" repeatCount="indefinite" path="M400,100 L500,500 L700,800 L200,300" />
                </circle>
            </svg>
        </div>
    );
}
