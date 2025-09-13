// src/components/UserList.jsx
import React from 'react';
import CreateUserForm from './CreateUserForm';
import './UserList.css';

const UserList = ({ users, onUserSelect, onUserCreated, selectedUserId }) => {
    return (
        <div className="user-list-container">
            <h3>Users</h3>
            <ul className="user-list">
                {users.map((user) => (
                    <li
                        key={user.id}
                        className={user.id === selectedUserId ? 'selected' : ''}
                        onClick={() => onUserSelect(user)}
                    >
                        {user.name} (@{user.username})
                    </li>
                ))}
            </ul>
            <CreateUserForm onUserCreated={onUserCreated} />
        </div>
    );
};

export default UserList;