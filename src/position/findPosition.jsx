import React, { useState } from 'react';
import './findPosition.css';

const FindPosition = () => {
    const [position, setPosition] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPosition = () => {
        if (!('geolocation' in navigator)) return;
        setLoading(true);
        setPosition('');

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json&addressdetails=1`,
                        { headers: { 'Accept-Language': 'de' } }
                    );
                    const data = await res.json();
                    const a = data.address;
                    const street = [a.road, a.house_number].filter(Boolean).join(' ');
                    const city = a.city || a.town || a.village || a.municipality || '';
                    const label = [street, city].filter(Boolean).join(', ') || data.display_name;
                    setPosition(label);
                } catch {
                    setPosition(`${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`);
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setPosition('Standort nicht verfügbar');
                setLoading(false);
            },
            { enableHighAccuracy: false, timeout: 4000, maximumAge: 300000 }
        );
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
                value={loading ? 'Wird ermittelt…' : position}
                onChange={(e) => setPosition(e.target.value)}
                readOnly={loading}
            />
            <button className="positionGpsBtn" onClick={fetchPosition} title="Aktuellen Standort ermitteln" disabled={loading}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
                </svg>
            </button>
        </div>
    );
};

export default FindPosition;
