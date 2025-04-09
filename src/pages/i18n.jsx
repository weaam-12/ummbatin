import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation JSON files
import translationHE from "./locals/he/translation.json";
import translationAR from "./locals/ar/translation.json";

const resources = {
    he: { translation: translationHE },
    ar: { translation: translationAR },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "he", // Default language
    fallbackLng: "he",
    interpolation: { escapeValue: false }, // React already escapes text
});

export default i18n;
