import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// ✅ Submit a payment (added this function)
export const submitPayment = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/payments`, data);
        return response.data;
    } catch (error) {
        console.error("Payment submission error:", error);
        throw error;
    }
};

// ✅ Submit a complaint (multipart form data for images)
export const submitComplaint = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/garbage-complaint`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Complaint submission error:", error);
        throw error;
    }
};

// ✅ Fetch complaint history
export const fetchComplaintHistory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/garbage-complaint/history`);
        return response.data;
    } catch (error) {
        console.error("Error fetching complaint history:", error);
        throw error;
    }
};

// ✅ Submit a garbage service request
export const submitServiceRequest = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/garbage-service`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Service request submission error:", error);
        throw error;
    }
};

// ✅ Fetch service request history
export const fetchServiceHistory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/garbage-service/history`);
        return response.data;
    } catch (error) {
        console.error("Error fetching service history:", error);
        throw error;
    }
};

// ✅ Update the status of a service request
export const updateRequestStatus = async (requestId, status) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/garbage-service/update-status`, {
            requestId,
            status
        });
        return response.data;
    } catch (error) {
        console.error("Error updating request status:", error);
        throw error;
    }
};
