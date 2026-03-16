"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    toggleLanguage: () => { },
    setLanguage: () => { },
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const saved = window.localStorage.getItem("flowops-language");
        if (saved === "en" || saved === "th") {
            setLanguage(saved);
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = language === "th" ? "th" : "en";
        window.localStorage.setItem("flowops-language", language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'th' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
