import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Form from "./Forms.jsx";
import ErrorBoundary from "./ErrorBoundary"; // Import the ErrorBoundary
import "./PaymentForm.css";

const PaymentForm = () => {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fields = [
        { name: "fullName", label: t("fullName"), type: "text", required: true },
        { name: "idNumber", label: t("idNumber"), type: "text", required: true },
        {
            name: "serviceType",
            label: t("serviceType"),
            type: "select",
            required: true,
            options: [
                { value: "water", label: t("waterPayment") },
                { value: "kindergarten", label: t("kindergartenRegistration") },
            ],
        },
        { name: "serviceDetails", label: t("serviceDetails"), type: "text", required: true },
        { name: "email", label: t("email"), type: "email", required: true },
    ];

    const handleSubmit = async (formData) => {
        setLoading(true);
        setErrorMessage("");

        try {
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSubmitted(true);
        } catch (error) {
            setErrorMessage(t("errorSubmitting"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-form-container">
            {submitted ? (
                <div className="success-message">
                    <h2>{t("successMessage")}</h2>
                    <p>{t("receiptDownloadMessage")}</p>
                </div>
            ) : (
                <>
                    <h1>{t("paymentFormTitle")}</h1>
                    <p>{t("paymentFormDescription")}</p>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {/* Wrap the Form component with ErrorBoundary */}
                    <ErrorBoundary>
                        <Form
                            fields={fields}
                            onSubmit={handleSubmit}
                            loading={loading}
                            submitButtonText={t("submit")}
                        />
                    </ErrorBoundary>
                </>
            )}
        </div>
    );
};

export default PaymentForm;