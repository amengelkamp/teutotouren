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
            <div className="locationService">Dein Standort</div>

            <div className="formOfTravel">formOfTravel</div>
            <div className="travelLength">travelLength</div>
            <div className="vacationLength">vacationLength</div>
            <div className="accommodation">accomodation</div>
            <button className="searchButton">Suchen</button>
          </div>
      </div>
        </div>
  )

  
}

export default App
