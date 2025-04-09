import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Forms from "./Forms"; // Import the Forms component
import { submitPayment } from "../api";
import "../App.css";

const Payments = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const fields = [
        { name: "amount", label: t("amount"), type: "number", required: true },
        { name: "cardNumber", label: t("cardNumber"), type: "text", required: true },
        { name: "expiryDate", label: t("expiryDate"), type: "text", required: true },
        { name: "cvv", label: t("cvv"), type: "password", required: true },
    ];

    const handleSubmit = async (formData) => {
        setLoading(true);
        setMessage("");

        try {
            const response = await submitPayment(formData);
            if (response.status === "success") {
                setMessage(t("paymentSuccessful"));
            } else {
                setMessage(t("paymentFailed"));
            }
        } catch (error) {
            setMessage(t("errorOccurred"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-container">
            <h2>{t("title")}</h2>
            <p>{t("enterDetails")}</p>

            {message && <p className={`message ${message.includes("successful") ? "success" : ""}`}>{message}</p>}

            <Forms
                fields={fields}
                onSubmit={handleSubmit}
                loading={loading}
                submitButtonText={t("payNow")}
            />
        </div>
    );
};

export default Payments;