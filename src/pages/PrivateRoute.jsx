import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth(); // Access user from context

    // If there is no user (i.e., not authenticated), redirect to login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Otherwise, render the protected component
    return children;
};

export default PrivateRoute;
