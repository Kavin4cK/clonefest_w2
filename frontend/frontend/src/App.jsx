// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import AlbumList from './components/AlbumList';
import { getUsers } from './api';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (err) {
                setError('Could not connect to the server. Please make sure the backend is running.');
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    const handleUserCreated = (newUser) => {
        setUsers([...users, newUser]);
    };

    return (
        <Router>
            <div className="app-container">
                <header className="app-header">
                    <h1>PhotoGallery</h1>
                    <p>A simple and clean interface for your memories.</p>
                </header>
                <main className="app-main">
                    {error && <p className="error-message">{error}</p>}
                    <div className="content-layout">
                        <div className="sidebar">
                            <UserList
                                users={users}
                                onUserSelect={setSelectedUser}
                                onUserCreated={handleUserCreated}
                                selectedUserId={selectedUser ? selectedUser.id : null}
                            />
                        </div>
                        <div className="main-content">
                            <Routes>
                                <Route path="/" element={
                                    selectedUser ? (
                                        <AlbumList user={selectedUser} />
                                    ) : (
                                        <div className="placeholder">
                                            <h2>Select a user to view their albums</h2>
                                        </div>
                                    )
                                } />
                                {/* You can add more routes here for specific albums, etc. */}
                            </Routes>
                        </div>
                    </div>
                </main>
            </div>
        </Router>
    );
}

export default App;