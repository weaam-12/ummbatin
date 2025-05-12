import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ to, title, description }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <div className="service-card" onClick={handleClick} style={{ cursor: "pointer" }}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default ServiceCard;
