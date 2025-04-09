import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { submitComplaint, fetchComplaintHistory } from "../api";
import Form from "../pages/Forms";
import "../App.css";

const GarbageComplaint = () => {
    const { t } = useTranslation();
    const [complaintHistory, setComplaintHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch complaint history from the backend
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await fetchComplaintHistory();
                setComplaintHistory(history);
            } catch (error) {
                console.error("Error fetching complaint history:", error);
            }
        };
        fetchHistory();
    }, []);

    // Define the fields for the garbage complaint form
    const fields = [
        { name: "complaint", label: t("complaint"), type: "textarea", required: true },
        {
            name: "category",
            label: t("category"),
            type: "select",
            required: true,
            options: [
                { value: "uncollected", label: t("uncollectedGarbage") },
                { value: "overflowing", label: t("overflowingBins") },
                { value: "illegalDumping", label: t("illegalDumping") },
            ],
        },
        { name: "images", label: t("uploadImages"), type: "file", required: false },
    ];

    // Handle form submission
    const handleSubmit = async (formData) => {
        setLoading(true);
        setMessage("");

        try {
            const response = await submitComplaint(formData);
            if (response.status === "success") {
                setMessage(t("complaintSubmitted"));
                setComplaintHistory((prevHistory) => [...prevHistory, response.complaint]);
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
        <div className="complaint-page">
            <h1>{t("garbageComplaint")}</h1>
            <p>{t("garbageComplaintDescription")}</p>

            {/* Form for submitting a new complaint */}
            <Form
                fields={fields}
                onSubmit={handleSubmit}
                loading={loading}
                submitButtonText={t("submit")}
            />

            {/* Complaint History Section */}
            <div className="complaint-history">
                <h2>{t("complaintHistory")}</h2>
                {complaintHistory.length > 0 ? (
                    <ul>
                        {complaintHistory.map((complaint, index) => (
                            <li key={index}>
                                <p><strong>{t("category")}:</strong> {complaint.category}</p>
                                <p><strong>{t("status")}:</strong> {complaint.status}</p>
                                <p><strong>{t("date")}:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t("noComplaintHistory")}</p>
                )}
            </div>

            {/* Message for successful/failed submission */}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default GarbageComplaint;
