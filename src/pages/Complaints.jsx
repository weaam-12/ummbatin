import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Forms from './Forms';
import { useAuth } from '../AuthContext';
import { submitComplaint, getComplaints } from '../api';

const Complaints = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState("");
    const [complaintsList, setComplaintsList] = useState([]);

    useEffect(() => {
        if (user === undefined) return; // Wait until user is loaded
        if (!user) navigate('/login');
        else loadComplaints();
    }, [user, navigate]);

    const loadComplaints = async () => {
        try {
            const data = await getComplaints();
            setComplaintsList(data);
        } catch (error) {
            console.error("Failed to load complaints.", error);
        }
    };

    return (
        <div>
            <h1>Complaints</h1>
            {selectedService && (
                <Forms onSubmit={(formData) => submitComplaint(formData)} />
            )}
            <ul>
                {complaintsList.map((complaint, index) => (
                    <li key={index}>{complaint.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default Complaints;
