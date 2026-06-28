import React, { useState } from 'react';
import './formOfTravel.css';

const FormOfTravel = ({ value = 'bahn', onChange }) => {
    return (
        <div className="segmentedControl">
            <button
                className={`segmentBtn ${value === 'bahn' ? 'aktiv' : ''}`}
                onClick={() => onChange && onChange('bahn')}
            >
                🚆 Bahn
            </button>
            <button
                className={`segmentBtn ${value === 'auto' ? 'aktiv' : ''}`}
                onClick={() => onChange && onChange('auto')}
            >
                🚗 Auto
            </button>
        </div>
    );
};

export default FormOfTravel;
