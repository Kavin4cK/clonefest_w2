// src/components/AlbumList.jsx
import React, { useState, useEffect } from 'react';

import { getAlbumsForUser } from '../api';
import './AlbumList.css';

const AlbumList = ({ user }) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) return;

        const fetchAlbums = async () => {
            try {
                setLoading(true);
                // NOTE: This assumes your backend can fetch albums by username.
                // You may need to adjust this to use user.id if your API requires it.
                const albumData = await getAlbumsByUser(user.username);
                
                setAlbums(albumData);
                setError('');
            } catch (err) {
                setError('Failed to load albums.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, [user]); // Refetch when the user changes

    if (loading) return <p>Loading albums...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div className="album-list-container">
            <h2>{user.name}'s Albums</h2>
            {albums.length === 0 ? (
                <p>No albums found. Create one!</p>
            ) : (
                <div className="album-grid">
                    {albums.map((album) => (
                        <div key={album.id} className="album-card">
                            <div className="album-thumbnail"></div>
                            <div className="album-info">
                                <h3>{album.name}</h3>
                                <p>Privacy: {album.privacy}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AlbumList;