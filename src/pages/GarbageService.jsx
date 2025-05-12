import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Form from "../pages/Forms.jsx";
import "./GarbageComplaint.css";  // Importing specific styles for this component

const GarbageService = () => {
    const { t } = useTranslation();
    const [serviceHistory, setServiceHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await fetchServiceHistory();
                setServiceHistory(history);
            } catch (error) {
                console.error("Error fetching service history:", error);
            }
        };
        fetchHistory();
    }, []);

    const fields = [
        {
            name: "serviceType",
            label: t("serviceType"),
            type: "select",
            required: true,
            options: [
                { value: "cleaning", label: t("garbageCleaning") },
                { value: "newBin", label: t("newGarbageBin") },
            ],
        },
        { name: "address", label: t("address"), type: "text", required: true },
        { name: "phoneNumber", label: t("phoneNumber"), type: "number", required: true },

        { name: "image", label: t("uploadImage"), type: "file", required: false },
    ];

    const handleSubmit = async (formData) => {
        setLoading(true);
        setMessage("");

        try {
            const response = await submitServiceRequest(formData);
            if (response.status === "success") {
                setMessage(t("requestSubmitted"));
                setServiceHistory((prevHistory) => [...prevHistory, response.request]);
            } else {
                setMessage(t("errorSubmitting"));
            }
        } catch (error) {
            setMessage(t("errorSubmitting"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="garbage-service-page">
            <h1>{t("garbageService")}</h1>
            <p>{t("garbageServiceDescription")}</p>

            <Form
                fields={fields}
                onSubmit={handleSubmit}
                loading={loading}
                submitButtonText={t("submit")}
            />

            {/* Service History */}
            <div className="service-history">
                <h2>{t("serviceHistory")}</h2>
                {serviceHistory.length > 0 ? (
                    <ul>
                        {serviceHistory.map((request, index) => (
                            <li key={index}>
                                <p><strong>{t("serviceType")}:</strong> {request.serviceType}</p>
                                <p><strong>{t("status")}:</strong> {request.status}</p>
                                <p><strong>{t("date")}:</strong> {new Date(request.date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t("noServiceHistory")}</p>
                )}
            </div>
        </div>
    );
};

export default GarbageService;
