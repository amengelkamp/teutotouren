import React from 'react';
import './searchBarPart.css';
import FindPosition from "../../position/findPosition";
import FormOfTravel from "../../formOfTravel/formOfTravel";
import TravelLength from "../../travelLength/travelLength";
import VacationLength from "../../vacationLength/vacationLength";
import Anreisezeit from "../../anreisezeit/anreisezeit";

const SearchbarPart = () => {
    return (
        <div className="searchbarPart">
                <img 
                    className="wandernImWald01" 
                    src="./wandernImWald01.jpg" 
                    alt="Wandern im Wald 01" 
                />
                <div className="searchbarWithFilters">
                    <Anreisezeit />
                    <FindPosition />      
                    <FormOfTravel/>
                    <TravelLength />
                    <VacationLength/>
                    <button className="searchButton">Suchen</button>
                </div>
                </div>
        </div>
            )
    }

export default SearchbarPart;