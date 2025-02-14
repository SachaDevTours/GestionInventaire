// ProductSkeleton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProductSkeleton = () => {
    return (
        <div className="container mx-auto mt-20 p-4">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="bg-background-secondary shadow-lg rounded-lg p-6 max-w-lg mx-auto"
            >
                <div className="w-3/4 h-8 bg-gray-400 rounded-lg mx-auto animate-pulse" />

                <div className="flex justify-center my-6">
                    <motion.div
                        initial={{scale: 0.9}}
                        animate={{scale: 1}}
                        transition={{duration: 0.3}}
                        className="h-40 w-40 bg-gray-400 rounded-lg animate-pulse"
                    />
                </div>

                <div className="mt-6 p-4 bg-background-accent/5 rounded-lg">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-2/3 h-4 bg-gray-400 rounded animate-pulse" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductSkeleton;