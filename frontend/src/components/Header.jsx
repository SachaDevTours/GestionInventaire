import React from 'react';

const Header = () => {
    return (
        <header className="text-primary py-2 px-4 md:py-4 md:px-6 flex items-center shadow-lg fixed w-full top-0 z-50">
            <button
                className="flex items-center gap-2 transition-colors duration-200 p-2 -ml-2 md:p-0 md:ml-0"

                onClick={(e) => {
                    e.stopPropagation();
                    window.history.back()
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
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                <span className="hidden md:inline">Retour</span>
            </button>

            {/* Titre centré */}
            <h1 className="text-base md:text-lg font-semibold text-center flex-grow">
                Gestion Inventaire
            </h1>
        </header>
    );
};

export default Header;