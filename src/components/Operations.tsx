"use client";

import { Database, FileText, Bot, ArrowRight, Server, Activity } from 'lucide-react';
import Image from 'next/image';
import styles from './Operations.module.css';
import { useLanguage } from './LanguageContext';

const TRANSLATIONS = {
    en: {
        title: "System Memory & Operations",
        subtitle: "The OS requires a pristine central source of truth. Dana, the Operations Agent, maintains state across all active projects, logs evaluations, and generates Standard Operating Procedures.",
        operatorRole: "Operator // Memory Node",
        operatorDesc: "Manages the Notion data layer and cross-references system states.",
        workflowExecution: "Workflow Execution",
        llmOutputs: "LLM Outputs",
        notionCore: "Notion Core DB",
        ideaVault: "Idea Vault",
        evaluations: "Product Evaluations",
        specs: "Automation Specs",
        websites: "Website Projects",
        sopGen: "SOP Generation",
        knowledge: "Knowledge Library"
    },
    th: {
        title: "หน่วยความจำระบบและการปฏิบัติการ",
        subtitle: "OS ต้องการแหล่งข้อมูลหลักที่ถูกต้องสมบูรณ์ Dana ผู้ปฏิบัติการ คอยรักษาสถานะของโปรเจกต์ที่ทำงานอยู่ทั้งหมด บันทึกการประเมินผล และสร้างขั้นตอนการปฏิบัติงานมาตรฐาน (SOP)",
        operatorRole: "ผู้ปฏิบัติการ // โหนดหน่วยความจำ",
        operatorDesc: "จัดการชั้นข้อมูล Notion และตรวจสอบสถานะระบบข้ามส่วนงาน",
        workflowExecution: "การดำเนินการเวิร์กโฟลว์",
        llmOutputs: "ผลลัพธ์จาก LLM",
        notionCore: "ฐานข้อมูลหลัก Notion",
        ideaVault: "คลังเก็บไอเดีย",
        evaluations: "การประเมินผลิตภัณฑ์",
        specs: "ข้อกำหนดระบบอัตโนมัติ",
        websites: "โปรเจกต์เว็บไซต์",
        sopGen: "การสร้าง SOP",
        knowledge: "ห้องสมุดความรู้"
    }
};

export default function Operations() {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS];

    return (
        <section id="operations" className={`section ${styles.opsSection}`}>
            <div className="container">
                <div className={styles.layout}>

                    {/* Left Column: Context & Dana Avatar */}
                    <div className={styles.contextPanel}>
                        <div className={`animate-on-scroll`}>
                            <span className={styles.eyebrow}>
                                {language === 'en' ? 'Memory Layer' : 'ระบบความจำ'}
                            </span>
                            <h2>{t.title}</h2>
                            <p className={`gradient-text ${styles.subtitle}`}>
                                {t.subtitle}
                            </p>
                        </div>

                        <div className={styles.operatorProfile}>
                            <div className={styles.avatarWrapper}>
                                <Image
                                    src="/assets/avatars/dana_operator.png"
                                    alt="Dana - Operator"
                                    fill
                                    className={styles.avatarImg}
                                    unoptimized
                                />
                            </div>
                            <div className={styles.roleDesc}>
                                <h3>Dana</h3>
                                <span className={styles.tag}>{t.operatorRole}</span>
                                <p>{t.operatorDesc}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Data Flow */}
                    <div className={styles.visualFlow}>
                        <div className={styles.flowRow}>
                            {/* Data Sources */}
                            <div className={styles.inputGroup}>
                                <div className={`${styles.node} ${styles.animateFloat1}`}>
                                    <Activity size={20} />
                                    <span>{t.workflowExecution}</span>
                                </div>
                                <div className={`${styles.node} ${styles.animateFloat2}`}>
                                    <Bot size={20} />
                                    <span>{t.llmOutputs}</span>
                                </div>
                            </div>

                            {/* Data Flow Arrows */}
                            <div className={styles.connectionArrows}>
                                <div className={styles.flowingLine} />
                                <ArrowRight className={styles.arrowIcon} size={24} />
                            </div>

                            {/* Notion / Core DB */}
                            <div className={styles.coreSystem}>
                                <div className={styles.systemIcon}>
                                    <Database size={32} />
                                </div>
                                <h4>{t.notionCore}</h4>

                                <div className={styles.databaseCards}>
                                    <div className={styles.dbCard}>
                                        <div className={styles.dot} style={{ backgroundColor: 'var(--accent-base)' }} />
                                        {t.ideaVault}
                                    </div>
                                    <div className={styles.dbCard}>
                                        <div className={styles.dot} style={{ backgroundColor: 'var(--accent-secondary)' }} />
                                        {t.evaluations}
                                    </div>
                                    <div className={styles.dbCard}>
                                        <div className={styles.dot} style={{ backgroundColor: 'var(--accent-success)' }} />
                                        {t.specs}
                                    </div>
                                    <div className={styles.dbCard}>
                                        <div className={styles.dot} style={{ backgroundColor: '#f59e0b' }} />
                                        {t.websites}
                                    </div>
                                </div>
                            </div>

                            {/* SOP Generation Output */}
                            <div className={styles.connectionArrows}>
                                <div className={styles.flowingLine} style={{ animationDelay: '1s' }} />
                                <ArrowRight className={styles.arrowIcon} size={24} />
                            </div>

                            <div className={styles.outputGroup}>
                                <div className={`${styles.node} ${styles.outputNode}`}>
                                    <FileText size={20} className={styles.iconPulse} />
                                    <span>{t.sopGen}</span>
                                </div>
                                <div className={`${styles.node} ${styles.outputNode}`}>
                                    <Server size={20} />
                                    <span>{t.knowledge}</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
