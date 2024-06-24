// src/components/TransactionList.js
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../services/api';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        Journal Entry ID: {transaction.journal_entry_id}, Account ID: {transaction.account_id}, Debit: {transaction.debit}, Credit: {transaction.credit}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
