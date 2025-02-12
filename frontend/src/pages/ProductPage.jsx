import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const ProductPage = () => {
    const location = useLocation();
    const product = location.state?.product;

    if (!product) {
        return <div className="container mx-auto mt-10 text-center text-red-500 text-xl">❌ Produit non trouvé.</div>;
    }

    return (
        <div className="container mx-auto mt-20 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
                <h2 className="text-center text-blue-600 text-2xl font-semibold">
                    {product.nom}
                </h2>

                <div className="flex justify-center my-4">
                    <img
                        src={product.image || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                        className="rounded-lg shadow-md h-40 w-40 object-cover"
                        alt={product.nom}
                    />
                </div>

                <p className="text-center text-lg text-gray-700 font-medium">
                    <strong>Adresse MAC :</strong> {product.id_mac}
                </p>
            </div>
        </div>
    );
};

export default ProductPage;
