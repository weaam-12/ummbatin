import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
    const { t } = useTranslation();

    return (
        <section className="hero-section">
            <h1>{t("homeTitle")}</h1>
            <p>{t("homeDescription")}</p>
            <NavLink to="/services" className="cta-button">
            </NavLink>
        </section>
    );
};

export default HeroSection;
