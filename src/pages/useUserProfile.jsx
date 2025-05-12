// src/hooks/useUserProfile.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api";

export const useUserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserProfile()
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load user profile.");
                setLoading(false);
                if (!localStorage.getItem("token")) {
                    navigate("/login");
                }
            });
    }, [navigate]);

    return { user, loading, error };
};
