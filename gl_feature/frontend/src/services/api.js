// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const createAccount = async (account) => {
    try {
        const response = await axios.post(`${API_URL}/accounts/`, account);
        return response.data;
    } catch (error) {
        console.error("There was an error creating the account!", error);
        throw error;
    }
};

export const getAccounts = async () => {
    try {
        const response = await axios.get(`${API_URL}/accounts/`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the accounts!", error);
        throw error;
    }
};