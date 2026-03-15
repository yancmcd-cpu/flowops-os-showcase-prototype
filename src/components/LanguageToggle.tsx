"use client";
import { useLanguage } from './LanguageContext';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            className={styles.toggle}
            onClick={toggleLanguage}
            aria-label="Toggle Language"
        >
            <span className={`${styles.option} ${language === 'en' ? styles.active : ''}`}>
                🇬🇧 EN
            </span>
            <div className={styles.divider} />
            <span className={`${styles.option} ${language === 'th' ? styles.active : ''}`}>
                🇹🇭 TH
            </span>
        </button>
    );
}
