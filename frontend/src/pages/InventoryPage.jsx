import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {FaDownload, FaPlus} from "react-icons/fa";

import { getProducts } from "../services/api";

import {downloadQRCodeSVG} from "../utils/qrCodeUtils.jsx";

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
        <div className="container mt-3">
            <h1 className="text-center mb-4">📦 Inventaire</h1>

            <div className="sticky-bottom d-flex justify-content-center my-3">
                <button
                    className="btn btn-success btn-lg shadow"
                    onClick={() => navigate("/add-product")}
                >
                    <FaPlus className="me-2"/> Ajouter un produit
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-primary">
                    <tr>
                        <th>Nom du Produit</th>
                        <th>Adresse MAC</th>
                        <th className="text-center">QR Code</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id_mac}>
                                <td
                                    onClick={() => navigate("/product", {state: {product}})}
                                    style={{cursor: "pointer"}}
                                >
                                    {product.nom}
                                </td>
                                <td>{product.id_mac}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-link text-primary p-0"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            downloadQRCodeSVG(
                                                `http://localhost:5173/product?id=${product.id_mac}`,
                                                `QRCode_${product.id_mac}`
                                            );
                                        }}
                                    >
                                        <FaDownload size={18}/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">🔍 Aucun produit trouvé.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryPage;
