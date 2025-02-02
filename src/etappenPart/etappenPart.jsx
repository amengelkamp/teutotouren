import React, {useState} from 'react';
import './etappenPart.css';
import EinzelneEtappe from '../einzelneEtappe/einzelneEtappe';
import CalculationResults from '../calculationResults/calculationResults';

const EtappenPart = () => {






    return (
        <div className='etappenPart'>
           <CalculationResults />
            <EinzelneEtappe />
        </div>
    );
}









export default EtappenPart;