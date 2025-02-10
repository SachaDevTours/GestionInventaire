<?php
namespace Services;

use Repositories\ProductRepository;
use Entities\Product;

class ProductService {
    private $productRepo;

    public function __construct($pdo) {
        $this->productRepo = new ProductRepository($pdo);
    }

    public function generateQRCodeData($productId) {
        return "/product/" . $productId;
    }

    public function addProduct($data) {
        $data["qr_code"] = $this->generateQRCodeData($data["id"]);
        return $this->productRepo->addProduct($data);
    }

    public function getAllProducts() {
        return $this->productRepo->getAllProducts();
    }
}
