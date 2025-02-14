import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import { getProduct } from "../services/api";
import ProductSkeleton from "../components/skeletons/ProductSkeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(id)

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                if (!id) {
                    setError("ID du produit manquant");
                    return;
                }

                const data = await getProduct(id);

                //setTimeout(() => {
                if (isMounted) {
                    data ? setProduct(data) : setError("Produit non trouvé");
                    setIsLoading(false);
                }
                //}, 5000)
            } catch (err) {
                if (isMounted) {
                    setError("Erreur lors du chargement du produit");
                    setIsLoading(false);
                }
            }
        })();

        return () => { isMounted = false; };
    }, [id]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 mt-20">
                <ProductSkeleton />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto mt-20 p-4">
                <ErrorMessage error={error} />
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-20 p-4">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="bg-background-secondary shadow-lg rounded-lg p-6 max-w-lg mx-auto"
            >
                <h2 className="text-center text-accent text-2xl font-semibold">
                    {product.name}
                </h2>

                <div className="flex justify-center my-6">
                    <motion.img
                        initial={{scale: 0.9}}
                        animate={{scale: 1}}
                        transition={{duration: 0.3}}
                        src={product.url_image || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                        className="rounded-lg h-40 w-40 object-cover border border-accent/20 hover:scale-105 transition-transform duration-300"
                        alt={product.name}
                    />
                </div>

                <div className="mt-6 p-4 bg-background-accent/5 rounded-lg">
                    <p className="text-center text-lg text-primary">
                        <span className="font-mono">{product.id_mac}</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductPage;