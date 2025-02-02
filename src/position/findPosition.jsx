import React, {useState} from 'react';
import './findPosition.css';

const FindPosition = () => {
  const [position, setPosition] = useState(""); //State für Position
        
  const fetchPosition = () => {
    fetch('/api/position') // api for the get request
      .then(response => response.json())
      .then(data => console.log(data));
    }
    
    return (
    <div className="positionService">
      <div className="positionField" >
        <input 
        type="text"
        placeholder="Dein Standort"
        className="positionInput"
        value={position} //hier fließt der State rein 
        readOnly
        />
        <button className="positionSearch" onClick={fetchPosition}>📍</button>
      </div>
    </div>
    );
}  


export default FindPosition;
