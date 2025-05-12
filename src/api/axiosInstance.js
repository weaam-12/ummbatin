import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',  // Replace this with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to automatically add the token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');  // Retrieve the token from local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  // Attach the token to the request header
        }
        return config;  // Return the modified config
    },
    (error) => {
        return Promise.reject(error);  // If there’s an error, reject it
    }
);

export default axiosInstance;  // Make sure you export this as default
