// src/components/CreateAccount.js
import React, { useState } from 'react';
import { createAccount } from '../services/api';

const CreateAccount = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [parentId, setParentId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const account = { account_number: accountNumber, name, type, parent_id: parentId };
        try {
            await createAccount(account);
            setAccountNumber('');
            setName('');
            setType('');
            setParentId('');
            alert('Account created successfully');
        } catch (error) {
            alert('Failed to create account');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Account Number</label>
                <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Account Number" />
            </div>
            <div>
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </div>
            <div>
                <label>Type</label>
                <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
            </div>
            <div>
                <label>Parent ID</label>
                <input value={parentId} onChange={(e) => setParentId(e.target.value)} placeholder="Parent ID" />
            </div>
            <button type="submit">Create Account</button>
        </form>
    );
};

export default CreateAccount;
