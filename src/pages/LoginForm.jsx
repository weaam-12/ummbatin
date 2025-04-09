// LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./Login.css";

const LoginForm = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/login", { email, password });

            if (response.data.token) {
                // Save token to cookie (ensure it's HttpOnly, Secure, SameSite)
                document.cookie = `token=${response.data.token}; HttpOnly; Secure; SameSite=Strict`;
                window.location.href = "/home"; // Redirect to home after successful login
            } else {
                setError(t("loginFailed"));
            }
        } catch (err) {
            setError(t("loginFailed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="input-container">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("email")}
                    required
                />
            </div>
            <div className="input-container">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("password")}
                    required
                />
            </div>
            <div className="submit-container">
                <button type="submit" disabled={loading}>
                    {loading ? t("loading") : t("login")}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default LoginForm;
