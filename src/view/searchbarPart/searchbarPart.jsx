import React, { useState } from 'react';
import './searchbarPart.css';
import FindPosition from '../../position/findPosition';
import FormOfTravel from '../../formOfTravel/formOfTravel';
import Anreisezeit from '../../anreisezeit/anreisezeit';
import DauerFilter from '../../dauerFilter/dauerFilter';
import SchwierigkeitFilter from '../../schwierigkeitFilter/schwierigkeitFilter';
import RegionFilter from '../../regionFilter/regionFilter';

const SearchbarPart = ({ filters, onFilterChange, onSearch }) => {
    const [userCoords, setUserCoords] = useState(null);

    const handleSearch = () => {
        onSearch(userCoords);
    };

    return (
        <div className="heroOuter">
            <div className="heroSection">
                <div className="heroImageClip">
                    <img
                        className="heroImage"
                        src="./wandernImWald01_header.jpg"
                        alt="Wandern im Teutoburger Wald"
                    />
                    <div className="heroOverlay" />
                </div>
                <div className="heroContent">
                    <h1 className="heroHeadline">Urlaub zuhause —<br />dein nächster Wandertag.</h1>
                    <p className="heroSubtitle">Offizielle Wege. Ausgeschildert. In deiner Nähe.<br />Handy wegstecken, Kopf freibekommen.</p>
                </div>
                <div className="searchCard">
                    <div className="searchRow">
                        <div className="searchField wide">
                            <span className="searchFieldLabel">Startpunkt</span>
                            <FindPosition onCoordsChange={(lat, lon) => setUserCoords({ lat, lon })} />
                        </div>
                        <div className="searchField">
                            <span className="searchFieldLabel">Reiseart</span>
                            <FormOfTravel
                                value={filters.mode}
                                onChange={(val) => onFilterChange('mode', val)}
                            />
                        </div>
                        <div className="searchField">
                            <span className="searchFieldLabel">Max. Anreisezeit</span>
                            <Anreisezeit
                                value={filters.anreisezeit}
                                onChange={(val) => onFilterChange('anreisezeit', val)}
                            />
                        </div>
                        <button onClick={handleSearch} className="searchBtn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                            Suchen
                        </button>
                    </div>
                    <div className="searchDivider" />
                    <div className="filterRow">
                        <div className="filterField">
                            <span className="filterLabel">Max. Etappendauer</span>
                            <DauerFilter
                                value={filters.dauerMax}
                                onChange={(val) => onFilterChange('dauerMax', val)}
                            />
                        </div>
                        <div className="filterField">
                            <span className="filterLabel">Schwierigkeit</span>
                            <SchwierigkeitFilter
                                value={filters.schwierigkeit}
                                onChange={(val) => onFilterChange('schwierigkeit', val)}
                            />
                        </div>
                        <div className="filterField">
                            <span className="filterLabel">Region</span>
                            <RegionFilter
                                value={filters.region}
                                onChange={(val) => onFilterChange('region', val)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchbarPart;
