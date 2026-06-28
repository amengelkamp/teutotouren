import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './etappenErgebnisse.css';

const SCHWIERIGKEIT_FARBE = {
    leicht: '#4caf50',
    mittel: '#ff9800',
    schwer: '#f44336',
};

const EtappenErgebnisse = ({ filters }) => {
    const navigate = useNavigate();
    const [etappen, setEtappen] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const params = {};
        if (filters.dauerMax) params.dauer_max = filters.dauerMax;
        if (filters.schwierigkeit) params.schwierigkeit = filters.schwierigkeit;

        axios.get('/api/allTrails', { params })
            .then(async (response) => {
                let trails = response.data;

                const { userCoords, mode, anreisezeit } = filters;
                if (userCoords && anreisezeit) {
                    const maxMinutes = parseInt(anreisezeit);
                    const times = await Promise.all(
                        trails.map((t) =>
                            axios.get('/api/traveltime', {
                                params: { user_lat: userCoords.lat, user_lon: userCoords.lon, trail_id: t.id, mode: mode || 'bahn' }
                            }).then((r) => r.data.minutes).catch(() => null)
                        )
                    );
                    const allFailed = times.every((t) => t === null);
                    if (!allFailed) {
                        trails = trails
                            .map((t, i) => ({ ...t, anreiseMinuten: times[i] }))
                            .filter((t) => t.anreiseMinuten !== null && t.anreiseMinuten <= maxMinutes);
                    }
                }

                setEtappen(trails);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Fehler beim Abrufen der Etappendaten:', error);
                setLoading(false);
            });
    }, [filters]);

    const activeChips = [
        filters.dauerMax && `Max. ${filters.dauerMax} Std.`,
        filters.schwierigkeit && filters.schwierigkeit.charAt(0).toUpperCase() + filters.schwierigkeit.slice(1),
    ].filter(Boolean);

    if (loading) {
        return <div className="statusMsg">Etappen werden geladen...</div>;
    }

    return (
        <div>
            <div className="ergebnisHeader">
                <div className="ergebnisAnzahl">
                    {etappen.length} {etappen.length === 1 ? 'Etappe' : 'Etappen'} gefunden
                </div>
                {activeChips.length > 0 && (
                    <div className="activeChips">
                        {activeChips.map((chip) => (
                            <span key={chip} className="chip">{chip}</span>
                        ))}
                    </div>
                )}
            </div>

            {etappen.length === 0 ? (
                <div className="statusMsg">Keine Etappen für diese Filter gefunden.</div>
            ) : (
                <div className="etappenGrid">
                    {etappen.map((etappe) => (
                        <div key={etappe.id} className="etappenCard">
                            <div className="cardImageWrapper">
                                <img
                                    className="cardImage"
                                    src={etappe.image_path || '/images/placeholder.jpg'}
                                    alt={`Bild von ${etappe.name}`}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                {etappe.schwierigkeit && (
                                    <span
                                        className="cardBadge"
                                        style={{ backgroundColor: SCHWIERIGKEIT_FARBE[etappe.schwierigkeit] }}
                                    >
                                        {etappe.schwierigkeit}
                                    </span>
                                )}
                            </div>
                            <div className="cardBody">
                                <div className="cardTitle">{etappe.name}</div>
                                <div className="cardRoute">
                                    {etappe.etappe_startpunkt} → {etappe.etappe_endpunkt}
                                </div>
                                <div className="cardChips">
                                    <span className="cardChip">⏱ {etappe.dauer} Std.</span>
                                    <span className="cardChip">⛰ {etappe.hoehenmeter} m</span>
                                    <span className="cardChip">Etappe {etappe.etappennummer}</span>
                                    {etappe.anreiseMinuten != null && (
                                        <span className="cardChip">🚏 {etappe.anreiseMinuten} Min. Anreise</span>
                                    )}
                                </div>
                                {etappe.oepnv_hinweis && (
                                    <div className="cardOepnv">🚌 {etappe.oepnv_hinweis}</div>
                                )}
                                <button className="cardCta" onClick={() => navigate(`/etappe/${etappe.id}`)}>Details ansehen →</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EtappenErgebnisse;
