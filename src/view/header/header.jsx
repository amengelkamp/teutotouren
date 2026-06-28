import React from 'react';
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <svg className="headerIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 20L9 8L13 14L16 10L21 20H3Z" fill="white" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                    <circle cx="17" cy="5" r="2" fill="#a8d8d0"/>
                </svg>
                <div className="teutotourenLogo">Teutotouren</div>
            </div>
            <div className="headerTagline">Hermannsweg Etappen entdecken</div>
        </div>
    );
};

export default Header;
