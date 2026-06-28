import React from 'react';
import './header.css';

const NavBtn = ({ icon, label }) => (
    <button className="headerNavBtn">
        <span className="headerNavIcon">{icon}</span>
        <span className="headerNavLabel">{label}</span>
    </button>
);

const Header = ({ onHome }) => {
    return (
        <div className="header">
            <div className="headerLeft">
                <div className="headerLogoBlock" onClick={onHome} style={{ cursor: 'pointer' }}>
                    <div className="teutotourenLogo">
                        heimattouren<span className="logoDomain">.de</span>
                    </div>
                    <div className="logoSlogan">Urlaub zuhause.</div>
                </div>
            </div>
            <div className="headerNav">
                <NavBtn label="Hilfe & Kontakt" icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                }/>
                <NavBtn label="Merkliste" icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                }/>
                <NavBtn label="Anmelden" icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                }/>
            </div>
        </div>
    );
};

export default Header;
