import React from 'react';
import './schwierigkeitFilter.css';

const CHIPS = [
    { value: '', label: 'Alle' },
    { value: 'leicht', label: 'Leicht' },
    { value: 'mittel', label: 'Mittel' },
    { value: 'schwer', label: 'Schwer' },
];

const SchwierigkeitFilter = ({ value, onChange }) => {
    return (
        <div className="schwierigkeitChips">
            {CHIPS.map((chip) => (
                <button
                    key={chip.value}
                    className={`schwierigkeitChip ${value === chip.value ? 'aktiv' : ''}`}
                    onClick={() => onChange(chip.value)}
                >
                    {chip.label}
                </button>
            ))}
        </div>
    );
};

export default SchwierigkeitFilter;
