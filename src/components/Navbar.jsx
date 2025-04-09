import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

const Navbar = () => {
    const { t } = useTranslation();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo or Brand Name */}
                <NavLink to="/" className="navbar-brand">
                    {t("siteName")}
                </NavLink>

                {/* Navigation Links */}
                <div className="navbar-links">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        {t("home")}
                    </NavLink>
                    <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        {t("login")}
                    </NavLink>
                    <NavLink to="/complaints" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        {t("complaints")}
                    </NavLink>
                    <NavLink to="/payments" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        {t("payments")}
                    </NavLink>
                    <NavLink to="/forms" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        {t("forms")}
                    </NavLink>
                    <NavLink to="/emergency" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        {t("emergency")}
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        {t("about")}
                    </NavLink>
                    <NavLink to="/garbage-service" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        {t("garbageService")}
                    </NavLink>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;