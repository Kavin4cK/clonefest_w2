// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Make sure this matches your backend server address

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const getAlbumsForUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/albums`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching albums for user ${userId}:`, error);
        throw error;
    }
};