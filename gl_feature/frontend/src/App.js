// src/App.js
import React from 'react';
import CreateAccount from './components/CreateAccount';
import AccountList from './components/AccountList';
import CreateJournalEntry from './components/CreateJournalEntry';
import JournalEntryList from './components/JournalEntryList';
import CreateTransaction from './components/CreateTransaction';
import TransactionList from './components/TransactionList';

function App() {
    return (
        <div className="App">
            <h1>General Ledger</h1>
            <CreateAccount />
            <AccountList />
            <CreateJournalEntry />
            <JournalEntryList />
            <CreateTransaction />
            <TransactionList />
        </div>
    );
}

export default App;
