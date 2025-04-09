import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css"; // Import the updated CSS

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© 2025 {t("siteName")}. {t("allRightsReserved")}.</p>
                <nav className="footer-links">
                    <a href="/privacy-policy">{t("privacyPolicy")}</a>
                    <a href="/terms-of-service">{t("termsOfService")}</a>
                    <a href="/contact">{t("contactUs")}</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;