import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaLock, FaEnvelope, FaSpinner } from "react-icons/fa";

function RegisterForm() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // בדיקת חוזק סיסמה כשהסיסמה משתנה
        if (name === "password") {
            calculatePasswordStrength(value);
        }
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length > 5) strength += 1;
        if (password.length > 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        setPasswordStrength(strength);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // אימות נתונים
        if (form.password !== form.confirmPassword) {
            setError("הסיסמאות לא תואמות");
            return;
        }

        if (passwordStrength < 3) {
            setError("הסיסמה חלשה מדי");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/users/register",
                { email: form.email, password: form.password }
            );
            setSuccess("ההרשמה בוצעה בהצלחה! כעת תוכל להתחבר.");
            setForm({ email: "", password: "", confirmPassword: "" });
        } catch (error) {
            setError(error.response?.data?.message ||
                "ההרשמה נכשלה. אנא נסה שוב.");
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength === 0) return "bg-gray-200";
        if (passwordStrength <= 2) return "bg-red-500";
        if (passwordStrength <= 4) return "bg-yellow-500";
        return "bg-green-500";
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg" dir="rtl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">יצירת חשבון</h2>
                <p className="text-gray-600 mt-2">
                    הצטרף לקהילה שלנו היום
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="כתובת אימייל"
                            required
                            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="סיסמה"
                            required
                            minLength="6"
                            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                        {form.password && (
                            <div className="mt-2">
                                <div className="h-1 w-full bg-gray-200 rounded-full">
                                    <div
                                        className={`h-1 rounded-full ${getPasswordStrengthColor()}`}
                                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 text-right">
                                    {passwordStrength === 0 && "הזן סיסמה"}
                                    {passwordStrength === 1 && "חלשה מאוד"}
                                    {passwordStrength === 2 && "חלשה"}
                                    {passwordStrength === 3 && "בינונית"}
                                    {passwordStrength === 4 && "חזקה"}
                                    {passwordStrength === 5 && "חזקה מאוד"}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-400" />
                        </div>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="אימות סיסמה"
                            required
                            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm text-right">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm text-right">
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                        loading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    } flex items-center justify-center`}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin ml-2" />
                            מבצע הרשמה...
                        </>
                    ) : (
                        "הירשם עכשיו"
                    )}
                </button>

                <div className="text-center text-sm text-gray-600">
                    כבר יש לך חשבון?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        התחבר
                    </a>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;