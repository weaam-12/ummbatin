// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "./HeroSection";
import ServiceCard from "./ServiceCard";
import { fetchServices, getUserProfile } from "../api";
import ErrorBoundary from "./ErrorBoundary";

const Home = () => {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [errorServices, setErrorServices] = useState(null);

    useEffect(() => {
        getUserProfile()
            .then((data) => setUser(data))
            .catch((error) => {
                console.error("Error fetching user profile:", error);
                if (!localStorage.getItem("token")) {
                    window.location.href = "/login";
                }
            });
    }, []);

    useEffect(() => {
        fetchServices()
            .then((data) => setServices(data))
            .catch(() => setErrorServices("Failed to load services."))
            .finally(() => setLoadingServices(false));
    }, []);

    return (
        <ErrorBoundary>
            <div className="home-container">
                {user ? (
                    <div className="user-info">
                        <h2>Welcome back, {user.name}!</h2>
                    </div>
                ) : (
                    <p>Loading user info...</p>
                )}

                <HeroSection />

                <section className="services-section">
                    <h2>{t("ourServices")}</h2>
                    {loadingServices ? (
                        <p>Loading services...</p>
                    ) : errorServices ? (
                        <p>{errorServices}</p>
                    ) : (
                        <div className="services-grid">
                            {services.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    to={service.path}
                                    title={t(service.title)}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </ErrorBoundary>
    );
};

export default Home;
