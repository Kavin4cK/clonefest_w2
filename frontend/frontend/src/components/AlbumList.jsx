// src/components/AlbumList.jsx
import React, { useState, useEffect } from 'react';
import { getAlbumsForUser } from '../api';
import './AlbumList.css';

// --- Add onAlbumSelect to props ---
const AlbumList = ({ user, onAlbumSelect }) => { 
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // ... (existing useEffect code is correct from our last fix)
        if (!user) return;

        const fetchAlbums = async () => {
            try {
                setLoading(true);
                const albumData = await getAlbumsForUser(user.id);
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
    }, [user]);

    if (!user) {
        return (
             <div className="placeholder">
                <h2>Select a user to view their albums</h2>
            </div>
        )
    }

    if (loading) return <p className="loading-text">Loading albums...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div className="album-list-container">
            <h2>{user.name}'s Albums</h2>
            {albums.length === 0 ? (
                <p>No albums found. Create one!</p>
            ) : (
                <div className="album-grid">
                    {albums.map((album) => (
                        // --- Add onClick handler here ---
                        <div key={album.id} className="album-card" onClick={() => onAlbumSelect(album)}>
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