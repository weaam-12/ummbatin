import React from "react";
import { NavLink } from "react-router-dom";

const ServiceCard = ({ to, title, description }) => {
    return (
        <NavLink to={to} className="service-card">
            <h3>{title}</h3>
            <p>{description}</p>
        </NavLink>
    );
};

export default ServiceCard;
