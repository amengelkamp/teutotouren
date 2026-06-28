import React from 'react';
import './routesPart.css';
import EtappenPart from '../../etappenPart/etappenPart';

const RoutesPart = ({ filters }) => {
    return (
        <div className="routesPart">
            <div className="routeResults">
                <EtappenPart filters={filters} />
            </div>
        </div>
    );
};

export default RoutesPart;
