"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, LayoutDashboard, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import RevealSection from "@/components/RevealSection";
import SectionAtmosphere from "@/components/SectionAtmosphere";
import styles from "./MissionControlSection.module.css";

const AUTO_ROTATE_MS = 5200;
const RESUME_ROTATE_MS = 11000;

const CONTENT = {
  en: {
    eyebrow: "MISSION CONTROL",
    title: "Mission Control",
    description: "A unified operational dashboard for tracking projects, workflows, approvals, and system activity.",
    features: [
      { title: "Action Queue", text: "Unified tracking for manual and system-generated work." },
      { title: "Workflow State", text: "Visibility into active, queued, blocked, and completed execution." },
      { title: "Opportunity Pipeline", text: "Track signals, validated opportunities, and active solution paths." },
      { title: "Operational Visibility", text: "Monitor tasks, approvals, reviews, and delivery progress." },
    ],
    slides: [
      { id: "overview", label: "Dashboard Overview", image: "/assets/prototype-output/mission-control_variant-c_overview.png" },
      { id: "tasks", label: "Action Queue", image: "/assets/prototype-output/mission-control_variant-c_tasks.png" },
      { id: "projects", label: "Project State", image: "/assets/prototype-output/mission-control_variant-c_projects.png" },
      { id: "pipeline", label: "Opportunity Pipeline", image: "/assets/prototype-output/mission-control_variant-c_pipeline.png" },
      { id: "workflows", label: "Workflow State", image: "/assets/prototype-output/mission-control_variant-c_workflows.png" },
    ],
    liveModule: "Live module showcase",
    currentView: "Current View",
    fullscreenLabel: "Fullscreen dashboard view",
    openFullscreen: "Open Mission Control fullscreen viewer",
    closeFullscreen: "Close fullscreen Mission Control viewer",
    prevView: "Previous Mission Control view",
    nextView: "Next Mission Control view",
    expandScreenshot: (label) => `Expand ${label} screenshot`,
  },
  th: {
    eyebrow: "MISSION CONTROL",
    title: "ศูนย์ควบคุม",
    description: "แดชบอร์ดปฏิบัติการแบบรวมศูนย์สำหรับติดตามโปรเจกต์ เวิร์กโฟลว์ การอนุมัติ และกิจกรรมของระบบ",
    features: [
      { title: "คิวงาน", text: "ติดตามงานจากคนและจากระบบอัตโนมัติได้ในที่เดียว" },
      { title: "สถานะเวิร์กโฟลว์", text: "มองเห็นการดำเนินงานที่กำลังทำ รอคิว ติดขัด และเสร็จสมบูรณ์" },
      { title: "ไปป์ไลน์โอกาส", text: "ติดตามสัญญาณ โอกาสที่ผ่านการยืนยัน และเส้นทางโซลูชันที่กำลังทำงาน" },
      { title: "ภาพรวมการปฏิบัติการ", text: "ตรวจสอบงาน การอนุมัติ การรีวิว และความคืบหน้าการส่งมอบ" },
    ],
    slides: [
      { id: "overview", label: "ภาพรวมแดชบอร์ด", image: "/assets/prototype-output/mission-control_variant-c_overview.png" },
      { id: "tasks", label: "คิวงาน", image: "/assets/prototype-output/mission-control_variant-c_tasks.png" },
      { id: "projects", label: "สถานะโปรเจกต์", image: "/assets/prototype-output/mission-control_variant-c_projects.png" },
      { id: "pipeline", label: "ไปป์ไลน์โอกาส", image: "/assets/prototype-output/mission-control_variant-c_pipeline.png" },
      { id: "workflows", label: "สถานะเวิร์กโฟลว์", image: "/assets/prototype-output/mission-control_variant-c_workflows.png" },
    ],
    liveModule: "โมดูลแสดงผลแบบสด",
    currentView: "มุมมองปัจจุบัน",
    fullscreenLabel: "มุมมองแดชบอร์ดแบบเต็มจอ",
    openFullscreen: "เปิดมุมมอง Mission Control แบบเต็มจอ",
    closeFullscreen: "ปิดมุมมอง Mission Control แบบเต็มจอ",
    prevView: "มุมมองก่อนหน้า",
    nextView: "มุมมองถัดไป",
    expandScreenshot: (label) => `ขยายภาพหน้าจอ ${label}`,
  },
};

export default function MissionControlSection() {
  const { language } = useLanguage();
  const copy = CONTENT[language];
  const slides = copy.slides;
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const resumeTimerRef = useRef(null);

  useEffect(() => {
    if (rotationPaused) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_ROTATE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, rotationPaused, slides.length]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const activateSlide = (index) => {
    setActiveIndex(index);
    setRotationPaused(true);

    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      setRotationPaused(false);
      resumeTimerRef.current = null;
    }, RESUME_ROTATE_MS);
  };

  const handleStep = (direction) => {
    const nextIndex = (activeIndex + direction + slides.length) % slides.length;
    activateSlide(nextIndex);
  };

  const openExpanded = () => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches) {
      setActiveIndex(0);
    }

    setIsExpanded(true);
    setRotationPaused(true);
  };

  const closeExpanded = () => {
    setIsExpanded(false);

    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      setRotationPaused(false);
      resumeTimerRef.current = null;
    }, RESUME_ROTATE_MS);
  };

  const activeSlide = slides[activeIndex];

  return (
    <RevealSection>
      <section id="mission-control" className={styles.section}>
        <SectionAtmosphere />
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.copyColumn}>
              <div className={styles.iconWrap}>
                <LayoutDashboard size={30} />
              </div>
              <div className={styles.eyebrow}>{copy.eyebrow}</div>
              <h2 className={styles.title}>{copy.title}</h2>
              <p className={styles.description}>{copy.description}</p>

              <div className={styles.featureGrid}>
                {copy.features.map((feature) => (
                  <article key={feature.title} className={styles.featureCard}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureText}>{feature.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.viewerColumn}>
              <div className={styles.viewerShell}>
                <div className={styles.viewerTopbar}>
                  <button
                    type="button"
                    className={styles.viewerStatus}
                    onClick={openExpanded}
                    aria-label={copy.openFullscreen}
                  >
                    <span className={styles.viewerStatusDot} />
                    {copy.liveModule}
                    <Expand size={14} className={styles.viewerStatusIcon} />
                  </button>
                  <div className={styles.viewerControls}>
                    <button type="button" className={styles.viewerControl} onClick={() => handleStep(-1)} aria-label={copy.prevView}>
                      <ArrowLeft size={16} />
                    </button>
                    <button type="button" className={styles.viewerControl} onClick={() => handleStep(1)} aria-label={copy.nextView}>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                <div className={styles.viewerStage}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide.id}
                      className={styles.viewerSlide}
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.015 }}
                      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        type="button"
                        className={styles.viewerImageButton}
                        onClick={openExpanded}
                        aria-label={copy.expandScreenshot(activeSlide.label)}
                      >
                        <img src={activeSlide.image} alt={activeSlide.label} className={styles.viewerImage} />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className={styles.viewerFooter}>
                  <div className={styles.activeLabelBlock}>
                    <span className={styles.activeLabelEyebrow}>{copy.currentView}</span>
                    <span className={styles.activeLabel}>{activeSlide.label}</span>
                  </div>

                  <div className={styles.navStrip}>
                    {slides.map((slide, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                          onClick={() => activateSlide(index)}
                          aria-pressed={isActive}
                        >
                          <span className={styles.navIndex}>{String(index + 1).padStart(2, "0")}</span>
                          <span className={styles.navLabel}>{slide.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded ? (
            <motion.div
              className={styles.fullscreenOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <button type="button" className={styles.fullscreenBackdrop} onClick={closeExpanded} aria-label={copy.closeFullscreen} />
              <motion.div
                className={styles.fullscreenDialog}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.99 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.fullscreenTopbar}>
                  <div className={styles.viewerStatus}>
                    <span className={styles.viewerStatusDot} />
                    {copy.fullscreenLabel}
                  </div>
                  <div className={styles.fullscreenMobileCurrent}>
                    <span className={styles.fullscreenMobileCurrentEyebrow}>{copy.currentView}</span>
                    <span className={styles.fullscreenMobileCurrentLabel}>{activeSlide.label}</span>
                  </div>
                  <div className={styles.fullscreenControls}>
                    <button type="button" className={styles.viewerControl} onClick={() => handleStep(-1)} aria-label={copy.prevView}>
                      <ArrowLeft size={16} />
                    </button>
                    <button type="button" className={styles.viewerControl} onClick={() => handleStep(1)} aria-label={copy.nextView}>
                      <ArrowRight size={16} />
                    </button>
                    <button type="button" className={styles.viewerControl} onClick={closeExpanded} aria-label={copy.closeFullscreen}>
                      <X size={16} />
                    </button>
                  </div>
                </div>

                <div className={styles.fullscreenStage}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`expanded-${activeSlide.id}`}
                      className={styles.viewerSlide}
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.015 }}
                      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <img src={activeSlide.image} alt={activeSlide.label} className={styles.viewerImage} />
                    </motion.div>
                  </AnimatePresence>

                  <div className={styles.fullscreenMeta}>
                    <div className={styles.activeLabelBlock}>
                      <span className={styles.activeLabelEyebrow}>{copy.currentView}</span>
                      <span className={styles.activeLabel}>{activeSlide.label}</span>
                    </div>
                    <div className={styles.navStripExpanded}>
                      {slides.map((slide, index) => {
                        const isActive = index === activeIndex;
                        return (
                          <button
                            key={`expanded-${slide.id}`}
                            type="button"
                            className={`${styles.navItem} ${styles.navItemCompact} ${isActive ? styles.navItemActive : ""}`}
                            onClick={() => activateSlide(index)}
                            aria-pressed={isActive}
                          >
                            <span className={styles.navIndex}>{String(index + 1).padStart(2, "0")}</span>
                            <span className={styles.navLabel}>{slide.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    </RevealSection>
  );
}
