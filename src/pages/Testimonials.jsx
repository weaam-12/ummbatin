import React from "react";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
    const { t } = useTranslation();

    return (
        <section className="testimonials-section">
            <h2>{t("whatOurClientsSay")}</h2>
            <div className="testimonials-grid">
                <div className="testimonial-card">
                    <p>{t("testimonial1")}</p>
                    <span>- {t("client1")}</span>
                </div>
                <div className="testimonial-card">
                    <p>{t("testimonial2")}</p>
                    <span>- {t("client2")}</span>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
