import React from 'react';
import './formOfTravel.css';

const IconBahn = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="13" rx="3"/>
        <path d="M4 10h16"/>
        <path d="M8 19l-2 2M16 19l2 2"/>
        <path d="M9 19h6"/>
        <circle cx="8.5" cy="15" r="1" fill="currentColor" stroke="none"/>
        <circle cx="15.5" cy="15" r="1" fill="currentColor" stroke="none"/>
    </svg>
);

const IconAuto = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11"/>
        <rect x="2" y="11" width="20" height="7" rx="2"/>
        <circle cx="7" cy="18" r="2"/>
        <circle cx="17" cy="18" r="2"/>
        <path d="M2 14h1M21 14h1"/>
    </svg>
);

const FormOfTravel = ({ value = 'auto', onChange }) => {
    return (
        <div className={`segmentedControl${value ? ' hasActive' : ''}`}>
            <button
                className={`segmentBtn ${value === 'auto' ? 'aktiv' : ''}`}
                onClick={() => onChange && onChange('auto')}
                title="Auto"
            >
                <IconAuto />
            </button>
            <button
                className={`segmentBtn ${value === 'bahn' ? 'aktiv' : ''}`}
                onClick={() => onChange && onChange('bahn')}
                title="Bahn"
            >
                <IconBahn />
            </button>
        </div>
    );
};

export default FormOfTravel;
