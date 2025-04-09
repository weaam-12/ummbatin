import React, { useState, useEffect, useMemo } from "react";

const Forms = ({ fields = [], onSubmit, formTitle = "טופס", loading = false, submitButtonText = "שלח" }) => {
    // Create initial state dynamically based on fields
    const initialFormData = useMemo(() => {
        return fields.reduce((acc, field) => {
            acc[field.name] = field.initialValue || "";
            return acc;
        }, {});
    }, [JSON.stringify(fields)]); // Ensures proper updates

    const [formData, setFormData] = useState(initialFormData);

    // Reset formData when fields change
    useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value, // Handle file uploads
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} dir="rtl">
            <h2>{formTitle}</h2>
            {fields.length > 0 ? (
                fields.map((field) => (
                    <div key={field.name} className="form-field">
                        <label>{field.label}</label>
                        {field.type === "select" ? (
                            <select name={field.name} value={formData[field.name]} onChange={handleChange} required={field.required}>
                                {field.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === "file" ? (
                            <input type="file" name={field.name} onChange={handleChange} required={field.required} />
                        ) : (
                            <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} required={field.required} />
                        )}
                    </div>
                ))
            ) : (
                <p>⚠️ אין שדות בטופס!</p>
            )}
            <button type="submit" disabled={loading}>{loading ? "שולח..." : submitButtonText}</button>
        </form>
    );
};

export default Forms;
