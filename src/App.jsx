import React, { useState } from 'react';
import './App.css';
import SearchbarPart from './view/searchbarPart/searchbarPart';
import RoutesPart from './view/routesPart/routesPart';
import CalculationResults from './calculationResults/calculationResults';
import Header from './view/header/header';
import EtappenErgebnisse from './etappenErgebnisse/etappenErgebnisse';

function App() {
  const [showContent, setShowContent] = useState(false); // Umbenennung des States in showContent

  const handleSearchForAllRoutes = () => {
    setShowContent(true); // Setzt den State, um die Inhalte anzuzeigen
  };

  return (
    <div className="teutotourenWebsite">
      <Header />
      <SearchbarPart onSearchForAllRoutes={handleSearchForAllRoutes} /> {/* Die Funktion wird hier übergeben */}
      
      {showContent && (
        <>
          <CalculationResults />
          <RoutesPart />        
        </>
      )}
      

    </div>
  );
}

export default App;
