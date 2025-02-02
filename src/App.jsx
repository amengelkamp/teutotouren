//import "./index.css"

// import reactLogo from './assets/react.svg'
import React from 'react';
import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react'
import './App.css'
import SearchbarPart from './view/searchbarPart/searchbarPart'


function App() {
  return (
    <div className="teutotourenWebsite">
      <div className="header">
        <div className="logo">Logo</div>
      </div>
      <SearchbarPart/>
    </div>
  );
}

export default App;


