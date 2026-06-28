import React, { useState } from 'react';
import './anreisezeit.css';

const OPTIONEN = [
    { value: '', label: 'Beliebig' },
    { value: '30', label: '30 Min.' },
    { value: '60', label: '1 Std.' },
    { value: '120', label: '2 Std.' },
    { value: '180', label: '3 Std.' },
];

const Anreisezeit = ({ value = '', onChange }) => {
    return (
        <div className="anreisezeitWrapper">
            <select
                className="anreisezeitSelect"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            >
                {OPTIONEN.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
            <svg className="selectArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
            </svg>
        </div>
    );
};

export default Anreisezeit;
