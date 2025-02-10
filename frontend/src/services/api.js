import axios from "axios";

const API_URL = "http://localhost";

export const getProducts = async () => {
    return axios.get(`${API_URL}/products`).then(res => res.data);
};

export const addProduct = async (product) => {
    return axios.post(`${API_URL}/products`, product).then(res => res.data);
};

export const getProductByQR = async (qrCode) => {
    return axios.get(`${API_URL}/products/qr/${qrCode}`).then(res => res.data);
};
