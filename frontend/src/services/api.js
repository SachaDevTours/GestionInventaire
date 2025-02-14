import axios from "axios";

const API_URL = import.meta.env.HOST;

export const getProducts = async () => {
    try {
        return await axios.get(`${API_URL}/products`).then(res => res.data);
    } catch (error) {
        console.error("Erreur de chargement des produits :", error);
        return [];
    }
};

export const getProduct = async (id_mac) => {
    try {
        // Version API
        return await axios.get(`${API_URL}/product`, {
            params: {id: id_mac}
        }).then(res => res.data);
    } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
        return null;
    }
}

export const addProduct = async (productName, macAddress, image) => {
    try {
        const formData = new FormData();
        formData.append("id_mac", macAddress);
        formData.append("name", productName);
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
