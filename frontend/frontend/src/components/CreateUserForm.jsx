// src/components/CreateUserForm.jsx
import React, { useState } from 'react';
import { createUser } from '../api';
import './UserList.css'; // Assuming styles are in UserList.css

const CreateUserForm = ({ onUserCreated }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !username || !email || !password) {
            setError('All fields are required.');
            return;
        }
        try {
            const newUser = await createUser({ name, username, email, password });
            onUserCreated(newUser);
            // Clear form
            setName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setError('');
        } catch (err) {
            setError('Username or email already exists.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h4>Create New User</h4>
            {error && <p className="error-text">{error}</p>}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
            />
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Create User</button>
        </form>
    );
};

export default CreateUserForm;