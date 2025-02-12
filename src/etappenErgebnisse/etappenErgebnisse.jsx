import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './etappenErgebnisse.css';

const EtappenErgebnisse = () => {

const [etappen, setEtappen] = useState([]);


useEffect(() => {
     // Beispiel mit axios GET-Anfrage
    axios.get('http://127.0.0.1:5000/allTrails')
        .then(response => {
            console.log(response.data);  // Die Daten aus der API anzeigen
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Etappendaten:', error);  // Fehlerbehandlung
        });
}, []);


;



    return (
        <div className='einzelneEtappe'>einzelneEtappe
            <div className='etappenName'>etappenName</div>
            <div className='etappenBildPlusDescription'>etappenBildPlusDescription</div>
                <div className='etappenBild'>etappenBild</div>
                <div className='etappenDescription'>etappenDescription</div>
        </div>
    )




}










export default EtappenErgebnisse;