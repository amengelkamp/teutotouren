import React from 'react';
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <div className="headerLogoBlock">
                    <div className="teutotourenLogo">
                        teutotouren<span className="logoDomain">.de</span>
                    </div>
                    <div className="logoSlogan">Wir planen. Du wanderst.</div>
                </div>
            </div>
        </div>
    );
};

export default Header;
