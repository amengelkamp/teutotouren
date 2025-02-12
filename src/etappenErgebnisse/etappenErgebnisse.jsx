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
                <div className='LoadingAnnouncement'>Die Etappen werden geladen... </div>
            ) : (
                etappen.map((etappe) => (
                    <div key={etappe.id} className='einzelneEtappe'>
                        <div className='etappenName'>{etappe.name}</div>
                        <div className='etappenBildPlusDescription'>
                            <img className='etappenBild' src={`data:image/jpeg;base64,${etappe.image1}`} alt={'Bild von ${etappe.name}'}/>
                            <div className='etappenDescription'>
                                <div className='etappenStartpunkt'>Etappenstart: {etappe.etappe_startpunkt}</div>
                                <div className='etappenEndpunkt'>Etappenende: {etappe.etappe_endpunkt}</div>
                                <div className='etappenDauer'>Dauer der Etappe: {etappe.dauer} Stunden</div>
                                <div className='etappenHoehenmeter'>Höhenmeter gesamt: {etappe.hoehenmeter} Meter</div> 
                            </div>
                            </div>                          
                    </div>
                )))
            }
        </div>
            ) 


}








export default EtappenErgebnisse;