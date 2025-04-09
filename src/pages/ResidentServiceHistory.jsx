import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchServiceHistory } from "../api"; // Assuming API is set up for this
import "./GarbageService.css";

const ResidentServiceHistory = ({ userId }) => {
    const { t } = useTranslation();
    const [serviceHistory, setServiceHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // Fetch all service history, but filter it on the resident side
                const history = await fetchServiceHistory();
                const filteredHistory = history.filter(
                    (request) => request.userId === userId
                );
                setServiceHistory(filteredHistory);
            } catch (error) {
                console.error("Error fetching service history:", error);
            }
        };
        fetchHistory();
    }, [userId]);

    return (
        <div className="garbage-service-page">
            <h1>{t("serviceHistory")}</h1>
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
                <p>{t("noRequests")}</p>
            )}
        </div>
    );
};

export default ResidentServiceHistory;
