import React from 'react';
import './searchbarPart.css';
import FindPosition from '../../position/findPosition';
import FormOfTravel from '../../formOfTravel/formOfTravel';
import Anreisezeit from '../../anreisezeit/anreisezeit';
import DauerFilter from '../../dauerFilter/dauerFilter';
import SchwierigkeitFilter from '../../schwierigkeitFilter/schwierigkeitFilter';

const SearchbarPart = ({ filters, onFilterChange, onSearch }) => {
    return (
        <div className="heroSection">
            <img
                className="heroImage"
                src="./wandernImWald01.jpg"
                alt="Wandern im Teutoburger Wald"
            />
            <div className="heroOverlay" />
            <div className="heroContent">
                <h1 className="heroHeadline">Wandern im Teutoburger Wald — passend zu dir.</h1>
                <p className="heroSubtitle">Nur offizielle Wege. Ausgeschildert. Handy wegstecken, Kopf freibekommen.</p>
                <div className="searchCard">
                    <div className="searchRow">
                        <div className="searchField wide">
                            <span className="searchFieldLabel">Startpunkt</span>
                            <FindPosition />
                        </div>
                        <div className="searchField">
                            <span className="searchFieldLabel">Reiseart</span>
                            <FormOfTravel />
                        </div>
                        <div className="searchField">
                            <span className="searchFieldLabel">Max. Anreisezeit</span>
                            <Anreisezeit />
                        </div>
                        <button onClick={onSearch} className="searchBtn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                            </svg>
                            Suchen
                        </button>
                    </div>
                    <div className="filterRow">
                        <div className="filterField">
                            <span className="searchFieldLabel">Max. Etappendauer</span>
                            <DauerFilter
                                value={filters.dauerMax}
                                onChange={(val) => onFilterChange('dauerMax', val)}
                            />
                        </div>
                        <div className="filterField">
                            <span className="searchFieldLabel">Schwierigkeit</span>
                            <SchwierigkeitFilter
                                value={filters.schwierigkeit}
                                onChange={(val) => onFilterChange('schwierigkeit', val)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchbarPart;
