"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    toggleLanguage: () => { },
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    // Prevent hydration mismatch by setting language logic in effect if needed, but defaults to 'en'

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'th' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
