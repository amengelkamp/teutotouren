import React from 'react';
import './dauerFilter.css';

const DauerFilter = ({ value, onChange }) => {
    const display = (!value || value >= 10) ? 'Beliebig' : `Bis ${value} Std.`;

    return (
        <div className="dauerFilter">
            <span className="dauerValue">{display}</span>
            <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={value || 10}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="dauerSlider"
            />
            <div className="dauerRange">
                <span>1 Std.</span>
                <span>10 Std.</span>
            </div>
        </div>
    );
};

export default DauerFilter;
