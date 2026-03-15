"use client";

import { Link as LinkIcon, Blocks, GitBranch, Terminal, Sparkles } from 'lucide-react';
import styles from './Integrations.module.css';
import { useLanguage } from './LanguageContext';

const TOOLS_DATA = {
    en: [
        {
            name: 'Notion Database',
            desc: 'The central system memory driving structured state.',
            icon: Blocks,
            color: 'var(--accent-base)'
        },
        {
            name: 'NotebookLM MCP',
            desc: 'Deep local knowledge injection for LLM analysis.',
            icon: Terminal,
            color: 'var(--accent-secondary)'
        },
        {
            name: 'Multi-Model Intelligence',
            desc: 'FlowOps selectively uses Gemini 3.1 Pro, Claude Opus 4.6, and Claude Sonnet 4.6 for research, reasoning, synthesis, and execution support depending on workflow requirements.',
            icon: Sparkles,
            color: 'var(--accent-tertiary)'
        },
        {
            name: 'GitHub / Vercel',
            desc: 'Seamless deployment pipelines for Chris.',
            icon: GitBranch,
            color: 'var(--text-primary)'
        }
    ],
    th: [
        {
            name: 'ฐานข้อมูล Notion',
            desc: 'หน่วยความจำระบบส่วนกลางที่ขับเคลื่อนสถานะแบบมีโครงสร้าง',
            icon: Blocks,
            color: 'var(--accent-base)'
        },
        {
            name: 'NotebookLM MCP',
            desc: 'การป้อนความรู้เชิงลึกในพื้นที่สำหรับการวิเคราะห์ด้วย LLM',
            icon: Terminal,
            color: 'var(--accent-secondary)'
        },
        {
            name: 'Multi-Model Intelligence',
            desc: 'FlowOps เลือกใช้ Gemini 3.1 Pro, Claude Opus 4.6 และ Claude Sonnet 4.6 สำหรับการวิจัย การให้เหตุผล การสังเคราะห์ และสนับสนุนการดำเนินการ ขึ้นอยู่กับข้อกำหนดของเวิร์กโฟลว์',
            icon: Sparkles,
            color: 'var(--accent-tertiary)'
        },
        {
            name: 'GitHub / Vercel',
            desc: 'ไปป์ไลน์การติดตั้งที่ไร้รอยต่อสำหรับ Chris',
            icon: GitBranch,
            color: 'var(--text-primary)'
        }
    ]
};

const TRANSLATIONS = {
    en: {
        infraTitle: "System Infrastructure Layers",
        infraSubtitle: "Coordinated memory, knowledge, reasoning, and deployment layers powering the FlowOps OS.",
        deliversTitle: "How FlowOps Delivers",
        autoSys: "Automation Systems",
        autoDesc: "Operational workflows, internal tools, and AI-assisted processes designed to automate repetitive tasks and improve operational efficiency.",
        webSys: "Website Systems",
        webDesc: "Conversion-focused websites, landing pages, and front-end interfaces translating strategic insights into public-facing digital experiences.",
        hybridSys: "Hybrid Systems",
        hybridDesc: "Coordinated solutions combining automation infrastructure with public-facing web interfaces to create scalable digital operating models.",
        closingPrefix: "FlowOps Studio OS evaluates opportunities, prototypes the right systems, and deploys solutions designed to deliver ",
        closingHighlight: "measurable results",
        closingSuffix: "."
    },
    th: {
        infraTitle: "เลเยอร์โครงสร้างพื้นฐานระบบ",
        infraSubtitle: "ประสานงานหน่วยความจำ ความรู้ การให้เหตุผล และการติดตั้งที่ขับเคลื่อน FlowOps OS",
        deliversTitle: "วิธีที่ FlowOps ส่งมอบงาน",
        autoSys: "ระบบอัตโนมัติ",
        autoDesc: "เวิร์กโฟลว์การปฏิบัติงาน เครื่องมือภายใน และกระบวนการที่มี AI ช่วยเพื่อทำให้งานซ้ำซากเป็นอัตโนมัติและปรับปรุงประสิทธิภาพการทำงาน",
        webSys: "ระบบเว็บไซต์",
        webDesc: "เว็บไซต์ที่เน้น Conversion หน้า Landing Page และอินเทอร์เฟซส่วนหน้าที่แปลงกลยุทธ์เป็นประสบการณ์ดิจิทัลที่เข้าถึงบุคคลทั่วไปได้",
        hybridSys: "ระบบไฮบริด",
        hybridDesc: "โซลูชันที่ประสานโครงสร้างพื้นฐานอัตโนมัติเข้ากับเว็บสาธารณะเพื่อสร้างรูปแบบการทำงานดิจิทัลที่สามารถขยายขนาดได้",
        closingPrefix: "FlowOps Studio OS ประเมินโอกาส สร้างต้นแบบระบบที่เหมาะสม และปรับใช้โซลูชันที่ออกแบบมาเพื่อส่งมอบ",
        closingHighlight: "ผลลัพธ์ที่วัดได้",
        closingSuffix: "."
    }
};

export default function Integrations() {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS];
    const tools = TOOLS_DATA[language as keyof typeof TOOLS_DATA];

    return (
        <section className={`section ${styles.integrationsSection}`} id="infrastructure">
            <div className="container">
                <div className={`${styles.header} animate-on-scroll`}>
                    <span className={styles.eyebrow}>
                        {language === 'en' ? 'Infrastructure Layer' : 'โครงสร้างพื้นฐาน'}
                    </span>
                    <h2>{t.infraTitle}</h2>
                    <p className="gradient-text">{t.infraSubtitle}</p>
                </div>

                <div className={styles.grid}>
                    {tools.map((tool, i) => {
                        const Icon = tool.icon;
                        return (
                            <div key={tool.name} className={`glass-card ${styles.card}`} style={{ animationDelay: `${i * 0.15}s` }}>
                                <div className={styles.iconWrapper} style={{ color: tool.color }}>
                                    <Icon size={32} />
                                    <LinkIcon size={14} className={styles.linkBadge} />
                                </div>
                                <h3>{tool.name}</h3>
                                <p>{tool.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* How FlowOps Delivers Section */}
                <div className={`${styles.deliveryContainer} animate-on-scroll`}>
                    <span className={styles.eyebrow}>
                        {language === 'en' ? 'Execution Layer' : 'ระบบการทำงาน'}
                    </span>
                    <h3>{t.deliversTitle}</h3>

                    <div className={styles.deliveryGrid}>
                        <div className={styles.deliveryCard} style={{ color: 'var(--accent-base)' } as React.CSSProperties}>
                            <h4>{t.autoSys}</h4>
                            <p>{t.autoDesc}</p>
                        </div>
                        <div className={styles.deliveryCard} style={{ color: 'var(--accent-tertiary)' } as React.CSSProperties}>
                            <h4>{t.webSys}</h4>
                            <p>{t.webDesc}</p>
                        </div>
                        <div className={styles.deliveryCard} style={{ color: 'var(--accent-success)' } as React.CSSProperties}>
                            <h4>{t.hybridSys}</h4>
                            <p>{t.hybridDesc}</p>
                        </div>
                    </div>

                    <p className={styles.closingStatement}>
                        {t.closingPrefix}
                        <span style={{ color: 'var(--accent-base)' }}>{t.closingHighlight}</span>
                        {t.closingSuffix}
                    </p>
                </div>

            </div>
        </section>
    );
}
