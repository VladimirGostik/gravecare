import React from 'react';
import { Link } from 'react-router-dom';


const Header = ({ onLoginClick, onRegisterClick }) => {
    return (
        <header className="w-full mx-auto flex justify-between items-center py-6 px-16 bg-customDark text-white">
            {/* Logo alebo názov aplikácie na ľavej strane */}
            <Link to="/" className="text-3xl font-bold hover:text-customPurpleLight transition duration-300">
                Gravecare
            </Link>
            {/* Tlačidlá napravo */}
            <div className="flex items-center gap-6">
                <button
                    className="px-6 py-2 rounded-full text-white bg-customPurple hover:bg-customPurpleLight transition duration-300"
                    onClick={onRegisterClick}
                >
                    Registrovať sa
                </button>
                <button
                    className="px-6 py-2 rounded-full text-white bg-customPurple hover:bg-customPurpleLight transition duration-300"
                    onClick={onLoginClick}
                >
                    Prihlásiť sa
                </button>
            </div>
        </header>
    );
};

export default Header;
