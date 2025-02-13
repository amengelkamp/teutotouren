import React, {useState} from 'react';
import './findPosition.css';

const FindPosition = () => {
  const [position, setPosition] = useState(""); //State für Position
        
  const fetchPosition = () => {
    //Prüfen, ob Browser die Standortermittlung unterstützt
    if ("geolocation" in navigator) { 
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setPosition(`Lat: ${lat}, Lon: ${lon}`);
          console.log({lat}, {lon})
        },
        (error) => {
          setPosition(`Fehler: ${error.message}`);
        }
      );
    } 
  };
    
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
