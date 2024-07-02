// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/login`, {
                username: email,
                password: password,
            });
            setToken(response.data.access_token);
        } catch (error) {
            console.error("Error logging in", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
