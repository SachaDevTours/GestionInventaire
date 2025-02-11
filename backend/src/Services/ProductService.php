<?php
namespace Services;

use Repositories\ProductRepository;

class ProductService {
    private $productRepo;

    public function __construct(ProductRepository $productRepo) {
        $this->productRepo = $productRepo;
    }

    public function addProduct($data, $files) {
        return $this->productRepo->addProduct($data, $files);
    }

    public function getAllProducts() {
        return $this->productRepo->getAllProducts();
    }

    public function getProductById($id) {
        return $this->productRepo->getProductById($id);
    }
}
