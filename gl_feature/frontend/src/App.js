// src/App.js
import React from 'react';
import CreateAccount from './components/CreateAccount';
import AccountList from './components/AccountList';

function App() {
    return (
        <div className="App">
            <h1>General Ledger</h1>
            <CreateAccount />
            <AccountList />
        </div>
    );
}

export default App;
