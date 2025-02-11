import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../services/api";

import {FaDownload, FaPlus} from "react-icons/fa";

const InventoryPage = () => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await getProducts();
            setProducts(data);
        })();
    }, []);

    const downloadQRCode = (url, productName) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = `QRCode_${productName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center mb-4">📦 Inventaire</h1>

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
                            <tr
                                key={product.id_mac}
                                onClick={() => navigate("/product", {state: {product}})}
                                style={{cursor: "pointer"}}
                            >
                                <td>{product.nom}</td>
                                <td>{product.id_mac}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-link text-primary p-0"
                                        onClick={(e) => downloadQRCode(product.url_qr_code, product.nom, e)}
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

            <div className="sticky-bottom d-flex justify-content-center my-3">
                <button
                    className="btn btn-success btn-lg shadow"
                    onClick={() => navigate("/add-product")}
                >
                    <FaPlus className="me-2"/> Ajouter un produit
                </button>
            </div>
        </div>
    );
};

export default InventoryPage;
