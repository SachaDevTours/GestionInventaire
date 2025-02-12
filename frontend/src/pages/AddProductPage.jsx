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
        <div className="container mx-auto mt-20 p-4">
            <div className="bg-background-secondary rounded-lg p-6 max-w-lg mx-auto">
                <h2 className="text-center text-accent text-2xl font-semibold mb-6">
                    Ajouter un produit
                </h2>

                {error && (
                    <div className="text-red-500 bg-background-accent/10 p-3 rounded-md text-center mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-primary font-medium mb-2">
                            Nom du produit
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full p-3 bg-background-secondary border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-primary font-medium mb-2">
                            Adresse MAC
                        </label>
                        <input
                            type="text"
                            name="macAddress"
                            value={macAddress}
                            onChange={(e) => setMacAddress(e.target.value)}
                            className="w-full p-3 bg-background-secondary border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-primary font-medium mb-2">
                            Image du produit (optionnel)
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-3 bg-background-secondary border border-accent/20 rounded-lg cursor-pointer text-primary file:bg-background-accent file:text-secondary file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:cursor-pointer file:hover:bg-background-accent/80 file:transition-colors"
                        />
                        {preview && (
                            <div className="mt-4 flex justify-center">
                                <img
                                    src={preview}
                                    alt="Aperçu"
                                    className="rounded-lg h-40 w-40 object-cover border border-accent/20"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-background-accent text-secondary px-6 py-3 rounded-lg hover:bg-background-accent/80 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;
