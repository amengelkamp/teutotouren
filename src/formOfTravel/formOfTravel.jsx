import React, { useState } from 'react';
import './formOfTravel.css';

const FormOfTravel = () => {
    const [selected, setSelected] = useState('bahn');

    return (
        <div className="segmentedControl">
            <button
                className={`segmentBtn ${selected === 'bahn' ? 'aktiv' : ''}`}
                onClick={() => setSelected('bahn')}
            >
                🚆 Bahn
            </button>
            <button
                className={`segmentBtn ${selected === 'auto' ? 'aktiv' : ''}`}
                onClick={() => setSelected('auto')}
            >
                🚗 Auto
            </button>
        </div>
    );
};

export default FormOfTravel;
