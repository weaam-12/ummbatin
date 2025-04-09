import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Ensure you have AuthContext to track user authentication

const PrivateRoute = ({ element }) => {
    const { user } = useAuth(); // Get user authentication status

    return user && user.role === "admin" ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
