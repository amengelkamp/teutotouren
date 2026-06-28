import React, { useState } from 'react';
import './App.css';
import SearchbarPart from './view/searchbarPart/searchbarPart';
import RoutesPart from './view/routesPart/routesPart';
import Header from './view/header/header';

function App() {
    const [filters, setFilters] = useState({ dauerMax: '', schwierigkeit: '' });
    const [activeFilters, setActiveFilters] = useState(null);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearch = () => {
        setActiveFilters({ ...filters });
    };

    return (
        <div className="teutotourenWebsite">
            <Header />
            <SearchbarPart
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
            />
            {activeFilters !== null && <RoutesPart filters={activeFilters} />}
        </div>
    );
}

export default App;
