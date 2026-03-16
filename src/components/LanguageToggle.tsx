"use client";

import { useLanguage } from "./LanguageContext";
import styles from "./LanguageToggle.module.css";

const FLAGS = {
  en: "\uD83C\uDDEC\uD83C\uDDE7",
  th: "\uD83C\uDDF9\uD83C\uDDED",
};

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.toggle} role="group" aria-label="Language switch">
      <button
        type="button"
        className={`${styles.option} ${language === "en" ? styles.active : ""}`}
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
      >
        <span className={styles.flag} aria-hidden="true">
          {FLAGS.en}
        </span>
        <span>ENG</span>
      </button>
      <div className={styles.divider} />
      <button
        type="button"
        className={`${styles.option} ${language === "th" ? styles.active : ""}`}
        onClick={() => setLanguage("th")}
        aria-pressed={language === "th"}
      >
        <span className={styles.flag} aria-hidden="true">
          {FLAGS.th}
        </span>
        <span>TH</span>
      </button>
    </div>
  );
}
