import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/api";

const AddProductPage = () => {
    const navigate = useNavigate();

    const [productName, setProductName] = useState("");
    const [macAddress, setMacAddress] = useState("");

    const [imageFile, setImageFile] = useState(null);

    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName || !macAddress) {
            setError("Le nom du produit et l'adresse MAC sont obligatoires.");
            return;
        }

        const response = await addProduct(productName, macAddress, imageFile);

        if (response.success) {
            navigate("/");
        } else {
            setError(response.message || "Erreur lors de l'ajout du produit.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">➕ Ajouter un produit</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="p-3 shadow rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Nom du Produit :</label>
                    <input
                        type="text"
                        className="form-control"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Adresse MAC :</label>
                    <input
                        type="text"
                        className="form-control"
                        value={macAddress}
                        onChange={(e) => setMacAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image du produit (optionnel) :</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                </div>

                {preview && (
                    <div className="mb-3 text-center">
                        <img src={preview} alt="Aperçu du produit" className="img-thumbnail" style={{ maxWidth: "200px" }} />
                    </div>
                )}

                <button type="submit" className="btn btn-success w-100">✅ Ajouter le produit</button>
            </form>
        </div>
    );
};

export default AddProductPage;
