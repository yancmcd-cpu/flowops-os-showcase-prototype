"use client";

import styles from './Hero.module.css';
import LanguageToggle from './LanguageToggle';
import SystemBackground from './SystemBackground';
import { useLanguage } from './LanguageContext';

export default function Hero() {
    const { language } = useLanguage();

    return (
        <section className={`section ${styles.hero}`}>
            <SystemBackground />
            <LanguageToggle />

            <div className={styles.glowOrb} />
            <div className="container">
                <div className={styles.content}>

                    <div className={`${styles.logoContainer} animate-fade-in`}>
                        <div className={styles.logoMarkWrapper}>
                            <img src="/logo.png" alt="FlowOps Studio Logo" className={styles.logoImage} />
                        </div>
                        <h1 className={styles.mainHeader}>FlowOps Studio</h1>
                    </div>

                    <h2 className={`animate-fade-in ${styles.secondaryHeader}`} style={{ animationDelay: '0.1s' }}>
                        {language === 'en' ? (
                            <>Our <span className="gradient-text-accent">AI-Powered</span><br />Agency Operating System</>
                        ) : (
                            <>ระบบปฏิบัติการ<span className="gradient-text-accent">พลัง AI</span><br />สำหรับเอเจนซี่ยุคใหม่</>
                        )}
                    </h2>

                    <p className={`animate-fade-in ${styles.description}`} style={{ animationDelay: '0.2s' }}>
                        {language === 'en' ?
                            "A modular intelligence system coordinating strategy, architecture, engineering, and continuous operations to deliver scalable agency output." :
                            "ระบบอัจฉริยะแบบแยกส่วนที่ประสานกลยุทธ์ สถาปัตยกรรม วิศวกรรม และการดำเนินงานอย่างต่อเนื่อง เพื่อการขยายขอบเขตการทำงานของเอเจนซี่"}
                    </p>

                    <div className={`animate-fade-in ${styles.actions}`} style={{ animationDelay: '0.3s' }}>
                        <a href="#workflows" className={styles.primaryBtn}>
                            {language === 'en' ? "Explore Workflows" : "สำรวจขั้นตอนการทำงาน"}
                        </a>
                        <a href="#operations" className={styles.secondaryBtn}>
                            {language === 'en' ? "View System Map" : "ดูแผนผังระบบ"}
                        </a>
                    </div>

                    {/* System Status Strip */}
                    <div className={`animate-fade-in ${styles.statusStrip}`} style={{ animationDelay: '0.4s' }}>
                        <div className={styles.statusItem}>
                            <span className={styles.statusDot} style={{ background: 'var(--accent-base)' }} />
                            <span>{language === 'en' ? 'Opportunity Scan — Active' : 'ระบบสแกนโอกาส — ทำงาน'}</span>
                        </div>
                        <div className={styles.statusItem}>
                            <span className={styles.statusDot} style={{ background: 'var(--accent-secondary)' }} />
                            <span>{language === 'en' ? 'Workflow Engine — Coordinated' : 'ระบบจัดการเวิร์กโฟลว์ — ประสานงาน'}</span>
                        </div>
                        <div className={styles.statusItem}>
                            <span className={styles.statusDot} style={{ background: '#f59e0b' }} />
                            <span>{language === 'en' ? 'Notion Core — Synced' : 'ฐานข้อมูล Notion — ซิงค์แล้ว'}</span>
                        </div>
                        <div className={styles.statusItem}>
                            <span className={`${styles.statusDot} ${styles.pulseDot}`} style={{ background: 'var(--accent-success)' }} />
                            <span>{language === 'en' ? 'Multi-Model Layer — Online' : 'ระบบปัญญาประดิษฐ์ — พร้อมใช้งาน'}</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
