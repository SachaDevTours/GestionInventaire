import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../services/api";
import { FaDownload, FaPlus } from "react-icons/fa";
import { downloadQRCodeSVG } from "../utils/qrCodeUtils";

import { motion } from "framer-motion";

const InventoryPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await getProducts();
            setProducts(data);
        })();
    }, []);

    return (
        <div className="container mx-auto px-4 mt-20">
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full">
                    <thead className="bg-blue-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nom du Produit</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Adresse MAC</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">QR Code</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr
                                key={product.id_mac}
                                className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                            >
                                <td
                                    onClick={() => navigate("/product", {state: {product}})}
                                    className="px-6 py-4 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800"
                                >
                                    {product.nom}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.id_mac}</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={(e) => navigate("/product", {state: {product}})}
                                        className="inline-flex items-center px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-150"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                                🔍 Aucun produit trouvé.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Bouton d'ajout flottant */}
            <button
                onClick={() => window.location.href = '/add-product'}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-150 flex items-center gap-2"
            >
                <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Ajouter
            </button>
        </div>
    );
};

export default InventoryPage;
