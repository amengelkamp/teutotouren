import React from 'react';
import './regionFilter.css';

const REGIONEN = [
    { value: '', label: 'Alle Regionen' },
    { value: 'Teutoburger Wald', label: 'Teutoburger Wald' },
    { value: 'Schwarzwald', label: 'Schwarzwald' },
    { value: 'Eifel', label: 'Eifel' },
    { value: 'Harz', label: 'Harz' },
    { value: 'Sauerland', label: 'Sauerland' },
    { value: 'Rheinsteig', label: 'Rheinsteig' },
];

const RegionFilter = ({ value, onChange }) => {
    return (
        <div className="regionFilterWrapper">
            <select
                className="regionFilterSelect"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
            >
                {REGIONEN.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                ))}
            </select>
            <svg className="regionSelectArrow" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
            </svg>
        </div>
    );
};

export default RegionFilter;
