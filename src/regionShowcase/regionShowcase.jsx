import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './regionShowcase.css';

const REGIONEN = [
    { value: 'Teutoburger Wald', label: 'Teutoburger Wald', color: '#2d5a27', image: '/images/region_teutoburger_wald.jpg' },
    { value: 'Schwarzwald',      label: 'Schwarzwald',      color: '#1a3d2e', image: '/images/region_schwarzwald.jpg' },
    { value: 'Eifel',            label: 'Eifel',            color: '#2c4a6e', image: '/images/region_eifel.jpg' },
    { value: 'Harz',             label: 'Harz',             color: '#4a4a6e', image: '/images/region_harz.jpg' },
    { value: 'Sauerland',        label: 'Sauerland',        color: '#2e5c4a', image: '/images/region_sauerland.jpg' },
    { value: 'Rheinsteig',       label: 'Rheinsteig',       color: '#1e4a5c', image: null },
];

const RegionShowcase = ({ onRegionSelect }) => {
    const [counts, setCounts] = useState({});

    useEffect(() => {
        axios.get('/api/regionStats').then(res => setCounts(res.data)).catch(() => {});
    }, []);

    return (
        <section className="regionShowcase">
            <div className="regionShowcaseHeader">
                <h2 className="regionShowcaseTitle">Wanderregionen entdecken</h2>
            </div>
            <div className="regionGrid">
                {REGIONEN.map((r) => {
                    const count = counts[r.value];
                    const sub = count > 0 ? `${count} Wege` : 'Demnächst';
                    const clickable = count > 0;
                    return (
                        <button
                            key={r.value}
                            className={`regionCard${clickable ? '' : ' regionCardDisabled'}`}
                            onClick={() => clickable && onRegionSelect(r.value)}
                        >
                            {r.image
                                ? <img className="regionCardPlaceholder" src={r.image} alt={r.label} style={{ objectFit: 'cover' }} />
                                : <div className="regionCardPlaceholder" style={{ background: r.color }} />
                            }
                            <div className="regionCardContent">
                                <span className="regionCardLabel">{r.label}</span>
                                <span className="regionCardSub">{sub}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default RegionShowcase;
