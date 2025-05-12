import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Forms from "./Forms"; // Import the Forms component
import axios from "axios"; // Import Axios
import "../App.css";

const Payments = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [paymentType, setPaymentType] = useState("receipt"); // Default to receipt payment

    const fields = [
        { name: "amount", label: t("amount"), type: "number", required: true },
        { name: "cardNumber", label: t("cardNumber"), type: "text", required: true },
        { name: "expiryDate", label: t("expiryDate"), type: "text", required: true },
        { name: "cvv", label: t("cvv"), type: "password", required: true },
    ];

    const handleSubmit = async (formData) => {
        setLoading(true);
        setMessage("");
        setError("");

        try {
            let response;

            if (paymentType === "receipt") {
                // Handle receipt submission
                response = await axios.post("http://localhost:8080/api/receipt", formData);
                if (response.data.status === "success") {
                    setMessage(t("receiptGenerated"));
                } else {
                    setMessage(t("paymentFailed"));
                }
            } else {
                // Handle card payment submission
                response = await axios.post("http://localhost:8080/api/payments", formData);
                if (response.data.status === "success") {
                    setMessage(t("paymentSuccessful"));
                } else {
                    setMessage(t("paymentFailed"));
                }
            }
        } catch (error) {
            setError(t("errorOccurred"));
            console.error(error); // Log error for debugging
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentTypeChange = (event) => {
        setPaymentType(event.target.value);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">{t("title")}</h2>
            <p className="text-center mb-6">{t("enterDetails")}</p>

            {message && (
                <p
                    className={`text-center p-2 rounded-md ${message.includes("successful") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                    {message}
                </p>
            )}
            {error && <p className="text-center text-red-600 mt-2">{error}</p>}

            {/* Payment Type Selection */}
            <div className="mb-4">
                <label className="mr-4">{t("paymentMethod")}</label>
                <input
                    type="radio"
                    id="receipt"
                    name="paymentType"
                    value="receipt"
                    checked={paymentType === "receipt"}
                    onChange={handlePaymentTypeChange}
                />
                <label htmlFor="receipt">{t("receiptPayment")}</label>

                <input
                    type="radio"
                    id="card"
                    name="paymentType"
                    value="card"
                    checked={paymentType === "card"}
                    onChange={handlePaymentTypeChange}
                    className="ml-4"
                />
                <label htmlFor="card">{t("cardPayment")}</label>
            </div>

            {/* Form Fields based on Payment Type */}
            <form onSubmit={handleSubmit}>
                {paymentType === "receipt" && (
                    <>
                        <label>{t("fullName")}</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            // Add form data and onChange here...
                        />

                        <label>{t("idNumber")}</label>
                        <input
                            type="text"
                            name="idNumber"
                            required
                            // Add form data and onChange here...
                        />

                        <label>{t("serviceType")}</label>
                        <select name="serviceType" required>
                            <option value="water">{t("water")}</option>
                            <option value="kindergarten">{t("kindergarten")}</option>
                        </select>

                        <label>{t("serviceDetails")}</label>
                        <input
                            type="text"
                            name="serviceDetails"
                            required
                            // Add form data and onChange here...
                        />

                        <label>{t("email")}</label>
                        <input
                            type="email"
                            name="email"
                            required
                            // Add form data and onChange here...
                        />
                    </>
                )}

                {paymentType === "card" && (
                    <>
                        <label>{t("amount")}</label>
                        <input
                            type="number"
                            name="amount"
                            required
                            // Add form data and onChange here...
                        />

                        <label>{t("cardNumber")}</label>
                        <input
                            type="text"
                            name="cardNumber"
                            required
                            // Add form data and onChange here...
                        />

                        <label>{t("expiryDate")}</label>
                        <input
                            type="text"
                            name="expiryDate"
                            required
                            // Add form data and onChange here...
                        />

                        <label>{t("cvv")}</label>
                        <input
                            type="password"
                            name="cvv"
                            required
                            // Add form data and onChange here...
                        />
                    </>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? t("processing") : paymentType === "receipt" ? t("submitRequest") : t("submitPayment")}
                </button>
            </form>
        </div>
    );
};

export default Payments;
