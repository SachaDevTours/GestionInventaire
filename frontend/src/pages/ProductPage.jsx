import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductPage = () => {
    const location = useLocation();
    const product = location.state?.product; // Récupération des données envoyées via navigate()

    if (!product) {
        return (
            <div className="container text-center mt-5">
                <p>⚠️ Produit introuvable.</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-3 text-center">
                <div className="d-flex justify-content-center">
                    <img
                        src={product.url_image || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                        className="rounded"
                        alt={product.nom}
                        style={{ width: "300px", height: "300px", objectFit: "cover", marginTop: "10px" }}
                    />
                </div>

                <div className="card-body">
                    <h3 className="card-title">{product.nom}</h3>
                    <p className="card-text text-muted"><strong>MAC :</strong> {product.id_mac}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
