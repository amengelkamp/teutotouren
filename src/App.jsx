//import "./index.css"

// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState } from 'react'
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
            <p>searchbarWithFilters</p>
            <div className="locationService"></div>
              <p>locationService</p>
            <div className="formOfTravel"></div>
              <p>formOfTravel</p>
            <div className="travelLength"></div>
              <p>formOfTravel</p>
            <div className="vacationLength"></div>
              <p>travelLength</p>
            <div className="accommodation"></div>
              <p>accommodation</p>
            <button>Suchen</button>
          </div>
      </div>
        </div>
  )
}

export default App
