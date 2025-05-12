import axios from 'axios';

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor to add JWT token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Special handling for FormData requests (setting content type)
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor for error handling (e.g., handling 401 unauthorized)
axiosInstance.interceptors.response.use(
    (response) => response,  // If the response is successful, just return it
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Handle token expiration or unauthorized access
            console.log('Unauthorized access, please log in again.');
            localStorage.removeItem('token');  // Clear the token
            window.location.href = '/login';   // Redirect to login page (or handle as needed)
        }
        return Promise.reject(error);
    }
);

// Submit complaint with FormData
export const submitComplaint = async (complaintData) => {
    try {
        const formData = new FormData();
        Object.entries(complaintData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await axiosInstance.post('/complaints', formData);
        return response.data;
    } catch (error) {
        console.error('Error submitting complaint:', error.response?.data || error.message);
        throw error;
    }
};

// Fetch all complaints
export const getComplaints = async () => {
    try {
        const response = await axiosInstance.get('/complaints');
        return response.data;
    } catch (error) {
        console.error('Error fetching complaints:', error.response?.data || error.message);
        throw error;
    }
};
export const getUserProfile = async () => {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
};

// // Fetch user profile
// export const getUserProfile = async () => {
//     try {
//         const response = await axiosInstance.get('/user/profile');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching user profile:', error.response?.data || error.message);
//         throw error;
//     }
// };
// Fetch Services (dynamic)
// Corrected Fetch Services Function
export const fetchServices = async () => {
    try {
        const response = await axiosInstance.get("/services");
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error("Unexpected services data format:", response.data);
            return [];
        }
    } catch (error) {
        console.error("Error fetching services:", error.response?.data || error.message);
        throw error;
    }
};


// Fetch garbage service history
export const fetchServiceHistory = async () => {
    try {
        const response = await axiosInstance.get('/garbage-service/history');
        return response.data;
    } catch (error) {
        console.error('Error fetching service history:', error.response?.data || error.message);
        throw error;
    }
};

// Example function to add a new service (for demo purposes)
export const addNewService = async (serviceData) => {
    try {
        const response = await axiosInstance.post('/garbage-service', serviceData);
        return response.data;
    } catch (error) {
        console.error('Error adding service:', error.response?.data || error.message);
        throw error;
    }
};
// Function to fetch complaint history
export const fetchComplaintHistory = async () => {
    try {
        const response = await axiosInstance.get("/complaints/history");
        return response.data;
    } catch (error) {
        console.error("Error fetching complaint history:", error);
        throw error;
    }
};


// // Example function for updating a user's profile
// export const updateUserProfile = async (updatedProfileData) => {
//     try {
//         const response = await axiosInstance.put('/user/profile', updatedProfileData);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating user profile:', error.response?.data || error.message);
//         throw error;
//     }
// };

export default axiosInstance;
