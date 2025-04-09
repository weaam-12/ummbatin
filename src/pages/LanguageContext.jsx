import React, { createContext, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import translationHE from "./locals/he/translation.json";
import translationAR from "./locals/ar/translation.json";

// Translations object
const translations = {
    he: translationHE,
    ar: translationAR,
};

// Create Language Context
const LanguageContext = createContext();

// Provider Component
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("he"); // Default: Hebrew
    const { i18n } = useTranslation();

    const switchLanguage = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom Hook to use the language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
