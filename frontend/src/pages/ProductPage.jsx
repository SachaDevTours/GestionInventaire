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
                        src={product.image || "/api/placeholder/160/160"}
                        className="rounded-lg h-40 w-40 object-cover border border-accent/20 hover:scale-105 transition-transform duration-300"
                        alt={product.nom}
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
                    onClick={() => window.history.back()}
                    className="mt-6 w-full bg-background-accent text-secondary px-6 py-3 rounded-lg shadow-lg hover:bg-background-accent/80 hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                    Retour à l'inventaire
                </motion.button>
            </motion.div>
        </div>
    );
};

export default ProductPage;
