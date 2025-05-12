import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // For loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Clear any previous error
        setLoading(true); // Start loading state

        try {
            const response = await axios.post("http://localhost:8080/api/users/register", form);
            alert("Registered successfully!");
            setForm({ email: "", password: "" }); // Clear form after successful registration
        } catch (error) {
            setError("Registration failed: " + (error.response?.data || error.message));
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        placeholder="Password"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <button
                    type="submit"
                    className={`w-full py-2 rounded-md ${loading ? "bg-gray-400" : "bg-blue-500"} text-white`}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;
