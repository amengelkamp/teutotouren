import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './etappeDetail.css';

// Leaflet default icon fix für Vite
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
L.Icon.Default.mergeOptions({ iconUrl: markerIcon, shadowUrl: markerShadow, iconRetinaUrl: markerIcon });

const SCHWIERIGKEIT_FARBE = { leicht: '#4caf50', mittel: '#ff9800', schwer: '#f44336' };

const EtappeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [etappe, setEtappe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gpxTrack, setGpxTrack] = useState(null);

    useEffect(() => {
        axios.get(`/api/trail/${id}`)
            .then((res) => { setEtappe(res.data); setLoading(false); })
            .catch(() => { setError('Etappe nicht gefunden.'); setLoading(false); });
    }, [id]);

    useEffect(() => {
        if (!etappe?.gpx_path) return;
        fetch(etappe.gpx_path)
            .then(r => r.text())
            .then(xml => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(xml, 'text/xml');
                const pts = Array.from(doc.querySelectorAll('trkpt')).map(pt => [
                    parseFloat(pt.getAttribute('lat')),
                    parseFloat(pt.getAttribute('lon')),
                ]);
                setGpxTrack(pts);
            })
            .catch(() => {});
    }, [etappe?.gpx_path]);

    if (loading) return <div className="detailPage"><div className="detailStatus">Wird geladen…</div></div>;
    if (error) return <div className="detailPage"><div className="detailStatus">{error}</div></div>;

    const hasCoords = etappe.start_lat && etappe.start_lon;

    return (
        <div className="detailPage">
            <button className="detailBack" onClick={() => navigate('/')}>
                ← Zurück
            </button>

            <div className="detailHero">
                <img
                    className="detailHeroImg"
                    src={etappe.image_path || '/images/placeholder.jpg'}
                    alt={etappe.name}
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="detailHeroOverlay" />
                <div className="detailHeroContent">
                    {etappe.schwierigkeit && (
                        <span className="detailBadge" style={{ backgroundColor: SCHWIERIGKEIT_FARBE[etappe.schwierigkeit] }}>
                            {etappe.schwierigkeit}
                        </span>
                    )}
                    <h1 className="detailTitle">{etappe.name}</h1>
                    <p className="detailRoute">{etappe.etappe_startpunkt} → {etappe.etappe_endpunkt}</p>
                </div>
            </div>

            <div className="detailBody">
                <div className="detailStats">
                    <div className="detailStat">
                        <span className="detailStatIcon">⏱</span>
                        <span className="detailStatVal">{etappe.dauer} Std.</span>
                        <span className="detailStatLabel">Dauer</span>
                    </div>
                    {etappe.hoehenmeter > 0 && (
                        <div className="detailStat">
                            <span className="detailStatIcon">⛰</span>
                            <span className="detailStatVal">{etappe.hoehenmeter} m</span>
                            <span className="detailStatLabel">Höhenmeter</span>
                        </div>
                    )}
                    {etappe.laenge_km && (
                        <div className="detailStat">
                            <span className="detailStatIcon">📏</span>
                            <span className="detailStatVal">{etappe.laenge_km} km</span>
                            <span className="detailStatLabel">Länge</span>
                        </div>
                    )}
                    {etappe.etappennummer > 0 && (
                        <div className="detailStat">
                            <span className="detailStatIcon">🗺</span>
                            <span className="detailStatVal">Etappe {etappe.etappennummer}</span>
                            <span className="detailStatLabel">{etappe.wanderweg}</span>
                        </div>
                    )}
                </div>

                {etappe.oepnv_hinweis && (
                    <div className="detailOepnv">
                        <span className="detailOepnvIcon">🚌</span>
                        <span>{etappe.oepnv_hinweis}</span>
                    </div>
                )}

                <div className="detailMapSection">
                    <h2 className="detailSectionTitle">Karte</h2>
                    {hasCoords ? (
                        <MapContainer
                            center={gpxTrack ? gpxTrack[0] : [etappe.start_lat, etappe.start_lon]}
                            zoom={gpxTrack ? 12 : 11}
                            className="detailMap"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[etappe.start_lat, etappe.start_lon]}>
                                <Popup>Start: {etappe.etappe_startpunkt}</Popup>
                            </Marker>
                            {gpxTrack && (
                                <Polyline positions={gpxTrack} color="#184D47" weight={3} opacity={0.85} />
                            )}
                        </MapContainer>
                    ) : (
                        <div className="detailMapPlaceholder">Kartenkoordinaten nicht verfügbar</div>
                    )}
                </div>

                <div className="detailGpxSection">
                    <h2 className="detailSectionTitle">GPX-Track</h2>
                    {etappe.gpx_path ? (
                        <a className="detailGpxBtn" href={etappe.gpx_path} download>
                            ⬇ GPX herunterladen
                        </a>
                    ) : (
                        <p className="detailGpxHint">GPX-Track noch nicht verfügbar.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EtappeDetail;
