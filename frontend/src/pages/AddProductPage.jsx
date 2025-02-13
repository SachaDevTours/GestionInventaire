import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FileTrigger } from '@adobe/react-spectrum';
import { useTextField } from '@react-aria/textfield';
import { useButton } from '@react-aria/button';

import { addProduct } from "../services/api";

const AddProductPage = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");
    const [macAddress, setMacAddress] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");

    // Refs pour React Aria
    const nameRef = React.useRef(null);
    const macRef = React.useRef(null);
    const submitRef = React.useRef(null);

    // Hooks React Aria pour les champs de texte
    const { labelProps: nameLabelProps, inputProps: nameInputProps } = useTextField({
        label: "Nom du produit",
        value: productName,
        onChange: setProductName,
        isRequired: true,
        'aria-label': 'Nom du produit',
        'aria-required': true
    }, nameRef);

    const { labelProps: macLabelProps, inputProps: macInputProps } = useTextField({
        label: "Adresse MAC",
        value: macAddress,
        onChange: setMacAddress,
        isRequired: true,
        'aria-label': 'Adresse MAC',
        'aria-required': true
    }, macRef);

    // Hook React Aria pour le bouton submit
    const { buttonProps } = useButton({
        onPress: handleSubmit,
        isDisabled: !productName || !macAddress
    }, submitRef);

    const handleImageChange = (files) => {
        const file = files[0];
        if (!file) return;

        const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validExtensions.includes(file.type)) {
            setError("Format de fichier non valide. Seuls les formats JPG et PNG sont acceptés.");
            return;
        }

        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            setError("L'image est trop volumineuse. La taille maximale est de 10MB.");
            return;
        }

        setError("");
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setPreview(null);
    };

    async function handleSubmit(e) {
        if (e) e.preventDefault();

        const response = await addProduct(productName, macAddress, imageFile);

        if (response.success) {
            navigate("/", {
                state: { productCreated: true }
            });
        } else {
            setError(response.message || "Erreur lors de l'ajout du produit.");
        }
    }

    return (
        <div className="container mx-auto mt-20 p-4" role="main">
            <div className="bg-background-secondary rounded-lg p-6 max-w-lg mx-auto">
                <h1 className="text-center text-accent text-2xl font-semibold mb-6">
                    Ajouter un produit
                </h1>

                {error && (
                    <div className="text-secondary bg-background-error p-3 rounded-md text-center mb-4" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label {...nameLabelProps} className="block text-primary font-medium mb-2">
                            Nom du produit
                        </label>
                        <input
                            {...nameInputProps}
                            ref={nameRef}
                            className="w-full p-3 bg-background-secondary border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-primary"
                        />
                    </div>

                    <div>
                        <label {...macLabelProps} className="block text-primary font-medium mb-2">
                            Adresse MAC
                        </label>
                        <input
                            {...macInputProps}
                            ref={macRef}
                            className="w-full p-3 bg-background-secondary border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-primary font-medium mb-2">
                            Image du produit (optionnel)
                        </label>
                        <FileTrigger
                            onSelect={handleImageChange}
                            acceptedFileTypes={['image/jpeg', 'image/png']}
                        >
                            <div className="relative flex items-center">
                                <input
                                    type="file"
                                    className="w-full p-3 bg-background-secondary border border-accent/20 rounded-lg cursor-pointer text-primary file:bg-background-accent file:text-secondary file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:cursor-pointer file:hover:bg-background-accent/80 file:transition-colors"
                                    aria-label="Sélectionner une image de produit"
                                />
                            </div>
                        </FileTrigger>

                        {preview && (
                            <div className="mt-4 flex justify-center">
                                <div className="relative">
                                    <img
                                        src={preview ?? "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                                        alt="Aperçu du produit"
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            target.src = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
                                        }}
                                        className="rounded-lg h-40 w-40 object-cover border border-accent/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        aria-label="Supprimer l'image"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        {...buttonProps}
                        ref={submitRef}
                        className="w-full bg-background-accent text-secondary px-6 py-3 rounded-lg hover:bg-background-accent/80 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;