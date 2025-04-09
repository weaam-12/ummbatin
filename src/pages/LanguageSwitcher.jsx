import React from "react";
import { useLanguage } from "./LanguageContext";

const LanguageSwitcher = () => {
    const { switchLanguage } = useLanguage();

    return (
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <button className="language-btn" onClick={() => switchLanguage("he")}>
                עברית
            </button>
            <button className="language-btn" onClick={() => switchLanguage("ar")}>
                العربية
            </button>
        </div>
    );
};

export default LanguageSwitcher;
