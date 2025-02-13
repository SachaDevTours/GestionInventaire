import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProduct } from "../services/api";

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(id)

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                if (!id) {
                    throw new Error("ID du produit manquant");
                }

                const productData = await getProduct(id);

                if (isMounted) {
                    if (productData) {
                        setProduct(productData);
                    } else {
                        setError("Produit non trouvé");
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError("Erreur lors du chargement du produit");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (isLoading) {
        return (
            <div className="container mx-auto mt-20 text-center text-accent">
                Chargement...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto mt-10 text-center text-red-500 text-xl">
                ❌ {error || "Produit non trouvé."}
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-20 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-background-secondary shadow-lg rounded-lg p-6 max-w-lg mx-auto"
            >
                <h2 className="text-center text-accent text-2xl font-semibold">
                    {product.name}
                </h2>

                <div className="flex justify-center my-6">
                    <motion.img
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        src={product.image || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                        className="rounded-lg h-40 w-40 object-cover border border-accent/20 hover:scale-105 transition-transform duration-300"
                        alt={product.name}
                    />
                </div>

                <div className="mt-6 p-4 bg-background-accent/5 rounded-lg">
                    <p className="text-center text-lg text-primary">
                        <span className="font-medium text-accent">Adresse MAC : </span>
                        <span className="font-mono">{product.id_mac}</span>
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="mt-6 w-full bg-background-accent text-secondary px-6 py-3 rounded-lg shadow-lg hover:bg-background-accent/80 hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                    Retour à l'inventaire
                </motion.button>
            </motion.div>
        </div>
    );
};

export default ProductPage;