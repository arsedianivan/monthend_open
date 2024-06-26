// src/components/AccountList.js
import React, { useEffect, useState } from 'react';
import { getAccounts } from '../services/api';

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await getAccounts();
                setAccounts(data);
            } catch (error) {
                console.error("Failed to fetch accounts", error);
            }
        };

        fetchAccounts();
    }, []);

    return (
        <div>
            <h2>Account List</h2>
            <ul>
                {accounts.map(account => (
                    <li key={account.id}>{account.name} ({account.account_number})</li>
                ))}
            </ul>
        </div>
    );
};

export default AccountList;
