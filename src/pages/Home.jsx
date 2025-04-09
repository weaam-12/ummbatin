import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HeroSection from "./HeroSection";
import ServiceCard from "./ServiceCard";
import Testimonials from "./Testimonials";

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="home-container">
            <HeroSection />
            <section className="services-section">
                <h2>{t("ourServices")}</h2>
                <div className="services-grid">
                    <ServiceCard to="/complaints" title={t("complaints")} description={t("complaintsDescription")} />
                    <ServiceCard to="/payments" title={t("payments")} description={t("paymentsDescription")} />
                    <ServiceCard to="/forms" title={t("forms")} description={t("formsDescription")} />
                    <ServiceCard to="/emergency" title={t("emergency")} description={t("emergencyDescription")} />
                    <ServiceCard to="/about" title={t("about")} description={t("aboutDescription")} />
                </div>
            </section>
        </div>
    );
};

export default Home;
