import React from 'react';

const Header = ({ onLoginClick, onRegisterClick }) => {
    return (
        <header className="max-w-screen-lg flex justify-between items-center py-6 px-8 bg-customDark text-white">
            <h1 className="text-2xl font-bold">Gravecare</h1>
            <div className="flex gap-6">
                <button className="px-8 py-3 rounded-full text-white bg-customPurple" onClick={onRegisterClick}>
                    Registrovať sa
                </button>
                <button className="px-8 py-3 rounded-full text-white bg-customPurple" onClick={onLoginClick}>
                    Prihlásiť sa
                </button>
            </div>
        </header>
    );
};

export default Header;
