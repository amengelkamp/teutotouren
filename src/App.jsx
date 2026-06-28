import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchbarPart from './view/searchbarPart/searchbarPart';
import RoutesPart from './view/routesPart/routesPart';
import Header from './view/header/header';
import EtappeDetail from './etappeDetail/etappeDetail';

function Startseite() {
    const [filters, setFilters] = useState({ dauerMax: '', schwierigkeit: '', mode: 'bahn', anreisezeit: '', region: '' });
    const [activeFilters, setActiveFilters] = useState(null);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearch = (userCoords) => {
        setActiveFilters({ ...filters, userCoords });
    };

    return (
        <>
            <SearchbarPart
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
            />
            {activeFilters !== null && <RoutesPart filters={activeFilters} />}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="teutotourenWebsite">
                <Header />
                <Routes>
                    <Route path="/" element={<Startseite />} />
                    <Route path="/etappe/:id" element={<EtappeDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
