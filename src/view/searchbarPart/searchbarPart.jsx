import React, {useState} from 'react';
import './searchbarPart.css';
import FindPosition from "../../position/findPosition";
import FormOfTravel from "../../formOfTravel/formOfTravel";
import TravelLength from "../../travelLength/travelLength";
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
                    <FindPosition />      
                    <FormOfTravel/>
                    <Anreisezeit />
                    <TravelLength />
                    <button className="searchButton">Suchen</button>
                </div>
                </div>
            )
    }

export default SearchbarPart;