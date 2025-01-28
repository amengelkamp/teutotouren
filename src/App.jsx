//import "./index.css"

// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [location, setLocation] = useState(""); //State für den Standort 
  const [error, setError] = useState(""); //Abfangen von Fehlern wenn diese eintreten

  const handleGetLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const{ latitute, longitude } = position.coords; 
            const locationString = `Lat: ${latitute}, Long: ${longitude}`; 
            setLocation(locationString); //Standort wird in den State geschrieben 
            setError(null); //Fehler wird zurückgesetzt wenn zuvor einer aufgetreten ist  
          },
        (err) => {
          console.error(err);
          setError("Standort konnte nicht ermittelt werden");
        }
        );
      } else {
          setError("Geolocation konnte nicht ermittelt werden");
      }
  };







  return (
    <div className="teutotourenWebsite">
      <div className="header">
        <div className="logo">Logo</div>
      </div>
      <div className="searchbarPart">
          <img 
            className="wandernImWald01" 
            src="./wandernImWald01.jpg" 
            alt="Wandern im Wald 01" 
          />
          <div className="searchbarWithFilters">
            <div className="locationService">
                <input 
                type="text"
                placeholder="Dein Standort"
                className="locationInput"
                value={location} //hier fließt der State rein 
                readOnly
                />
                <button className="locationSearch" onClick={handleGetLocation}>📍</button>
              </div>
              {error && <p style={{ color: "red"}}>{error}</p>}
        
              
            <div className="formOfTravel">
              <button className="publicTransportation">🚆</button>
              <button className="byCar">🚗</button>  
            </div>
            <div className="travelLength">
            <input 
                type="text"
                placeholder="Max. Anreisezeit"
                className="locationInput"
                /></div>
            <div className="vacationLength">
              <input 
                  type="text"
                  placeholder="Reisedauer in Tagen"
                  className="locationInput"
                  /></div>
            <div className="accommodation">
              <button className="hotel">🏨</button>
              <button className="camping">⛺</button>  
            </div>
            <button className="searchButton">Suchen</button>
          </div>
          </div>
          </div>
   
  )

  
}

export default App
