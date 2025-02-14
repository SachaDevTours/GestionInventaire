<?php
namespace Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Services\ProductService;

class ProductController {
    private $productService;

    public function __construct(ProductService $productService) {
        $this->productService = $productService;
    }

    public function getProducts(Request $request, Response $response): Response {
        $queryParams = $request->getQueryParams();
        if (isset($queryParams['id'])) {
            $result = $this->productService->getProductById($queryParams['id']);
        } else {
            $result = $this->productService->getAllProducts();
        }

        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function addProduct(Request $request, Response $response): Response {
        $data = $request->getParsedBody();
        $files = $request->getUploadedFiles();

        if (empty($data['name']) || empty($data['id_mac'])) {
            $errorResponse = ["error" => "Champs obligatoires manquants"];
            $response->getBody()->write(json_encode($errorResponse));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }

        $result = $this->productService->addProduct($data, $files);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateProduct(Request $request, Response $response): Response {
        $queryParams = $request->getQueryParams();
        if (!isset($queryParams['id'])) {
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json')
                ->getBody()->write(json_encode(["error" => "ID du produit manquant"]));
        }

        $data = $request->getParsedBody();
        $data['id'] = $queryParams['id'];
        $result = $this->productService->updateProduct($data);
        
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function deleteProduct(Request $request, Response $response): Response {
        $queryParams = $request->getQueryParams();
        if (!isset($queryParams['id'])) {
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json')
                ->getBody()->write(json_encode(["error" => "ID du produit manquant"]));
        }

        $result = $this->productService->deleteProduct($queryParams['id']);
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
