"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import RevealSection from "@/components/RevealSection";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import styles from "./KnowledgeVaultSection.module.css";

const SPLINE_URL = "https://my.spline.design/aibrain-6QvuFi2CYYEhCa4UJ3WXbwMm/";

const CONTENT = {
  en: {
    eyebrow: "KNOWLEDGE VAULT",
    title: "Knowledge Vault",
    description: "Execution outcomes, decisions, and validated insights are written into system memory to improve future workflows.",
    coreStatus: "Memory Core Active",
    caption: "Experience enters, memory processes, better systems emerge.",
    pairs: [
      {
        incoming: {
          label: "PROJECT OUTCOME ->",
          mobileLabel: "PROJECT OUTCOME",
          title: "Northshore Lead Recovery",
          detail: "Conversion rate improved 32%",
        },
        outgoing: {
          label: "-> VALIDATED SKILL",
          mobileLabel: "VALIDATED SKILL",
          title: "Lead Recovery Workflow",
          detail: "Added to Skill Library",
        },
      },
      {
        incoming: {
          label: "WORKFLOW RESULT ->",
          mobileLabel: "WORKFLOW RESULT",
          title: "Booking Reminder System",
          detail: "No-show rate reduced",
        },
        outgoing: {
          label: "-> WORKFLOW UPDATE",
          mobileLabel: "WORKFLOW UPDATE",
          title: "Booking Reminder Logic",
          detail: "Timing Optimization Applied",
        },
      },
      {
        incoming: {
          label: "OPERATIONAL INSIGHT ->",
          mobileLabel: "OPERATIONAL INSIGHT",
          title: "Pricing Enquiry Drop-off",
          detail: "Pattern detected",
        },
        outgoing: {
          label: "-> DETECTION PATTERN",
          mobileLabel: "DETECTION PATTERN",
          title: "High-Intent Pricing Signals",
          detail: "Added to Signal Library",
        },
      },
      {
        incoming: {
          label: "EXECUTION SIGNAL ->",
          mobileLabel: "EXECUTION SIGNAL",
          title: "Follow-up Timing Delay",
          detail: "Response gap identified",
        },
        outgoing: {
          label: "-> SYSTEM RULE UPDATE",
          mobileLabel: "SYSTEM RULE UPDATE",
          title: "Follow-up Timing Logic",
          detail: "Execution Rule Updated",
        },
      },
    ],
    supportCards: [
      { title: "Project Memory", detail: "Preserves current project context and execution continuity" },
      { title: "Operational Memory", detail: "Tracks active workflows, tasks, approvals, and state" },
      { title: "System Learning", detail: "Captures validated lessons from execution outcomes" },
      { title: "Behavioral Memory", detail: "Stores stable rules, constraints, and operating logic" },
    ],
    iframeTitle: "Knowledge Vault memory core",
  },
  th: {
    eyebrow: "KNOWLEDGE VAULT",
    title: "คลังความรู้",
    description: "ผลลัพธ์จากการดำเนินงาน การตัดสินใจ และอินไซต์ที่ผ่านการยืนยันจะถูกบันทึกเข้าสู่ความทรงจำของระบบเพื่อพัฒนาเวิร์กโฟลว์ในอนาคต",
    coreStatus: "แกนความจำกำลังทำงาน",
    caption: "ประสบการณ์ไหลเข้า ความทรงจำประมวลผล และระบบที่ดีขึ้นก็เกิดขึ้น",
    pairs: [
      {
        incoming: {
          label: "ผลลัพธ์โปรเจกต์ ->",
          mobileLabel: "ผลลัพธ์โปรเจกต์",
          title: "Northshore Lead Recovery",
          detail: "อัตราคอนเวอร์ชันดีขึ้น 32%",
        },
        outgoing: {
          label: "-> ทักษะที่ยืนยันแล้ว",
          mobileLabel: "ทักษะที่ยืนยันแล้ว",
          title: "Lead Recovery Workflow",
          detail: "เพิ่มเข้าสู่คลังทักษะแล้ว",
        },
      },
      {
        incoming: {
          label: "ผลลัพธ์เวิร์กโฟลว์ ->",
          mobileLabel: "ผลลัพธ์เวิร์กโฟลว์",
          title: "Booking Reminder System",
          detail: "ลดอัตราการไม่มาใช้บริการ",
        },
        outgoing: {
          label: "-> อัปเดตเวิร์กโฟลว์",
          mobileLabel: "อัปเดตเวิร์กโฟลว์",
          title: "Booking Reminder Logic",
          detail: "ปรับเวลาการทำงานให้เหมาะสมแล้ว",
        },
      },
      {
        incoming: {
          label: "อินไซต์การปฏิบัติการ ->",
          mobileLabel: "อินไซต์การปฏิบัติการ",
          title: "Pricing Enquiry Drop-off",
          detail: "ตรวจพบรูปแบบแล้ว",
        },
        outgoing: {
          label: "-> รูปแบบการตรวจจับ",
          mobileLabel: "รูปแบบการตรวจจับ",
          title: "High-Intent Pricing Signals",
          detail: "เพิ่มเข้าสู่คลังสัญญาณแล้ว",
        },
      },
      {
        incoming: {
          label: "สัญญาณการดำเนินงาน ->",
          mobileLabel: "สัญญาณการดำเนินงาน",
          title: "Follow-up Timing Delay",
          detail: "ระบุช่องว่างการตอบกลับแล้ว",
        },
        outgoing: {
          label: "-> อัปเดตกฎระบบ",
          mobileLabel: "อัปเดตกฎระบบ",
          title: "Follow-up Timing Logic",
          detail: "อัปเดตกฎการดำเนินงานแล้ว",
        },
      },
    ],
    supportCards: [
      { title: "ความจำของโปรเจกต์", detail: "เก็บบริบทของโปรเจกต์ปัจจุบันและความต่อเนื่องของการดำเนินงาน" },
      { title: "ความจำเชิงปฏิบัติการ", detail: "ติดตามเวิร์กโฟลว์ งาน การอนุมัติ และสถานะที่กำลังทำงาน" },
      { title: "การเรียนรู้ของระบบ", detail: "บันทึกบทเรียนที่ผ่านการยืนยันจากผลลัพธ์การดำเนินงาน" },
      { title: "ความจำเชิงพฤติกรรม", detail: "เก็บกฎ ข้อจำกัด และตรรกะการทำงานที่คงที่" },
    ],
    iframeTitle: "แกนความจำของคลังความรู้",
  },
};

const MOBILE_ROTATE_MS = 6200;
const MOBILE_OUTGOING_DELAY_MS = 3950;
const DESKTOP_STREAM_LOOP_MS = 16;

function StreamCard({ item, direction, pairIndex, pairCount }) {
  const incoming = direction === "incoming";
  const slot = 1 / pairCount;
  const slotStart = pairIndex * slot;
  const slotMid = Math.min(slotStart + slot * 0.34, 0.96);
  const slotSettle = Math.min(slotStart + slot * 0.56, 0.975);
  const outgoingStart = Math.min(slotStart + slot * 0.12, 0.96);
  const outgoingMid = Math.min(slotStart + slot * 0.44, 0.975);
  const outgoingSettle = Math.min(slotStart + slot * 0.64, 0.985);
  const finalHold = 0.985;

  const animate = incoming
    ? {
        opacity: [1, 1, 0.7, 0, 0],
        x: [0, 0, 28, 96, 96],
        y: [0, 0, -4, -10, -10],
        scale: [1, 1, 0.96, 0.8, 0.8],
      }
    : {
        opacity: [0, 0, 1, 1, 1, 0],
        x: [-42, -42, 0, 18, 18, 18],
        y: [8, 8, 0, -2, -2, -2],
        scale: [0.9, 0.9, 1, 1, 1, 1],
      };

  const transition = incoming
    ? {
        duration: DESKTOP_STREAM_LOOP_MS,
        repeat: Infinity,
        ease: "linear",
        times: [0, slotStart, slotMid, slotSettle, 1],
      }
    : {
        duration: DESKTOP_STREAM_LOOP_MS,
        repeat: Infinity,
        ease: "linear",
        times: [0, outgoingStart, outgoingMid, outgoingSettle, finalHold, 1],
      };

  return (
    <motion.article
      className={`${styles.streamCard} ${incoming ? styles.incomingCard : styles.outgoingCard}`.trim()}
      initial={incoming ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: -42, y: 8, scale: 0.9 }}
      animate={animate}
      transition={transition}
    >
      <span className={styles.streamLabel}>{item.label}</span>
      <h3 className={styles.streamTitle}>{item.title}</h3>
      <p className={styles.streamDetail}>{item.detail}</p>
    </motion.article>
  );
}

export default function KnowledgeVaultSection() {
  const { language } = useLanguage();
  const copy = CONTENT[language];
  const pairs = copy.pairs;
  const [mobilePairIndex, setMobilePairIndex] = useState(0);
  const [mobilePhase, setMobilePhase] = useState("incoming");

  useEffect(() => {
    const pairTimer = window.setInterval(() => {
      setMobilePairIndex((prev) => (prev + 1) % pairs.length);
    }, MOBILE_ROTATE_MS);

    return () => {
      window.clearInterval(pairTimer);
    };
  }, [pairs.length]);

  useEffect(() => {
    setMobilePhase("incoming");

    const phaseTimer = window.setTimeout(() => {
      setMobilePhase("outgoing");
    }, MOBILE_OUTGOING_DELAY_MS);

    return () => {
      window.clearTimeout(phaseTimer);
    };
  }, [mobilePairIndex]);

  const activePair = pairs[mobilePairIndex];

  return (
    <RevealSection>
      <section id="knowledge-vault" className={styles.section}>
        <SectionAtmosphere className={styles.atmosphere} />
        <div className={styles.container}>
          <div className={styles.copyBlock}>
            <div className={styles.iconWrap}>
              <BrainCircuit size={30} />
            </div>
            <div className={styles.eyebrow}>{copy.eyebrow}</div>
            <h2 className={styles.title}>{copy.title}</h2>
            <p className={styles.description}>{copy.description}</p>
          </div>

          <div className={styles.mobileIncomingWrap}>
            <div className={styles.mobileCardStage}>
              <motion.article
                key={`incoming-mobile-${mobilePairIndex}`}
                className={`${styles.streamCard} ${styles.mobileStaticCard} ${styles.mobileIncomingCard}`.trim()}
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={mobilePhase === "incoming" ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22, scale: 0.9 }}
                transition={{
                  duration: mobilePhase === "incoming" ? 0.7 : 1.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className={styles.streamLabel}>{activePair.incoming.mobileLabel}</span>
                <h3 className={styles.streamTitle}>{activePair.incoming.title}</h3>
                <p className={styles.streamDetail}>{activePair.incoming.detail}</p>
              </motion.article>
            </div>
          </div>

          <div className={styles.visualShell}>
            <div className={`${styles.streamColumn} ${styles.incomingColumn}`} aria-hidden="true">
              {pairs.map((pair, index) => (
                <StreamCard key={pair.incoming.title} item={pair.incoming} direction="incoming" pairIndex={index} pairCount={pairs.length} />
              ))}
            </div>

            <div className={styles.coreColumn}>
              <div className={styles.coreHalo} />
              <div className={styles.coreStatus}>{copy.coreStatus}</div>
              <div className={styles.coreShell}>
                <div className={styles.coreViewport}>
                  <div className={styles.coreSplineCrop}>
                    <div className={styles.coreSplineScale}>
                      <iframe
                        src={SPLINE_URL}
                        title={copy.iframeTitle}
                        className={styles.coreIframe}
                        loading="lazy"
                        tabIndex={-1}
                      />
                    </div>
                  </div>
                  <div className={styles.coreFrameGlow} />
                </div>
                <div className={styles.coreCaption}>{copy.caption}</div>
              </div>
            </div>

            <div className={`${styles.streamColumn} ${styles.outgoingColumn}`} aria-hidden="true">
              {pairs.map((pair, index) => (
                <StreamCard key={pair.outgoing.title} item={pair.outgoing} direction="outgoing" pairIndex={index} pairCount={pairs.length} />
              ))}
            </div>
          </div>

          <div className={styles.mobileOutgoingWrap}>
            <div className={styles.mobileCardStage}>
              <motion.article
                key={`outgoing-mobile-${mobilePairIndex}`}
                className={`${styles.streamCard} ${styles.mobileStaticCard} ${styles.mobileOutgoingCard}`.trim()}
                initial={{ opacity: 0, y: -14, scale: 0.94 }}
                animate={mobilePhase === "outgoing" ? { opacity: 1, y: 6, scale: 1 } : { opacity: 0, y: -14, scale: 0.94 }}
                transition={{
                  duration: mobilePhase === "outgoing" ? 1.15 : 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className={styles.streamLabel}>{activePair.outgoing.mobileLabel}</span>
                <h3 className={styles.streamTitle}>{activePair.outgoing.title}</h3>
                <p className={styles.streamDetail}>{activePair.outgoing.detail}</p>
              </motion.article>
            </div>
          </div>

          <div className={styles.supportGrid}>
            {copy.supportCards.map((card) => (
              <article key={card.title} className={styles.supportCard}>
                <h3 className={styles.supportTitle}>{card.title}</h3>
                <p className={styles.supportDetail}>{card.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </RevealSection>
  );
}
