<?php
namespace Services;

use Repositories\ProductRepository;

class ProductService {
    private $productRepo;

    public function __construct(ProductRepository $productRepo) {
        $this->productRepo = $productRepo;
    }

    public function addProduct($data, $files) {
        $image = isset($files['image']) && $files['image']->getError() === UPLOAD_ERR_OK ? $files['image'] : null;
        return $this->productRepo->addProduct($data, $image);
    }    

    public function getAllProducts() {
        return $this->productRepo->getAllProducts();
    }

    public function getProductById($id) {
        return $this->productRepo->getProductById($id);
    }
}
