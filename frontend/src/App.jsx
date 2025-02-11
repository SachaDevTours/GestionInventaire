import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header.jsx";
import InventoryPage from "./pages/InventoryPage";
import ProductPage from "./pages/ProductPage.jsx";
import AddProductPage from "./pages/AddProductPage";

const App = () => {
    return (
        <Router>
            <Header />

            <Routes>
                <Route path="/" element={<InventoryPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/add-product" element={<AddProductPage />} />

            </Routes>
        </Router>
    );
};

export default App;
