import React from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

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

            <div className="footer-divider"></div>

            <div className="footer-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
