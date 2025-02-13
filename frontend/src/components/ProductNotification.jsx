import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductNotification = () => {
    const [showNotification, setShowNotification] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.productCreated) {
            setShowNotification(true);
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [location]);

    if (!showNotification) return null;

    return (
        <div
            className="fixed top-4 left-1/2 -translate-x-1/2 w-96 z-50 transform transition-transform duration-300 ease-in-out">
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>

                    <div className="ml-3">
                        <p className="font-bold">Succès</p>
                        <p className="text-sm">Le produit a été créé avec succès !</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductNotification;