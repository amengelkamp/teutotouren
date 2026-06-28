import React from 'react';
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <div className="teutotourenLogo">
                    teutotouren<span className="logoDomain">.de</span>
                </div>
            </div>
            <div className="headerTagline">Wandern im Teutoburger Wald</div>
        </div>
    );
};

export default Header;
