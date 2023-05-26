import api from './index';
import {removeToken, setToken} from "../storage/token";

export async function registerUser(email, password) {
    try {
        const response = await api.post('/user/register', { email, password });

        const { token } = response.data;
        setToken(token);

        const user = response.data;

        return { user };
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

export async function logoutUser() {
    try {
        const response = await api.post('/user/logout', {});
        removeToken();

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
