import React from 'react';
import './regionShowcase.css';

const REGIONEN = [
    { value: 'Teutoburger Wald', label: 'Teutoburger Wald', sub: '81 Wege', color: '#2d5a27' },
    { value: 'Schwarzwald',      label: 'Schwarzwald',      sub: 'Demnächst', color: '#1a3d2e' },
    { value: 'Eifel',            label: 'Eifel',            sub: 'Demnächst', color: '#2c4a6e' },
    { value: 'Harz',             label: 'Harz',             sub: 'Demnächst', color: '#4a4a6e' },
    { value: 'Sauerland',        label: 'Sauerland',        sub: 'Demnächst', color: '#2e5c4a' },
    { value: 'Rheinsteig',       label: 'Rheinsteig',       sub: 'Demnächst', color: '#1e4a5c' },
];

const RegionShowcase = ({ onRegionSelect }) => {
    return (
        <section className="regionShowcase">
            <div className="regionShowcaseHeader">
                <h2 className="regionShowcaseTitle">Wanderregionen entdecken</h2>
                <p className="regionShowcaseSubtitle">Offizielle Wege. Ausgeschildert. In deiner Nähe.</p>
            </div>
            <div className="regionGrid">
                {REGIONEN.map((r) => (
                    <button
                        key={r.value}
                        className="regionCard"
                        onClick={() => onRegionSelect(r.value)}
                    >
                        <div className="regionCardPlaceholder" style={{ background: r.color }} />
                        <div className="regionCardContent">
                            <span className="regionCardLabel">{r.label}</span>
                            <span className="regionCardSub">{r.sub}</span>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default RegionShowcase;
