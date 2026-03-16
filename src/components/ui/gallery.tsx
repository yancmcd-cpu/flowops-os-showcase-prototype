"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layers3 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import styles from "./gallery.module.css";

type GalleryItem = {
  title: string;
  category: string;
  image: string;
  accent: string;
  description: string;
};

const ROTATE_MS = 4200;

const GALLERY_ITEMS: Record<"en" | "th", GalleryItem[]> = {
  en: [
    {
      title: "Website Prototype",
      category: "Prototype Surface",
      image: "/assets/prototype-output/Forma-bootstrap-website-template-md.webp",
      accent: "#60A5FA",
      description: "Responsive website system translated from opportunity validation into a launch-ready prototype.",
    },
    {
      title: "Automation System",
      category: "Execution Layer",
      image: "/assets/prototype-output/automation.jpg",
      accent: "#8B5CF6",
      description: "Operational automation surface showing connected workflows, triggers, and execution pathways.",
    },
    {
      title: "Marketing Funnel",
      category: "Growth Engine",
      image: "/assets/prototype-output/marketing%20funnel.png",
      accent: "#F97316",
      description: "Conversion-focused funnel output designed to structure attention, nurture, and movement through the system.",
    },
    {
      title: "AI Agent Interface",
      category: "Agent Surface",
      image: "/assets/prototype-output/chatbot.png",
      accent: "#22D3EE",
      description: "Agent interface prototype showing how specialist intelligence is surfaced into delivery-ready interaction flows.",
    },
  ],
  th: [
    {
      title: "ต้นแบบเว็บไซต์",
      category: "พื้นผิวต้นแบบ",
      image: "/assets/prototype-output/Forma-bootstrap-website-template-md.webp",
      accent: "#60A5FA",
      description: "ระบบเว็บไซต์แบบตอบสนองที่แปลงจากโอกาสที่ผ่านการยืนยันให้กลายเป็นต้นแบบพร้อมเปิดใช้งาน",
    },
    {
      title: "ระบบอัตโนมัติ",
      category: "ชั้นการดำเนินงาน",
      image: "/assets/prototype-output/automation.jpg",
      accent: "#8B5CF6",
      description: "พื้นผิวการทำงานอัตโนมัติที่แสดงเวิร์กโฟลว์ ทริกเกอร์ และเส้นทางการดำเนินงานที่เชื่อมต่อกัน",
    },
    {
      title: "ฟันเนลการตลาด",
      category: "เอนจินการเติบโต",
      image: "/assets/prototype-output/marketing%20funnel.png",
      accent: "#F97316",
      description: "ผลลัพธ์ฟันเนลที่ออกแบบเพื่อดึงความสนใจ บ่มเพาะ และขับเคลื่อนผู้ใช้ผ่านระบบจนเกิดคอนเวอร์ชัน",
    },
    {
      title: "อินเทอร์เฟซเอเจนต์ AI",
      category: "พื้นผิวเอเจนต์",
      image: "/assets/prototype-output/chatbot.png",
      accent: "#22D3EE",
      description: "ต้นแบบอินเทอร์เฟซเอเจนต์ที่แสดงให้เห็นว่าความฉลาดเฉพาะทางถูกนำเสนอเป็นโฟลว์การใช้งานพร้อมส่งมอบได้อย่างไร",
    },
  ],
};

const COPY = {
  en: {
    title: "Prototype Output",
    description: "Validated opportunities are translated into working prototypes, automation systems, and delivery-ready execution assets.",
  },
  th: {
    title: "ผลลัพธ์ต้นแบบ",
    description: "โอกาสที่ผ่านการยืนยันจะถูกแปลงเป็นต้นแบบที่ใช้งานได้จริง ระบบอัตโนมัติ และสินทรัพย์สำหรับการส่งมอบที่พร้อมดำเนินงาน",
  },
};

const desktopSlots = [
  { className: styles.slotFront, rotate: -2, scale: 1, zIndex: 4 },
  { className: styles.slotUpperLeft, rotate: -10, scale: 0.84, zIndex: 2 },
  { className: styles.slotUpperRight, rotate: 8, scale: 0.82, zIndex: 1 },
  { className: styles.slotLowerRight, rotate: 5, scale: 0.8, zIndex: 3 },
];

function getSlotIndex(itemIndex: number, activeIndex: number, length: number) {
  return (itemIndex - activeIndex + length) % length;
}

export default function Gallery() {
  const { language } = useLanguage();
  const copy = COPY[language];
  const galleryItems = GALLERY_ITEMS[language];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryItems.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [galleryItems.length]);

  return (
    <section className={styles.section}>
      <SectionAtmosphere />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <Layers3 size={30} />
          </div>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.description}>{copy.description}</p>
        </div>

        <div className={styles.desktopGallery} aria-hidden="true">
          <div className={styles.galleryAura} />
          {galleryItems.map((item, index) => {
            const slot = desktopSlots[getSlotIndex(index, activeIndex, galleryItems.length)];
            const isFront = getSlotIndex(index, activeIndex, galleryItems.length) === 0;

            return (
              <motion.article
                key={item.title}
                className={`${styles.outputCard} ${slot.className} ${isFront ? styles.outputCardFront : styles.outputCardBack}`}
                style={{ "--card-accent": item.accent, zIndex: slot.zIndex } as CSSProperties}
                animate={{
                  rotate: slot.rotate,
                  scale: slot.scale,
                  opacity: isFront ? 1 : 0.84,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: isFront ? -10 : -6,
                  rotate: slot.rotate * 0.7,
                  scale: isFront ? 1.02 : slot.scale + 0.02,
                }}
              >
                <div className={styles.cardMediaWrap}>
                  <img src={item.image} alt={item.title} className={styles.cardImage} />
                  <div className={styles.cardMediaGlow} />
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.cardCategory}>{item.category}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className={styles.mobileGallery}>
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.title}
              className={styles.mobileCard}
              style={{ "--card-accent": item.accent } as CSSProperties}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.mobileImageWrap}>
                <img src={item.image} alt={item.title} className={styles.mobileImage} />
              </div>
              <div className={styles.mobileMeta}>
                <span className={styles.cardCategory}>{item.category}</span>
                <h3 className={styles.mobileTitle}>{item.title}</h3>
                <p className={styles.mobileText}>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
