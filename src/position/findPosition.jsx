import React, { useState } from 'react';
import './findPosition.css';

const FindPosition = () => {
    const [position, setPosition] = useState('');

    const fetchPosition = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    setPosition(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
                },
                (error) => {
                    setPosition('Standort nicht verfügbar');
                }
            );
        }
    };

    return (
        <div className="positionField">
            <svg className="positionIcon" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
            </svg>
            <input
                type="text"
                placeholder="Ort oder Adresse eingeben"
                className="positionInput"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            <button className="positionGpsBtn" onClick={fetchPosition} title="Aktuellen Standort ermitteln">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
                    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" opacity="0"/>
                </svg>
            </button>
        </div>
    );
};

export default FindPosition;
