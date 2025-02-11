import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <header className="bg-primary text-white p-3 d-flex align-items-center shadow">
            {location.pathname !== "/" && (
                <button className="btn btn-light me-3" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Retour
                </button>
            )}

            <h1 className="m-0 flex-grow-1 text-center">Gestion Inventaire</h1>
        </header>
    );
};

export default Header;