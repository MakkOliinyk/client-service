import axios from 'axios';
import {getToken} from "../storage/token";

const api = axios.create({
    baseURL: 'https://us-central1-orchestrator-service.cloudfunctions.net/app',
    timeout: 60000, // Adjust the timeout value as needed
});

export const addTokenToHeaders = (token) => {
    if (!token || token === 'undefined') return console.error('Token is not defined');

    api.defaults.headers.common = {'Authorization': `Bearer ${token}`};
}

addTokenToHeaders(getToken());

// Add a response interceptor to handle CORS and other common issues
api.interceptors.response.use(
    (response) => {
        // Return the response if it's successful
        return response;
    },
    (error) => {
        // Handle common error scenarios
        if (error.response) {
            // The request was made and the server responded with a status code outside the 2xx range

            // Handle specific status codes or error messages
            if (error.response.status === 401) {
                // Handle unauthorized access (e.g., redirect to login page)
            } else if (error.response.status === 403) {
                // Handle forbidden access (e.g., show an error message)
            } else if (error.response.status === 404) {
                // Handle resource not found (e.g., show an error message or redirect)
            } else {
                // Handle other error scenarios
            }
        } else if (error.request) {
            // The request was made, but no response was received (e.g., network error)
            // Handle network-related errors
        } else {
            // Something happened in setting up the request (e.g., request configuration error)
            // Handle request setup errors
        }

        // Return a rejected promise with the error to propagate it further
        return Promise.reject(error);
    }
);

export default api;
