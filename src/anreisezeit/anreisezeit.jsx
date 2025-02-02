import React, {useState} from 'react';
import './anreisezeit.css';

const Anreisezeit = () => {
    return (
        <div className="anreisezeit">
            <input 
                type="text"
                placeholder="Max. Anreisezeit in Stunden"
                className="anreiseZeitInput"
                />
            <button className="CounterUp">{"\u2191"}</button>
            <button className="CounterDown">{"\u2193"}</button>
        </div>
    )
}

export default Anreisezeit;
