//import "./index.css"

// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react'
import './App.css'

function App() {

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
                />
                <button className="locationSearch">📍</button>
              </div>
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
