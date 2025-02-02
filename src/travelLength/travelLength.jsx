import React, {useState} from 'react';
import './travelLength.css';

const TravelLength = () => {
    return (
        <div className="travelLength">
            <input 
                type="text"
                placeholder="Max. Reisezeit in Tagen"
                className="travelLengthInput"
                />
                  <button className="CounterUp">{"\u2191"}</button>
                  <button className="CounterDown">{"\u2193"}</button></div>
    )
}
export default TravelLength;