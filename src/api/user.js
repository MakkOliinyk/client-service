import api from './index';
import {setToken} from "../storage/token";

export async function registerUser(email, password) {
    try {
        const response = await api.post('/user/register', { email, password });

        const { tokens } = response.data;
        const token = tokens[tokens.length - 1];
        setToken(token);

        const user = response.data;

        return { token, user };
    } catch (error) {
        throw new Error(error);
    }
}

export async function loginUser(email, password) {
    try {
        const response = await api.post('/user/login', { email, password });

        const { tokens } = response.data;
        const token = tokens[tokens.length - 1];
        setToken(token);

        const user = response.data;

        return { token, user };
    } catch (error) {
        throw new Error(error);
    }
}

export async function getLoggedInUser() {
    try {
        const response = await api.get('/user/me');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export async function logoutUser(authorization) {
    try {
        const response = await api.post('/user/logout', {}, {
            headers: { Authorization: authorization }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
