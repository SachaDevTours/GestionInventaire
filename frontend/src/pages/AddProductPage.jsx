import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/api";
import { motion } from "framer-motion";

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
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
                <h2 className="text-center text-blue-600 text-2xl font-semibold mb-6">
                    Ajouter un produit
                </h2>

                {error && (
                    <div className="text-red-500 bg-red-100 p-3 rounded-md text-center mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Nom du produit
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Adresse MAC
                        </label>
                        <input
                            type="text"
                            name="macAddress"
                            value={macAddress}
                            onChange={(e) => setMacAddress(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Image du produit (optionnel)
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        {preview && (
                            <div className="mt-4 flex justify-center">
                                <img
                                    src={preview}
                                    alt="Aperçu"
                                    className="rounded-lg shadow-md h-40 w-40 object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;
