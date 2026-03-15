"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, Lightbulb, CheckCircle2, FlaskConical, LayoutTemplate, Radar, FileText, Blocks, Bot } from 'lucide-react';
import styles from './Workflows.module.css';
import { useLanguage } from './LanguageContext';

// --- System Sequence Definition ---
const sequence = ['scan', 'intake', 'research', 'evaluate', 'prototype', 'automation', 'website', 'hybrid'];

const RAIL_NODES_DATA = {
    en: [
        { id: 'scan', label: 'Scan', icon: Radar, color: '#f59e0b' },
        { id: 'intake', label: 'Intake', icon: Lightbulb, color: 'var(--accent-base)' },
        { id: 'research', label: 'Research', icon: FileText, color: 'var(--accent-tertiary)' },
        { id: 'evaluate', label: 'Evaluate', icon: CheckCircle2, color: 'var(--accent-secondary)', isGate: true },
        { id: 'prototype', label: 'Prototype', icon: FlaskConical, color: 'var(--accent-success)' },
    ],
    th: [
        { id: 'scan', label: 'สแกน', icon: Radar, color: '#f59e0b' },
        { id: 'intake', label: 'รับข้อมูล', icon: Lightbulb, color: 'var(--accent-base)' },
        { id: 'research', label: 'วิจัย', icon: FileText, color: 'var(--accent-tertiary)' },
        { id: 'evaluate', label: 'ประเมิน', icon: CheckCircle2, color: 'var(--accent-secondary)', isGate: true },
        { id: 'prototype', label: 'สร้างต้นแบบ', icon: FlaskConical, color: 'var(--accent-success)' },
    ]
};

const OUTPUT_NODES_DATA = {
    en: [
        { id: 'automation', label: 'Automation Output', color: 'var(--accent-base)' },
        { id: 'website', label: 'Website Output', color: 'var(--accent-tertiary)' },
        { id: 'hybrid', label: 'Hybrid Output', color: 'var(--accent-success)' }
    ],
    th: [
        { id: 'automation', label: 'ผลลัพธ์ระบบอัตโนมัติ', color: 'var(--accent-base)' },
        { id: 'website', label: 'ผลลัพธ์เว็บไซต์', color: 'var(--accent-tertiary)' },
        { id: 'hybrid', label: 'ผลลัพธ์ไฮบริด', color: 'var(--accent-success)' }
    ]
};

const NODE_DETAILS_DATA = {
    en: {
        scan: {
            stage: 'Opportunity Scan',
            title: 'Continuous Signal Monitoring',
            desc: 'The OS actively monitors external discussion boards, forums, and ecosystems, extracting pain points to identify systemic automation or web opportunities before any manual intervention.',
            stateLabel: 'Scanning signals and extracting market gaps',
            roles: 'System Engine · LLM Parser',
            outputs: ['Raw user signals', 'Categorized pain points']
        },
        intake: {
            stage: 'Idea Intake',
            title: 'Centralized Concept Processing',
            desc: 'Raw ideas and signals are ingested into the Notion core. The system classifies concepts (e.g. tool vs website) and algorithmically scores them by commercial viability.',
            stateLabel: 'Processing new opportunities and scoring viability',
            roles: 'Dana (System) · Intelligent Routing',
            outputs: ['Ranked Opportunity Ticket', 'Initial System Classification']
        },
        research: {
            stage: 'Deep Research',
            title: 'Automated Insight Synthesis',
            desc: 'Based on the intake score, Multi-Model Intelligence dispatches research agents to gather domain-specific context, competitors, and technical precedents, formatting them into a synthesis report.',
            stateLabel: 'Researching market viability and indexing knowledge',
            roles: 'Alex · System Agents',
            outputs: ['Synthesis Research Report', 'Domain Knowledge Index']
        },
        evaluate: {
            stage: 'Decision Gate',
            title: 'Commercial & Technical Validation',
            desc: 'A critical checkpoint where architecture and strategy converge. The team validates the ICP, maps the system dependencies, and assesses build constraints before committing resources.',
            stateLabel: 'Decision gate engaged — architecture review in progress',
            roles: 'Alex · Blake · Chris',
            outputs: ['Go / No-Go decision', 'Prototype technical scope', 'Recommended output path']
        },
        prototype: {
            stage: 'Proof of Concept Prototype',
            title: 'Initial Build & MVP Verification',
            desc: 'Solutions are assembled into minimal viable states to test core mechanics. Code is executed, APIs attached, and UI frameworks erected to validate the logic mapped in Evaluation.',
            stateLabel: 'Prototype validation running in isolated environment',
            roles: 'Blake · Chris',
            outputs: ['Functional MVP Build', 'Architectural Action Blueprint']
        },
        automation: {
            stage: 'Automation Execution',
            title: 'System Deployment & Hand-off',
            desc: 'Deploying operational internal tools and background processing pipelines. Final code is merged, environments configured, and operating SOPs generated for system memory.',
            stateLabel: 'Execution output active: Deploying automation system',
            roles: 'Chris · Dana',
            outputs: ['Live production automation', 'System execution SOPs']
        },
        website: {
            stage: 'Website Execution',
            title: 'Frontend Deployment',
            desc: 'Shipping conversion-focused websites and UI dashboards. Front-end code is deployed, analytics injected, and delivery tracked across live domains.',
            stateLabel: 'Execution output active: Pushing website updates',
            roles: 'Chris · Dana',
            outputs: ['Live marketing website', 'Client handover spec']
        },
        hybrid: {
            stage: 'Hybrid Execution',
            title: 'Full-Stack Delivery',
            desc: 'Fusing backend automation logic with polished frontend interfaces. These complex SaaS architectures require coordinated multi-environment deployments.',
            stateLabel: 'Execution output active: Synchronizing hybrid stack',
            roles: 'Chris · Dana',
            outputs: ['Scalable SaaS application', 'API documentation']
        }
    },
    th: {
        scan: {
            stage: 'สแกนโอกาส',
            title: 'การตรวจสอบสัญญาณอย่างต่อเนื่อง',
            desc: 'OS ติดตามกระดานสนทนา ฟอรัม และระบบนิเวศภายนอกอย่างแข็งขัน เพื่อสกัดปัญหาและระบุโอกาสในการสร้างระบบอัตโนมัติหรือเว็บไซต์ก่อนที่จะมีการแทรกแซงจากมนุษย์',
            stateLabel: 'กำลังสแกนสัญญาณและสกัดช่องว่างของตลาด',
            roles: 'System Engine · LLM Parser',
            outputs: ['สัญญาณผู้ใช้ดิบ', 'ปัญหาที่จัดหมวดหมู่แล้ว']
        },
        intake: {
            stage: 'การรับไอเดีย',
            title: 'การประมวลผลแนวคิดแบบรวมศูนย์',
            desc: 'ไอเดียและสัญญาณดิบจะถูกนำเข้าสู่ส่วนหลักของ Notion ระบบจะจัดประเภทแนวคิด (เช่น เครื่องมือ หรือ เว็บไซต์) และให้คะแนนตามความเป็นไปได้ในเชิงพาณิชย์ผ่านอัลกอริทึม',
            stateLabel: 'กำลังประมวลผลโอกาสใหม่และให้คะแนนความเป็นไปได้',
            roles: 'Dana (System) · Intelligent Routing',
            outputs: ['ตั๋วโอกาสที่จัดอันดับแล้ว', 'การจัดประเภทระบบเบื้องต้น']
        },
        research: {
            stage: 'การวิจัยเชิงลึก',
            title: 'การสังเคราะห์ข้อมูลเชิงลึกอัตโนมัติ',
            desc: 'ตามคะแนนที่ได้รับ ระบบอัจฉริยะแบบหลายโมเดลจะส่งตัวแทนการวิจัยไปรวบรวมบริบทเฉพาะของโดเมน คู่แข่ง และแบบอย่างทางเทคนิค โดยจัดรูปแบบเป็นรายงานการสังเคราะห์',
            stateLabel: 'กำลังวิจัยความเป็นไปได้ของตลาดและจัดทำดัชนีความรู้',
            roles: 'Alex · System Agents',
            outputs: ['รายงานการสังเคราะห์งานวิจัย', 'ดัชนีความรู้เฉพาะทาง']
        },
        evaluate: {
            stage: 'ประตูตัดสินใจ',
            title: 'การตรวจสอบความถูกต้องเชิงพาณิชย์และทางเทคนิค',
            desc: 'จุดตรวจสอบสำคัญที่สถาปัตยกรรมและกลยุทธ์มาบรรจบกัน ทีมงานจะตรวจสอบ ICP ทำแผนที่พึ่งพาระบบ และประเมินข้อจำกัดในการสร้างก่อนที่จะจัดสรรทรัพยากร',
            stateLabel: 'กำลังเข้าสู่ประตูตัดสินใจ — อยู่ระหว่างการทบทวนสถาปัตยกรรม',
            roles: 'Alex · Blake · Chris',
            outputs: ['การตัดสินใจดำเนินการ/ไม่ดำเนินการ', 'ขอบเขตเทคนิคของตัวต้นแบบ', 'เส้นทางผลลัพธ์ที่แนะนำ']
        },
        prototype: {
            stage: 'ตัวต้นแบบพิสูจน์แนวคิด',
            title: 'การสร้างเบื้องต้นและการตรวจสอบ MVP',
            desc: 'โซลูชันจะถูกประกอบเป็นสถานะขั้นต่ำที่ใช้งานได้เพื่อทดสอบกลไกหลัก มีการรันโค้ด เชื่อมต่อ API และสร้างกรอบ UI เพื่อตรวจสอบตรรกะที่วางแผนไว้ในการประเมิน',
            stateLabel: 'การตรวจสอบตัวต้นแบบกำลังทำงานในสภาพแวดล้อมที่แยกออกมา',
            roles: 'Blake · Chris',
            outputs: ['การสร้าง MVP ที่ใช้งานได้', 'พิมพ์เขียวการปฏิบัติงานด้านสถาปัตยกรรม']
        },
        automation: {
            stage: 'การปฏิบัติการระบบอัตโนมัติ',
            title: 'การติดตั้งระบบและการส่งมอบ',
            desc: 'การปรับใช้เครื่องมือภายในสำหรับการดำเนินงานและไปป์ไลน์การประมวลผลพื้นหลัง รวมโค้ดสุดท้าย กำหนดสภาพแวดล้อม และสร้าง SOP การดำเนินงานสำหรับหน่วยความจำระบบ',
            stateLabel: 'กำลังเปิดผลลัพธ์การดำเนินการ: ปรับใช้ระบบอัตโนมัติ',
            roles: 'Chris · Dana',
            outputs: ['ระบบอัตโนมัติในการใช้งานจริง', 'SOP การดำเนินการระบบ']
        },
        website: {
            stage: 'การปฏิบัติการเว็บไซต์',
            title: 'การติดตั้งส่วนหน้า',
            desc: 'การส่งมอบเว็บไซต์ที่เน้น Conversion และแดชบอร์ด UI การปรับใช้โค้ดส่วนหน้า การฉีดข้อมูลวิเคราะห์ และติดตามการส่งมอบในโดเมนจริง',
            stateLabel: 'กำลังเปิดผลลัพธ์การดำเนินการ: ผลักดันการอัปเดตเว็บไซต์',
            roles: 'Chris · Dana',
            outputs: ['เว็บไซต์การตลาดที่ใช้งานจริง', 'สเปคส่งมอบงานลูกค้า']
        },
        hybrid: {
            stage: 'การปฏิบัติการไฮบริด',
            title: 'การส่งมอบแบบเต็มระบบ',
            desc: 'การผสานตรรกะระบบอัตโนมัติส่วนหลังเข้ากับอินเทอร์เฟซส่วนหน้าที่ได้รับการขัดเกลา สถาปัตยกรรม SaaS ที่ซับซ้อนเหล่านี้ต้องการการติดตั้งหลายสภาพแวดล้อมที่มีการประสานงานกัน',
            stateLabel: 'กำลังเปิดผลลัพธ์การดำเนินการ: การซิงโครไนซ์ไฮบริดสแต็ค',
            roles: 'Chris · Dana',
            outputs: ['แอปพลิเคชัน SaaS ที่ขยายขนาดได้', 'คู่มือประกอบ API']
        }
    }
};

// Original Accordion data
const WORKFLOWS_DATA = {
    en: [
        {
            id: 'scan', title: 'Opportunity Scan', icon: Radar, color: '#f59e0b',
            steps: [
                { id: 1, title: 'Scan', desc: 'Monitor Reddit & external platforms.', role: 'System' },
                { id: 2, title: 'Extraction', desc: 'Identify recurring pain points.', role: 'LLM Analysis' },
                { id: 3, title: 'Filtering', desc: 'Discard noise, keep viable solutions.', role: 'System' },
                { id: 4, title: 'Injection', desc: 'Auto-populate Idea Vault for review.', role: 'Dana' }
            ]
        },
        {
            id: 'intake', title: 'Idea Intake', icon: Lightbulb, color: 'var(--accent-base)',
            steps: [
                { id: 1, title: 'Intake', desc: 'Capture raw idea via Notion or Voice.', role: 'Dana / Webhook' },
                { id: 2, title: 'Classification', desc: 'Determine Automation vs Website.', role: 'System' },
                { id: 3, title: 'Quality Scoring', desc: 'Algorithm ranks by viability.', role: 'System' },
                { id: 4, title: 'Review Gate', desc: 'Approve to enter Evaluation phase.', role: 'Alex' }
            ]
        },
        {
            id: 'research', title: 'Research Flow', icon: FileText, color: 'var(--accent-tertiary)',
            steps: [
                { id: 1, title: 'Directive', desc: 'Receive research parameters and target domains.', role: 'Alex' },
                { id: 2, title: 'Data Gathering', desc: 'Scrape, index, and organize raw information.', role: 'System' },
                { id: 3, title: 'Synthesis', desc: 'Extract key insights, patterns, and action items.', role: 'LLM Analysis' },
                { id: 4, title: 'Documentation', desc: 'Format report and log to Knowledge Library.', role: 'Dana' }
            ]
        },
        {
            id: 'evaluate', title: 'Evaluate Flow', icon: CheckCircle2, color: 'var(--accent-secondary)',
            steps: [
                { id: 1, title: 'Strategy', desc: 'Validate ICP, pain points & revenue logic.', role: 'Alex' },
                { id: 2, title: 'Architecture', desc: 'Design system blueprint & scope.', role: 'Blake' },
                { id: 3, title: 'Feasibility', desc: 'Assess technical build constraints.', role: 'Chris' },
                { id: 4, title: 'Record', desc: 'Commit Evaluation spec to Notion database.', role: 'Dana' }
            ]
        },
        {
            id: 'prototype', title: 'Prototype Flow', icon: FlaskConical, color: 'var(--accent-success)',
            steps: [
                { id: 1, title: 'Scoping', desc: 'Define minimal functional requirements.', role: 'Alex' },
                { id: 2, title: 'System Map', desc: 'Draft technical dependency layout.', role: 'Blake' },
                { id: 3, title: 'Build', desc: 'Execute code, set up backend / APIs.', role: 'Chris' },
                { id: 4, title: 'SOP Generation', desc: 'Document build for system memory.', role: 'Dana' }
            ]
        }
    ],
    th: [
        {
            id: 'scan', title: 'สแกนโอกาส', icon: Radar, color: '#f59e0b',
            steps: [
                { id: 1, title: 'สแกน', desc: 'ติดตาม Reddit และแพลตฟอร์มภายนอก', role: 'System' },
                { id: 2, title: 'สกัดข้อมูล', desc: 'ระบุปัญหาที่เกิดขึ้นซ้ำๆ', role: 'LLM Analysis' },
                { id: 3, title: 'กรอง', desc: 'คัดแยกข้อมูลรบกวน เก็บเฉพาะโซลูชันที่เป็นไปได้', role: 'System' },
                { id: 4, title: 'นำเข้า', desc: 'เติมข้อมูลในคลังเก็บไอเดียอัตโนมัติเพื่อตรวจสอบ', role: 'Dana' }
            ]
        },
        {
            id: 'intake', title: 'การรับไอเดีย', icon: Lightbulb, color: 'var(--accent-base)',
            steps: [
                { id: 1, title: 'รับข้อมูล', desc: 'บันทึกข้อมูลไอเดียดิบผ่าน Notion หรือเสียง', role: 'Dana / Webhook' },
                { id: 2, title: 'จัดประเภท', desc: 'กำหนดว่าเป็นระบบอัตโนมัติหรือเว็บไซต์', role: 'System' },
                { id: 3, title: 'ให้คะแนนคุณภาพ', desc: 'อัลกอริทึมจัดอันดับตามความเป็นไปได้', role: 'System' },
                { id: 4, title: 'ประตูทบทวน', desc: 'อนุมัติให้เข้าสู่ขั้นตอนการประเมิน', role: 'Alex' }
            ]
        },
        {
            id: 'research', title: 'ขั้นตอนการวิจัย', icon: FileText, color: 'var(--accent-tertiary)',
            steps: [
                { id: 1, title: 'คำสั่ง', desc: 'รับพารามิเตอร์การวิจัยและเป้าหมายของโดเมน', role: 'Alex' },
                { id: 2, title: 'รวบรวมข้อมูล', desc: 'ดึง จัดทำดัชนี และจัดการข้อมูลดิบ', role: 'System' },
                { id: 3, title: 'สังเคราะห์', desc: 'สกัดข้อมูลเชิงลึก รูปแบบ และรายการดำเนินการ', role: 'LLM Analysis' },
                { id: 4, title: 'จัดทำเอกสาร', desc: 'จัดรูปแบบรายงานและบันทึกลงห้องสมุดความรู้', role: 'Dana' }
            ]
        },
        {
            id: 'evaluate', title: 'ขั้นตอนการประเมิน', icon: CheckCircle2, color: 'var(--accent-secondary)',
            steps: [
                { id: 1, title: 'กลยุทธ์', desc: 'ตรวจสอบความถูกต้องของ ICP ปัญหา & ตรรกะรายได้', role: 'Alex' },
                { id: 2, title: 'สถาปัตยกรรม', desc: 'ออกแบบพิมพ์เขียวระบบ & ขอบเขต', role: 'Blake' },
                { id: 3, title: 'ความเป็นไปได้', desc: 'ประเมินข้อจำกัดการสร้างทางเทคนิค', role: 'Chris' },
                { id: 4, title: 'บันทึก', desc: 'ตกลงบันทึกสเปคประเมินผลลงในฐานข้อมูล Notion', role: 'Dana' }
            ]
        },
        {
            id: 'prototype', title: 'ขั้นตอนการสร้างต้นแบบ', icon: FlaskConical, color: 'var(--accent-success)',
            steps: [
                { id: 1, title: 'กำหนดขอบเขต', desc: 'กำหนดข้อกำหนดการทำงานขั้นต่ำ', role: 'Alex' },
                { id: 2, title: 'แผนที่ระบบ', desc: 'ร่างเลย์เอาต์ระบบการพึ่งพาทางเทคนิค', role: 'Blake' },
                { id: 3, title: 'สร้าง', desc: 'รันโค้ด ตั้งค่าแบ็กเอนด์/API', role: 'Chris' },
                { id: 4, title: 'สร้าง SOP', desc: 'บันทึกการสร้างเป็นเอกสารสำหรับหน่วยความจำระบบ', role: 'Dana' }
            ]
        }
    ]
};

const TRANSLATIONS = {
    en: {
        opsWorkflows: "Operational Workflows",
        opsDesc: "Structured execution paths coordinating how FlowOps transforms signals and ideas into tested systems and deployed solutions.",
        seqText: "Scan → Intake → Research → Evaluate → Prototype → Output Execution",
        corePipeline: "Core System Pipeline",
        gate: "Gate",
        state: "State",
        primaryRoles: "Primary Roles",
        outputs: "Outputs",
        detailedInspection: "Detailed Step Inspection"
    },
    th: {
        opsWorkflows: "เวิร์กโฟลว์ปฏิบัติการ",
        opsDesc: "เส้นทางการดำเนินการที่มีโครงสร้างซึ่งประสานงานวิธีที่ FlowOps เปลี่ยนสัญญาณและไอเดียให้เป็นระบบที่ผ่านการทดสอบและโซลูชันที่พร้อมใช้งาน",
        seqText: "สแกน → รับข้อมูล → วิจัย → ประเมิน → ทดสอบต้นแบบ → ปฏิบัติการผลลัพธ์",
        corePipeline: "ไปป์ไลน์ระบบหลัก",
        gate: "ประตู",
        state: "สถานะ",
        primaryRoles: "บทบาทหลัก",
        outputs: "ผลลัพธ์",
        detailedInspection: "ตรวจสอบขั้นตอนโดยละเอียด"
    }
};

export default function Workflows() {
    const { language } = useLanguage();
    const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS];
    const railNodes = RAIL_NODES_DATA[language as keyof typeof RAIL_NODES_DATA];
    const outputNodes = OUTPUT_NODES_DATA[language as keyof typeof OUTPUT_NODES_DATA];
    const nodeDetails = NODE_DETAILS_DATA[language as keyof typeof NODE_DETAILS_DATA];
    const workflowsData = WORKFLOWS_DATA[language as keyof typeof WORKFLOWS_DATA];

    const [activeNode, setActiveNode] = useState<string>('scan');
    const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
    const [timeSinceInteraction, setTimeSinceInteraction] = useState<number>(0);

    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
    const [activeAccordionStepIndex, setActiveAccordionStepIndex] = useState<number>(0);

    // Idle Demonstration Loop
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setActiveNode((prev) => {
                    const currentIndex = sequence.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % sequence.length;
                    return sequence[nextIndex];
                });
            }, 3500); // changes node every 3.5 seconds
        }

        // Resume auto-play timer
        const interactionTimer = setInterval(() => {
            if (!isAutoPlaying) {
                setTimeSinceInteraction(prev => {
                    if (prev >= 8) {
                        setIsAutoPlaying(true);
                        return 0;
                    }
                    return prev + 1;
                });
            }
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(interactionTimer);
        };
    }, [isAutoPlaying]);

    const handleNodeInteraction = (id: string) => {
        setIsAutoPlaying(false);
        setTimeSinceInteraction(0);
        setActiveNode(id);
    };

    const toggleAccordion = (id: string) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (activeAccordion) {
            setActiveAccordionStepIndex(0);
            interval = setInterval(() => {
                setActiveAccordionStepIndex((prev) => (prev + 1) % 4);
            }, 2500);
        }
        return () => clearInterval(interval);
    }, [activeAccordion]);

    const details = (nodeDetails as Record<string, any>)[activeNode] || (nodeDetails as Record<string, any>)['scan'];
    const activeColor = railNodes.find(n => n.id === activeNode)?.color || outputNodes.find(n => n.id === activeNode)?.color || 'var(--text-primary)';

    return (
        <section id="workflows" className={`section ${styles.workflowsSection}`}>
            <div className="container">
                <div className={`${styles.header} animate-on-scroll`}>
                    <span className={styles.eyebrow}>
                        {language === 'en' ? 'Workflow Engine' : 'กลไกเวิร์กโฟลว์'}
                    </span>
                    <h2>{t.opsWorkflows}</h2>
                    <p className="gradient-text" style={{ fontSize: '1.1rem' }}>
                        {t.opsDesc}
                    </p>
                    <p className={styles.sequenceText}>
                        {t.seqText}
                    </p>
                </div>

                {/* HORIZONTAL WORKFLOW RAIL */}
                <div className={styles.systemMapContainer}>
                    <div className={styles.systemMapHeader}>
                        {t.corePipeline}
                    </div>

                    <div className={styles.railWrapper}>
                        {railNodes.map((node, i) => {
                            const Icon = node.icon;
                            const isActive = activeNode === node.id || sequence.indexOf(activeNode) > sequence.indexOf(node.id);
                            const isTrailActive = sequence.indexOf(activeNode) >= sequence.indexOf(node.id);
                            const isFocus = activeNode === node.id;

                            return (
                                <div
                                    className={`${styles.railNodeGroup} ${isTrailActive ? styles.active : ''} ${node.isGate ? styles.gate : ''}`}
                                    key={node.id}
                                    style={{ '--theme-color': node.color } as React.CSSProperties}
                                >
                                    <div
                                        className={`${styles.railNode} ${isFocus ? styles.active : ''} ${node.isGate ? styles.gate : ''}`}
                                        onMouseEnter={() => handleNodeInteraction(node.id)}
                                        onClick={() => handleNodeInteraction(node.id)}
                                    >
                                        <div className={styles.nodeIcon}>
                                            <Icon size={24} />
                                            {node.isGate && <span className={styles.gateBadge}>{t.gate}</span>}
                                        </div>
                                        <span className={styles.nodeLabel}>{node.label}</span>
                                    </div>

                                    {/* Connector line trailing out except for the very last node */}
                                    {i < railNodes.length - 1 && (
                                        <div className={styles.connector}>
                                            <div className={styles.connectorLine} />
                                            {isFocus && <div className={styles.connectorPulse} />}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* BRANCHING OUTPUT PATHS */}
                    <div className={styles.outputsBranching}>
                        <div className={styles.branchLines}>
                            <div className={styles.branchLinesGrid}>
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                        <div className={styles.outputNodes}>
                            {outputNodes.map(node => (
                                <div
                                    key={node.id}
                                    className={`${styles.outputCard} ${activeNode === node.id ? styles.active : ''}`}
                                    onClick={() => handleNodeInteraction(node.id)}
                                    onMouseEnter={() => handleNodeInteraction(node.id)}
                                >
                                    {node.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DYNAMIC DETAIL PANEL */}
                    <div className={styles.systemState} style={{ '--theme-color': activeColor } as React.CSSProperties}>
                        <div className={styles.stateDot} />
                        <span>{t.state}: {details.stateLabel}</span>
                    </div>

                    <div className={styles.detailPanel} style={{ '--theme-color': activeColor } as React.CSSProperties}>
                        <div className={styles.detailStage}>{details.stage}</div>
                        <h3>{details.title}</h3>
                        <p className={styles.detailDesc}>{details.desc}</p>

                        <div className={styles.detailMeta}>
                            <div className={styles.metaBlock}>
                                <h4>{t.primaryRoles}</h4>
                                <p>{details.roles}</p>
                            </div>
                            <div className={styles.metaBlock}>
                                <h4>{t.outputs}</h4>
                                <ul>
                                    {details.outputs.map((out: string, idx: number) => (
                                        <li key={idx}>{out}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div> {/* END SYSTEM MAP */}

                {/* SECONDARY LAYER: Accordion for granular steps */}
                <div className={styles.accordionHeader}>{t.detailedInspection}</div>
                <div className={styles.accordion}>
                    {workflowsData.map((workflow) => {
                        const isActive = activeAccordion === workflow.id;
                        const Icon = workflow.icon;

                        return (
                            <div
                                key={workflow.id}
                                className={`${styles.workflowItem} ${isActive ? styles.active : ''}`}
                                style={{ '--theme-color': workflow.color } as React.CSSProperties}
                            >
                                <button
                                    className={styles.trigger}
                                    onClick={() => toggleAccordion(workflow.id)}
                                    aria-expanded={isActive}
                                >
                                    <div className={styles.triggerLeft}>
                                        <div className={styles.iconWrapper}>
                                            <Icon size={24} />
                                        </div>
                                        <h3>{workflow.title}</h3>
                                    </div>
                                    <ChevronDown
                                        size={24}
                                        className={`${styles.chevron} ${isActive ? styles.chevronOpen : ''}`}
                                    />
                                </button>

                                {isActive && (
                                    <div className={styles.pipelineContainer}>
                                        <div className={styles.pipeline}>
                                            {workflow.steps.map((step, index) => {
                                                const isStepActive = activeAccordionStepIndex === index;
                                                return (
                                                    <div
                                                        key={step.id}
                                                        className={`${styles.stepNode} ${isStepActive ? styles.activeStepNode : ''}`}
                                                        style={{ animationDelay: `${index * 0.15}s` }}
                                                    >
                                                        <div className={styles.stepIndicator}>
                                                            <span className={styles.stepNumber}>{step.id}</span>
                                                        </div>
                                                        <div className={styles.stepCard}>
                                                            <div className={styles.stepHeader}>
                                                                <h4>{step.title}</h4>
                                                                <span className={styles.roleBadge}>{step.role}</span>
                                                            </div>
                                                            <p className={styles.stepDesc}>{step.desc}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
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
