import React from 'react';
import './dauerFilter.css';

const DauerFilter = ({ value, onChange }) => {
    const display = (!value || value >= 10) ? 'Beliebig' : `Bis ${value} Std.`;
    const sliderVal = value || 10;
    const fillPct = ((sliderVal - 1) / 9 * 100).toFixed(1) + '%';

    return (
        <div className="dauerFilter">
            <span className="dauerValue">{display}</span>
            <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={sliderVal}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="dauerSlider"
                style={{ '--fill-pct': fillPct }}
            />
            <div className="dauerRange">
                <span>1 Std.</span>
                <span>Beliebig</span>
            </div>
        </div>
    );
};

export default DauerFilter;
