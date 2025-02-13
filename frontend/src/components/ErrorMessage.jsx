import React from 'react';
import {motion} from "framer-motion";

const ErrorMesssage = ({ error = "Une erreur s'est produite !" }) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="bg-background-secondary shadow-lg rounded-lg p-6 max-w-lg mx-auto"
        >
            <div className="flex justify-center my-6">
                <motion.img
                    initial={{scale: 0.9}}
                    animate={{scale: 1}}
                    transition={{duration: 0.3}}
                    src={"https://i0.pickpik.com/photos/286/573/109/error-not-found-404-lego-preview.jpg"}
                    className="rounded-lg h-40 W-80 object-cover border border-accent/20 hover:scale-105 transition-transform duration-300"
                    alt={"Image d'erreur"}
                />
            </div>

            <div className="mt-6 p-2 bg-background-error rounded-lg">
                <p className="text-center text-lg text-secondary">
                    {error}
                </p>
            </div>
        </motion.div>
    );
};

export default ErrorMesssage;