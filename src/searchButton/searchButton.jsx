import React from 'react';
import './searchButton.css';


const SearchButton = () => {
        // Define the function onSearchForAllRoutes
        const onSearchForAllRoutes = () => {
          console.log("Button clicked");
          // You can add the logic for the search functionality here
        };
    

    return ( 
        <button onClick={onSearchForAllRoutes} className="searchButton">Suchen</button>

    );
};


export default SearchButton;