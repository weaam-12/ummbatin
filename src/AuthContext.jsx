import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // טעינה ראשונית

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
        setLoading(false); // סיום טעינה
    }, []);

    const login = async (loginRequest) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', loginRequest, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            const userData = response.data;
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", userData.token);
            setUser(userData);
            return userData;
        } catch (error) {
            console.error("כשל בכניסה:", error.response?.data || error.message);
            throw new Error("הכניסה נכשלה. אנא בדוק את האימייל והסיסמה שלך.");
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);