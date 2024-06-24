// src/components/CreateJournalEntry.js
import React, { useState } from 'react';
import { createJournalEntry } from '../services/api';

const CreateJournalEntry = () => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const journalEntry = { date, description };
        try {
            await createJournalEntry(journalEntry);
            setDate('');
            setDescription('');
            alert('Journal entry created successfully');
        } catch (error) {
            alert('Failed to create journal entry');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Date</label>
                <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" />
            </div>
            <div>
                <label>Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            </div>
            <button type="submit">Create Journal Entry</button>
        </form>
    );
};

export default CreateJournalEntry;
