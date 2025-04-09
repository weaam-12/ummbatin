import React, { useState } from "react";
import Forms from "./Forms";
import { useTranslation } from "react-i18next";
import { services } from "./services";

const Complaints = () => {
    const { t } = useTranslation();
    const [selectedService, setSelectedService] = useState(null);
    const [submittedData, setSubmittedData] = useState(null);

    // Define different forms dynamically
    const formTemplates = {
        "אישור תושב": [
            { name: "fullName", label: "שם מלא", type: "text", required: true },
            { name: "idNumber", label: "תעודת זהות", type: "number", required: true },
            { name: "address", label: "כתובת", type: "text", required: true },
        ],
        "קבלה על תשלום": [
            { name: "receiptNumber", label: "מספר קבלה", type: "text", required: true },
            { name: "amount", label: "סכום", type: "number", required: true },
            { name: "paymentDate", label: "תאריך תשלום", type: "date", required: true },
        ],
        "תלונה על תשתיות": [
            { name: "issueType", label: "סוג התקלה", type: "select", required: true, options: [
                    { value: "חשמל", label: "חשמל" },
                    { value: "מים", label: "מים" },
                    { value: "כבישים", label: "כבישים" },
                ]},
            { name: "description", label: "תיאור התקלה", type: "text", required: true },
            { name: "photo", label: "העלאת תמונה", type: "file", required: false },
        ]
    };

    // Handle form submission
    const handleFormSubmit = (formData) => {
        setSubmittedData(formData);
        console.log("📤 טופס שנשלח:", formData);
    };

    return (
        <div className="complaints-container">
            <h1>{t("complaints2")}</h1>
            <p>{t("selectService")}</p>

            {/* Dropdown to select form type */}
            <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                <option value="">בחר שירות</option>
                {Object.keys(formTemplates).map((service) => (
                    <option key={service} value={service}>{service}</option>
                ))}
            </select>

            {/* Show form based on selection */}
            {selectedService && (
                <Forms
                    fields={formTemplates[selectedService]}
                    onSubmit={handleFormSubmit}
                    formTitle={selectedService}
                    submitButtonText="שלח פנייה"
                />
            )}

            {/* Display submitted data */}
            {submittedData && (
                <div className="submitted-data">
                    <h3>📜 פנייה שנשלחה:</h3>
                    <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Complaints;
