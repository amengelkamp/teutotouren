//import "./index.css"

// import reactLogo from './assets/react.svg'
import React from 'react';
import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react'
import './App.css'
import SearchbarPart from './view/searchbarPart/searchbarPart'
import RoutesPart from './view/routesPart/routesPart';
import CalculationResults from './calculationResults/calculationResults';
import Header from './view/header/header';

function App() {
  return (
    <div className="teutotourenWebsite">
      <Header/>
      <SearchbarPart/>
      <CalculationResults />
    </div>
  );
}

export default App;


