// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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

export const createJournalEntry = async (journalEntry) => {
    try {
        const response = await axios.post(`${API_URL}/journal_entries/`, journalEntry);
        return response.data;
    } catch (error) {
        console.error("There was an error creating the journal entry!", error);
        throw error;
    }
};

export const getJournalEntries = async () => {
    try {
        const response = await axios.get(`${API_URL}/journal_entries/`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the journal entries!", error);
        throw error;
    }
};

export const createTransaction = async (transaction) => {
    try {
        const response = await axios.post(`${API_URL}/transactions/`, transaction);
        return response.data;
    } catch (error) {
        console.error("There was an error creating the transaction!", error);
        throw error;
    }
};

export const getTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}/transactions/`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the transactions!", error);
        throw error;
    }
};
