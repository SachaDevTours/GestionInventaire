import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/api";

import {Button, Form, Input, Label, TextField} from "react-aria-components";

const AddProductPage = () => {
    const navigate = useNavigate();

    const [productName, setProductName] = useState("");
    const [macAddress, setMacAddress] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file)
            return;

        setImageFile("");

        const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validExtensions.includes(file.type)) {
            setError("Format de fichier non valide. Seuls les formats JPG et PNG sont acceptés.");
            e.target.value = ''; // Reset input
            return;
        }

        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            setError("L'image est trop volumineuse. La taille maximale est de 10MB.");
            e.target.value = '';
            return;
        }

        setError("");
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setPreview(null);
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput)
            fileInput.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName || !macAddress) {
            setError("Le nom du produit et l'adresse MAC sont obligatoires.");
            return;
        }

        const response = await addProduct(productName, macAddress, imageFile);

        if (response.success) {
            navigate("/", {
                state: { productCreated: true }
            });
        } else {
            setError(response.message || "Erreur lors de l'ajout du produit.");
        }
    };

    return (
        <div className="container mx-auto mt-20 p-4">
            <div className="bg-background-secondary rounded-lg p-6 max-w-lg mx-auto">
                <h2 className="text-center text-accent text-2xl font-semibold mb-6">
                    Ajouter un produit
                </h2>

                {error && (
                    <div className="text-secondary bg-background-error p-3 rounded-md text-center mb-4">
                        {error}
                    </div>
                )}

                <Form onSubmit={handleSubmit} className="space-y-6">
                    <TextField
                        name='productName'
                        value={productName}
                        onChange={setProductName}
                        className="block w-full"
                    >
                        <Label className="block text-primary font-medium mb-2">
                            Nom du produit
                        </Label>
                        <Input
                            className="w-full p-3 bg-background-secondary border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-primary"
                            required
                        />
                    </TextField>

                    <TextField
                        name="macAddress"
                        value={macAddress}
                        onChange={setMacAddress}
                        className="block w-full"
                    >
                        <Label className="block text-primary font-medium mb-2">
                            Adresse MAC
                        </Label>
                        <Input
                            className="w-full p-3 bg-background-secondary border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-primary"
                            required
                        />
                    </TextField>

                    <div>
                        <Label className="block text-primary font-medium mb-2">
                            Image du produit (optionnel)
                        </Label>
                        <div className="relative flex items-center">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full p-3 bg-background-secondary border border-accent/20 rounded-lg cursor-pointer text-primary file:bg-background-accent file:text-secondary file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:cursor-pointer file:hover:bg-background-accent/80 file:transition-colors"
                            />
                            {preview && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute right-5 text-accent cursor-pointer"
                                    title="Supprimer l'image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                        {preview && (
                            <div className="mt-4 flex justify-center">
                                <img
                                    src={preview}
                                    alt="Aperçu"
                                    onError={(e) => {
                                        const target = e.currentTarget;
                                        target.src = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
                                    }}
                                    className="rounded-lg h-40 w-40 object-cover border border-accent/20"
                                />
                            </div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-background-accent text-secondary px-6 py-3 rounded-lg hover:bg-background-accent/80 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
                    >
                        Ajouter
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddProductPage;
