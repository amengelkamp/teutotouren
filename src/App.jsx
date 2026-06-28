import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import SearchbarPart from './view/searchbarPart/searchbarPart';
import RoutesPart from './view/routesPart/routesPart';
import Header from './view/header/header';
import EtappeDetail from './etappeDetail/etappeDetail';
import RegionShowcase from './regionShowcase/regionShowcase';

function Startseite() {
    const [filters, setFilters] = useState({ dauerMax: '', schwierigkeit: '', mode: 'auto', anreisezeit: '', region: '' });
    const [activeFilters, setActiveFilters] = useState(null);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearch = (userCoords) => {
        setActiveFilters({ ...filters, userCoords });
    };

    const handleRegionSelect = (region) => {
        const updated = { ...filters, region };
        setFilters(updated);
        setActiveFilters({ ...updated, userCoords: null });
    };

    return (
        <>
            <SearchbarPart
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
            />
            {activeFilters === null && (
                <RegionShowcase onRegionSelect={handleRegionSelect} />
            )}
            {activeFilters !== null && <RoutesPart filters={activeFilters} />}
        </>
    );
}

function AppInner() {
    const [startseiteKey, setStartseiteKey] = useState(0);
    const navigate = useNavigate();

    const handleHome = () => {
        setStartseiteKey((k) => k + 1);
        navigate('/');
    };

    return (
        <div className="teutotourenWebsite">
            <Header onHome={handleHome} />
            <Routes>
                <Route path="/" element={<Startseite key={startseiteKey} />} />
                <Route path="/etappe/:id" element={<EtappeDetail />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppInner />
        </BrowserRouter>
    );
}

export default App;
