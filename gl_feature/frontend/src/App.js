// src/App.js
import React from 'react';
import CreateAccount from './components/CreateAccount';
import AccountList from './components/AccountList';
import CreateJournalEntry from './components/CreateJournalEntry';
import JournalEntryList from './components/JournalEntryList';

function App() {
    return (
        <div className="App">
            <h1>General Ledger</h1>
            <CreateAccount />
            <AccountList />
            <CreateJournalEntry />
            <JournalEntryList />
        </div>
    );
}

export default App;
