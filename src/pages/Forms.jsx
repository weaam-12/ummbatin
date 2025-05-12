// src/Forms.jsx
import React, { useState } from "react";

const Form = ({ fields, onSubmit, loading, submitButtonText }) => {
    const [formData, setFormData] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
        setFieldErrors((prevState) => ({ ...prevState, [name]: "" })); // Clear error on change
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form before submit
        let errors = {};
        fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                errors[field.name] = "This field is required";
            }
        });

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors); // Show validation errors
        } else {
            onSubmit(formData); // Call the onSubmit prop
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.name} className="form-group">
                    <label htmlFor={field.name}>{field.label}</label>
                    {field.type === "select" ? (
                        <select
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select...</option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                        />
                    )}

                    {fieldErrors[field.name] && (
                        <span className="error">{fieldErrors[field.name]}</span>
                    )}
                </div>
            ))}

            <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : submitButtonText}
            </button>
        </form>
    );
};

export default Form;
