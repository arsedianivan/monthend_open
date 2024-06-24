// src/components/CreateTransaction.js
import React, { useState } from 'react';
import { createTransaction } from '../services/api';

const CreateTransaction = () => {
    const [journalEntryId, setJournalEntryId] = useState('');
    const [accountId, setAccountId] = useState('');
    const [debit, setDebit] = useState('');
    const [credit, setCredit] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const transaction = { journal_entry_id: journalEntryId, account_id: accountId, debit, credit };
        try {
            await createTransaction(transaction);
            setJournalEntryId('');
            setAccountId('');
            setDebit('');
            setCredit('');
            alert('Transaction created successfully');
        } catch (error) {
            alert('Failed to create transaction');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Journal Entry ID</label>
                <input value={journalEntryId} onChange={(e) => setJournalEntryId(e.target.value)} placeholder="Journal Entry ID" />
            </div>
            <div>
                <label>Account ID</label>
                <input value={accountId} onChange={(e) => setAccountId(e.target.value)} placeholder="Account ID" />
            </div>
            <div>
                <label>Debit</label>
                <input value={debit} onChange={(e) => setDebit(e.target.value)} placeholder="Debit" />
            </div>
            <div>
                <label>Credit</label>
                <input value={credit} onChange={(e) => setCredit(e.target.value)} placeholder="Credit" />
            </div>
            <button type="submit">Create Transaction</button>
        </form>
    );
};

export default CreateTransaction;
