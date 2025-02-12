import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './etappenErgebnisse.css';

const EtappenErgebnisse = () => {

const [etappen, setEtappen] = useState([]);
const [loading, setLoading] = useState([]);




// WENN "SUCHEN" GEKLICKT WIRD => ALLE ANZEIGEN
useEffect(() => {
     // Beispiel mit axios GET-Anfrage
    axios.get('http://127.0.0.1:5000/allTrails')
        .then(response => {
            console.log(response.data);  // Die Daten aus der API anzeigen
            setEtappen(response.data);
            setLoading(false); //wenn Daten angekommen: hör auf zu laden
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Etappendaten:', error);  // Fehlermeldung
            setLoading(false);
        });
}, []);







    return (
        <div className='etappenListe'>

            {etappen.length == 0 ? (
                //Wenn Ladevorgang noch laufend
                <p>Deine möglichen Etappen werden geladen...</p>
            ) : (
                etappen.map((etappe) => (
                    <div key={etappe.id} className='einzelneEtappe'>
                    <div className='etappenName'>{etappe.name}</div>
                    <div className='etappenBildPlusDescription'></div>
                        <div className='etappenBild'>{etappe.image1}Bild</div>
                        <div className='etappenDescription'>
                            <div className='etappenStartpunkt'>{etappe.etappe_startpunkt}</div>
                            <div className='etappenEndpunkt'>{etappe.etappe_endpunkt}</div>
                            <div className='etappenDauer'>{etappe.dauer}</div>
                            <div className='etappenHoehenmeter'>{etappe.hoehenmeter}</div> 
                        </div>                         
                    </div>
                )))
            }
        </div>
            ) 


}








export default EtappenErgebnisse;