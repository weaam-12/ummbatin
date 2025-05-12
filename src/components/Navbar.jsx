import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes, FaUserCircle, FaSearch } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Function to change language
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Brand Logo */}
                <NavLink to="/" className="navbar-brand">
                    {t("siteName")}
                </NavLink>

                {/* Responsive Menu Icon */}
                <div className="menu-icon" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>

                {/* Navigation Links */}
                <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
                    <li>
                        <NavLink to="/" onClick={toggleMenu}>{t("home")}</NavLink>
                    </li>

                    <li>
                        <NavLink to="/complaints" onClick={toggleMenu}>{t("complaints")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/payments" onClick={toggleMenu}>{t("payments")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/forms" onClick={toggleMenu}>{t("forms")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/emergency" onClick={toggleMenu}>{t("emergency")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" onClick={toggleMenu}>{t("about")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/garbage-complaint" onClick={toggleMenu}>{t("garbageService")}</NavLink>
                    </li>
                </ul>

                {/* Right Side: Search, Language, Profile */}
                <div className="navbar-right">
                    {/* Search Bar */}
                    <div className="search-bar">
                        <input type="text" placeholder={t("search")} />
                        <FaSearch />
                    </div>

                    {/* Language Selector */}
                    <div className="language-selector">
                        <button onClick={() => changeLanguage("he")}>HE</button>
                        <button onClick={() => changeLanguage("ar")}>AR</button>
                    </div>

                    {/* User Profile */}
                    <div className="profile-menu">
                        <FaUserCircle size={24} onClick={() => navigate("/login")} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
