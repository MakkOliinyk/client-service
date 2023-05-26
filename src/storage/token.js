import {addTokenToHeaders} from "../api";

export const setToken = (token) => {
    if (!token) return console.error('Token is not defined');

    localStorage.setItem('token', token);
    addTokenToHeaders(token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};
