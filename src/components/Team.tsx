"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, X } from 'lucide-react';
import styles from './Team.module.css';
import { useLanguage } from './LanguageContext';

const TEAM_MEMBERS_DATA = {
    en: [
        {
            id: 'alex',
            name: 'Alex',
            role: 'Strategist',
            image: '/assets/avatars/alex_strategist.png',
            originalImage: '/assets/avatars/alex_strategist_revised.png',
            description: 'Ensures every project aligns with the core business and revenue goals. Alex defines the "Why" and "What" before anything is built.',
            responsibilities: [
                'Strategic Validation & Go/No-Go decisions',
                'Target Audience & Pain Point Definition',
                'Revenue Logic & Offer alignment',
                'High-level project messaging'
            ]
        },
        {
            id: 'blake',
            name: 'Blake',
            role: 'Systems Architect',
            image: '/assets/avatars/blake_architect.png',
            originalImage: '/assets/avatars/blake_architect_revised.png',
            description: 'Designs the blueprint. Blake turns strategy into structured systems, deciding the components, architecture, and UI/UX approach.',
            responsibilities: [
                'System Architecture & Flow Design',
                'Tech Stack Selection & MVP Scoping',
                'Information Architecture',
                'Automation trigger mapping'
            ]
        },
        {
            id: 'chris',
            name: 'Chris',
            role: 'Full Stack Engineer',
            image: '/assets/avatars/chris_engineer.png',
            originalImage: '/assets/avatars/chris_engineer_revised.png',
            description: 'Executes the build. Chris writes the code, configures the infrastructure, and connects the APIs to bring the systems to life.',
            responsibilities: [
                'Frontend & Backend Development',
                'API Integration (Notion, NotebookLM)',
                'Prompt Engineering & Agent Logic',
                'Technical Feasibility testing'
            ]
        },
        {
            id: 'dana',
            name: 'Dana',
            role: 'Operator',
            image: '/assets/avatars/dana_operator.png',
            originalImage: '/assets/avatars/dana_operator.png',
            description: 'Maintains system memory and operational coherence. Dana handles documentation and ensures records are spotless.',
            responsibilities: [
                'SOP Library Management',
                'Notion Database Updates',
                'Knowledge Asset organization',
                'Workflow State Management'
            ]
        }
    ],
    th: [
        {
            id: 'alex',
            name: 'Alex',
            role: 'นักกลยุทธ์',
            image: '/assets/avatars/alex_strategist.png',
            originalImage: '/assets/avatars/alex_strategist_revised.png',
            description: 'รับรองว่าทุกโปรเจกต์สอดคล้องกับธุรกิจหลักและเป้าหมายรายได้ Alex กำหนด "ทำไม" และ "อะไร" ก่อนที่จะสร้างสิ่งใดๆ',
            responsibilities: [
                'การตรวจสอบเชิงกลยุทธ์และการตัดสินใจ Go/No-Go',
                'กลุ่มเป้าหมายและการกำหนดจุดเจ็บปวด (Pain Point)',
                'ตรรกะรายได้และการจัดการข้อเสนอ',
                'การสื่อสารโปรเจกต์ระดับสูง'
            ]
        },
        {
            id: 'blake',
            name: 'Blake',
            role: 'สถาปนิกระบบ',
            image: '/assets/avatars/blake_architect.png',
            originalImage: '/assets/avatars/blake_architect_revised.png',
            description: 'ออกแบบพิมพ์เขียว Blake เปลี่ยนกลยุทธ์ให้เป็นระบบที่มีโครงสร้าง ตัดสินใจเลือกองค์ประกอบ สถาปัตยกรรม และแนวทาง UI/UX',
            responsibilities: [
                'สถาปัตยกรรมระบบและการออกแบบ Flow',
                'การเลือกเทคโนโลยีและการกำหนดขอบเขต MVP',
                'สถาปัตยกรรมข้อมูล',
                'การวางแผนทริกเกอร์ระบบอัตโนมัติ'
            ]
        },
        {
            id: 'chris',
            name: 'Chris',
            role: 'วิศวกร Full Stack',
            image: '/assets/avatars/chris_engineer.png',
            originalImage: '/assets/avatars/chris_engineer_revised.png',
            description: 'ดำเนินการสร้าง Chris เขียนโค้ด กำหนดค่าโครงสร้างพื้นฐาน และเชื่อมต่อ API เพื่อทำให้ระบบทำงานได้จริง',
            responsibilities: [
                'การพัฒนา Frontend และ Backend',
                'การรวม API (Notion, NotebookLM)',
                'วิศวกรรม Prompt และตรรกะของ Agent',
                'การทดสอบความเป็นไปได้ทางเทคนิค'
            ]
        },
        {
            id: 'dana',
            name: 'Dana',
            role: 'ผู้ปฏิบัติการ',
            image: '/assets/avatars/dana_operator.png',
            originalImage: '/assets/avatars/dana_operator.png',
            description: 'รักษาหน่วยความจำของระบบและความสอดคล้องในการดำเนินงาน Dana จัดการเอกสารและดูแลให้บันทึกมีความถูกต้องสมบูรณ์',
            responsibilities: [
                'การจัดการห้องสมุด SOP (ขั้นตอนการปฏิบัติงานมาตรฐาน)',
                'การอัปเดตฐานข้อมูล Notion',
                'การจัดการทรัพยากรความรู้',
                'การจัดการสถานะเวิร์กโฟลว์'
            ]
        }
    ]
};

const TRANSLATIONS = {
    en: {
        title: "Meet the AI Agent Specialist Team",
        subtitle: "The specialized OS roles that turn ideas into scalable automated solutions.",
        coreResp: "Core Responsibilities"
    },
    th: {
        title: "พบกับทีมผู้เชี่ยวชาญ AI Agent",
        subtitle: "บทบาทเฉพาะทางของ OS ที่เปลี่ยนไอเดียให้เป็นโซลูชันอัตโนมัติที่ขยายขนาดได้",
        coreResp: "ความรับผิดชอบหลัก"
    }
};

export default function Team() {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS];
    const teamMembers = TEAM_MEMBERS_DATA[language as keyof typeof TEAM_MEMBERS_DATA];
    const [activeMember, setActiveMember] = useState<string | null>(null);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveMember(null);
    };

    return (
        <section className={`section ${styles.teamSection}`}>
            <div className="container">
                <div className={`${styles.header} animate-on-scroll`}>
                    <span className={styles.eyebrow}>
                        {language === 'en' ? 'Specialist Roles' : 'ทีมผู้เชี่ยวชาญเฉพาะด้าน'}
                    </span>
                    <h2>{t.title}</h2>
                    <p className="gradient-text">{t.subtitle}</p>
                </div>

                <div className={styles.grid}>
                    {teamMembers.map((member) => {
                        const isActive = activeMember === member.id;
                        return (
                            <div
                                key={member.id}
                                className={`glass-card ${styles.card} ${isActive ? styles.activeCard : ''}`}
                                onClick={() => setActiveMember(isActive ? null : member.id)}
                            >
                                {!isActive ? (
                                    <div className={styles.cardContent}>
                                        <div className={styles.avatarWrapper}>
                                            <Image
                                                src={member.image}
                                                alt={`${member.name} - ${member.role}`}
                                                fill
                                                className={styles.avatarImg}
                                                unoptimized
                                            />
                                        </div>
                                        <div className={styles.info}>
                                            <h3>{member.name}</h3>
                                            <p className={styles.roleLabel}>{member.role}</p>
                                        </div>
                                        <button className={styles.expandBtn}>
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className={`${styles.activeContent} animate-fade-in`}>
                                        <button className={styles.closeBtn} onClick={handleClose}>
                                            <X size={20} />
                                        </button>

                                        <div className={styles.activeHeader}>
                                            <div className={styles.largeAvatarWrapper}>
                                                <Image
                                                    src={member.originalImage}
                                                    alt={`${member.name} full illustration`}
                                                    fill
                                                    className={styles.avatarImgLarge}
                                                    unoptimized
                                                />
                                            </div>
                                            <div>
                                                <h3>{member.name}</h3>
                                                <p className={styles.roleLabelHighlight}>{member.role}</p>
                                            </div>
                                        </div>

                                        <p className={styles.fullDescription}>{member.description}</p>

                                        <div className={styles.responsibilities}>
                                            <h4>{t.coreResp}</h4>
                                            <ul>
                                                {member.responsibilities.map((resp, i) => (
                                                    <li key={i}>{resp}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
