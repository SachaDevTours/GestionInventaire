import axios from "axios";

const API_URL = "http://localhost";

/*export const getProducts = async () => {
    try {
        return await axios.get(`${API_URL}/products`).then(res => res.data);
    } catch (error) {
        console.error("Erreur de chargement des produits :", error);
        return [];
    }
};*/

export const getProducts = async () => {
    return [
        {
            id_mac: "00:1A:2B:3C:4D:5E",
            name: "Ordinateur Portable",
            url_image: "",
            url_qr_code: "https://via.placeholder.com/qr-code",
        },
        {
            id_mac: "00:1B:2C:3D:4E:5F",
            name: "Souris Sans Fil",
            url_image: "",
            url_qr_code: "https://via.placeholder.com/qr-code",
        },
        {
            id_mac: "00:1C:2D:3E:4F:5G",
            name: "Clavier Mécanique",
            url_image: "",
            url_qr_code: "https://via.placeholder.com/qr-code",
        }
    ];
};

export const getProduct = async (id_mac) => {
    try {
        // Version API
        // return await axios.get(`${API_URL}/product`, {
        //     params: { id: id_mac }
        // }).then(res => res.data);

        // Version mock pour le développement
        const products = await getProducts();
        const product = products.find(p => p.id_mac === id_mac);
        if (!product) {
            throw new Error("Produit non trouvé");
        }
        return product;
    } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
        return null;
    }
};

export const addProduct = async (productName, macAddress, image) => {
    try {
        const formData = new FormData();
        formData.append("id_mac", macAddress);
        formData.append("nom", productName);
        if (image)
            formData.append("image", image);

        const response = await axios.post(`${API_URL}/products`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit :", error);
        return { success: false, message: "Erreur lors de l'ajout du produit." };
    }
};
