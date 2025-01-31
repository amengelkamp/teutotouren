//import "./index.css"

// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react'
import './App.css'

function App() {

  //STANDORTERMITTLUNG - noch auslagern in eigenes file und dann hier referenzieren

  const [location, setLocation] = useState(""); //State für den Standort 
  const [error, setError] = useState(""); //Abfangen von Fehlern wenn diese eintreten

  const handleGetLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const{ latitude, longitude } = position.coords; 
            console.log(position.coords);
            const locationString = `Lat: ${latitude}, Long: ${longitude}`; 
            setLocation(locationString); //Standort wird in den State geschrieben 
            setError(null); //Fehler wird zurückgesetzt wenn zuvor einer aufgetreten ist 
            setError("hallo") 
          },
        (err) => {
          console.error(err);
          setError("Standort konnte nicht ermittelt werden");
          alert("Dein Standort konnte nicht ermittelt werden");

        }
        );
      } else {
          setError("Geolocation konnte nicht ermittelt werden");

      }
  };


//COUNTER ANREISEZEIT 

const [hours, setHours] = useState(""); //State für Ankunftszeit in Stunden 

const setAnreiseZeit = () => {

}




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
             
        
              
            <div className="formOfTravel">
              <button className="publicTransportation">🚆</button>
              <button className="byCar">🚗</button>  
            </div>
            <div className="travelLength">
            <input 
                type="text"
                placeholder="Max. Anreisezeit in Stunden"
                className="locationInput"
                />
                  <button className="CounterUp">{"\u2191"}</button>
                  <button className="CounterDown">{"\u2193"}</button></div>
            <div className="vacationLength">
              <input 
                  type="text"
                  placeholder="Reisedauer in Tagen"
                  className="locationInput"
                  />
                <button className="CounterUp">{"\u2191"}</button>
                <button className="CounterDown">{"\u2193"}</button> 
                  </div>
            <button className="searchButton">Suchen</button>
          </div>
          </div>
          </div>
   
  )

  
}

export default App
