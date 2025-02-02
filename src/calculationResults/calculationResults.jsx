import React, {useState} from 'react';
import './calculationResults.css';

const CalculationResults = () => {


    return (
        <div className='CalculationResultsPart'>
            <div className='gewaehltePositionAnzeige'>Dein Standort: XXX</div>
            <div className='gewaehlteReiseArtAnzeige'>Deine Reiseart ist: </div>
            <div className='berechneteAnreisezeitAnzeige'>Deine berechnete Anreisezeit: </div>
            <div className='gewaehlteEtappentage'>Anzahl der gewählten Etappentage: </div>
        </div>

    )
}


export default CalculationResults;