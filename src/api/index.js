import axios from 'axios';
import {getToken} from "../storage/token";

const api = axios.create({
    baseURL: 'https://us-central1-orchestrator-service.cloudfunctions.net/app',
    timeout: 60000,
});

export const addTokenToHeaders = (token) => {
    if (!token || token === 'undefined') return console.error('Token is not defined');

    api.defaults.headers.common = {'Authorization': `Bearer ${token}`};
}

addTokenToHeaders(getToken());

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
