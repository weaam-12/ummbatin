// src/components/Payments.js
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PayPalPayment from "./PayPalPayment";
import "../App.css";

const Payments = () => {
    const { t } = useTranslation();
    const [paymentType, setPaymentType] = useState("receipt");
    const [amount, setAmount] = useState("");

    const handlePaymentTypeChange = (event) => {
        setPaymentType(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">{t("title")}</h2>

            {/* Payment Type Selection */}
            <div className="mb-4">
                <label>{t("paymentMethod")}</label>
                <select onChange={handlePaymentTypeChange} value={paymentType}>
                    <option value="receipt">{t("receiptPayment")}</option>
                    <option value="card">{t("cardPayment")}</option>
                    <option value="paypal">PayPal</option>
                </select>
            </div>

            {/* Payment Form */}
            {paymentType === "paypal" ? (
                <>
                    <label>{t("amount")}</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full p-2 border rounded mb-4"
                        placeholder={t("enterAmount")}
                        required
                    />
                    <PayPalPayment amount={amount || "10.00"} />
                </>
            ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>{t("amount")}</label>
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
                        {t("payNow")}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Payments;
