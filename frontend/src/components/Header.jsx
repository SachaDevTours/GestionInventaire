import React from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="text-primary py-2 px-4 md:py-4 md:px-6 flex items-center shadow-lg fixed w-full top-0 z-50">
            <button
                className="flex items-center gap-2 transition-colors duration-200 p-2 -ml-2 md:p-0 md:ml-0 hover:text-accent"
                onClick={(e) => {
                    e.stopPropagation();
                    navigate('/');
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 md:w-5 md:h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
                <span className="hidden md:inline">Accueil</span>
            </button>
            <h1 className="text-base md:text-lg font-semibold text-center flex-grow">
                Gestion Inventaire
            </h1>
        </header>
    );
};

export default Header;