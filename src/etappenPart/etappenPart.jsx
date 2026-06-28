import React from 'react';
import './etappenPart.css';
import EtappenErgebnisse from '../etappenErgebnisse/etappenErgebnisse';

const EtappenPart = ({ filters }) => {
    return (
        <div className="etappenPart">
            <EtappenErgebnisse filters={filters} />
        </div>
    );
};

export default EtappenPart;
