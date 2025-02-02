import React, {useState} from 'react';
import './findPosition.css';

const FindPosition = () => {
    return (
    <div className="positionService">
                  <input 
                  type="text"
                  placeholder="Dein Standort"
                  className="positionInput"
                  value={position} //hier fließt der State rein 
                  readOnly
                  />
                  <button className="positionSearch" onClick={setPosition}>📍</button>
              </div>
              
              
      const [position, setPosition] = useState(""); //State für Position
        
        const setPosition = () => {
          fetch('/api/position') // api for the get request
          .then(response => response.json())
          .then(data => console.log(data));
          

        }
  )
}  


export default FindPosition;
