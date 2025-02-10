<?php
namespace Controllers;

use Services\ProductService;
use Config\Database;

class ProductController {
    private $productService;

    public function __construct($pdo) {
        $this->productService = new ProductService($pdo);
    }

    public function handleRequest() {
        header("Content-Type: application/json");
        $method = $_SERVER["REQUEST_METHOD"];

        if ($method === "GET") {
            echo json_encode($this->productService->getAllProducts());
        } elseif ($method === "POST") {
            $data = json_decode(file_get_contents("php://input"), true);
            echo json_encode($this->productService->addProduct($data));
        } else {
            echo json_encode(["message" => "Méthode non autorisée"]);
        }
    }
}

$controller = new ProductController($pdo);
$controller->handleRequest();
