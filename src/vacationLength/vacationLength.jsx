import React, {useState} from 'react';
import './vacationLength.css';

const VacationLength = () => {
        return (
            <div className="vacationLength">
                <input 
                    type="text"
                    placeholder="Reisedauer in Tagen"
                    className="locationInput"
                    />
                <button className="CounterUp">{"\u2191"}</button>
                <button className="CounterDown">{"\u2193"}</button> 
            </div>
        )
}        

export default VacationLength;