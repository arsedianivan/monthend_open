// src/components/JournalEntryList.js
import React, { useEffect, useState } from 'react';
import { getJournalEntries } from '../services/api';

const JournalEntryList = () => {
    const [journalEntries, setJournalEntries] = useState([]);

    useEffect(() => {
        const fetchJournalEntries = async () => {
            try {
                const data = await getJournalEntries();
                setJournalEntries(data);
            } catch (error) {
                console.error("Failed to fetch journal entries", error);
            }
        };

        fetchJournalEntries();
    }, []);

    return (
        <div>
            <h2>Journal Entry List</h2>
            <ul>
                {journalEntries.map(entry => (
                    <li key={entry.id}>{entry.date} - {entry.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default JournalEntryList;
