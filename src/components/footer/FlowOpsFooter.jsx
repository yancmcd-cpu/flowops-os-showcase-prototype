"use client";

import { useLanguage } from "@/components/LanguageContext";
import styles from "./FlowOpsFooter.module.css";

const COPY = {
  en: {
    tagline: "AI-powered agency operating system",
    copyright: "© 2026 FlowOps Studio",
    credit: "Designed and built by Yan McDermott",
  },
  th: {
    tagline: "ระบบปฏิบัติการเอเจนซีที่ขับเคลื่อนด้วย AI",
    copyright: "© 2026 FlowOps Studio",
    credit: "ออกแบบและสร้างโดย Yan McDermott",
  },
};

export default function FlowOpsFooter() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <footer className={styles.footer}>
      <div className={styles.fade} aria-hidden="true" />
      <div className={styles.inner}>
        <p className={styles.brand}>
          FlowOps <span className={styles.dot} aria-hidden="true" />
        </p>
        <p className={styles.tagline}>{copy.tagline}</p>
        <p className={styles.copyright}>{copy.copyright}</p>
        <p className={styles.credit}>{copy.credit}</p>
      </div>
    </footer>
  );
}
