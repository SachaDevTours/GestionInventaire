import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { getProducts } from "../services/api";
import { downloadQRCodeSVG } from "../utils/qrCodeUtils";
import TableSkeleton from "../components/skeletons/TableSkeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const InventoryPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                //setTimeout(() => {
                    if (isMounted) {
                        setProducts(data);
                        setIsLoading(false);
                    }
                //}, 5000)
            } catch (err) {
                if (isMounted) {
                    setError(`Erreur lors du chargement des donnéees : ${err.message}`);
                    setIsLoading(false);
                }
            }
        };

        (async () => { await fetchProducts(); })();

        return () => { isMounted = false; };
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 mt-20">
                <TableSkeleton rows={4} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto mt-20 p-4">
                <ErrorMessage error={error} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 mt-20">
            <div className="overflow-x-auto rounded-lg">
                <table className="w-full border-separate border-spacing-y-2">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-primary bg-background-secondary rounded-l-lg">
                            Nom du Produit
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-primary bg-background-secondary">
                            Adresse MAC
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-primary bg-background-secondary rounded-r-lg">
                            QR Code
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id_mac}>
                            <td
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/product/${product.id_mac}`);
                                }
                                }
                                className="px-6 py-4 text-sm font-medium cursor-pointer text-accent bg-background-secondary rounded-l-lg"
                            >
                                {product.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-primary bg-background-secondary">
                                {product.id_mac}
                            </td>
                            <td className="px-6 py-4 text-center bg-background-secondary rounded-r-lg">
                                <button
                                    className="inline-flex items-center px-3 py-1 border border-accent text-accent rounded-md cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        downloadQRCodeSVG(
                                            `http://localhost:5173/product?id=${product.id_mac}`,
                                            `QRCode_${product.name}`
                                        );
                                    }}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                    {products.length === 0 && (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center bg-background-accent text-secondary rounded-lg">
                                🔍 Aucun produit trouvé.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <motion.button
                initial={{scale: 0.6, y: 50, opacity: 0}}
                animate={{scale: 1, y: 0, opacity: 1}}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 0.8
                }}
                whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    transition: {
                        duration: 0.3,
                        ease: "easeOut"
                    }
                }}
                whileTap={{
                    scale: 0.97,
                    transition: {
                        duration: 0.1
                    }
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = '/add-product'
                }}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-background-accent text-secondary px-15 py-3 rounded-full shadow-lg flex items-center gap-2 cursor-pointer"
            >
                <motion.svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    whileHover={{rotate: 180}}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut"
                    }}
                >
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                </motion.svg>
                Ajouter
            </motion.button>
        </div>
    );
};

export default InventoryPage;
