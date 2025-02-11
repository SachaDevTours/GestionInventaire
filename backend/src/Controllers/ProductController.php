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

    public function getAllProducts(Request $request, Response $response): Response {
        $result = $this->productService->getAllProducts();
        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getProductById(Request $request, Response $response, $args): Response {
        $id = $args['id'];
        $result = $this->productService->getProductById($id);

        if ($result) {
            $response->getBody()->write(json_encode($result));
        } else {
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json')
                ->getBody()->write(json_encode(["error" => "Produit non trouvé"]));
        }
        return $response->withHeader('Content-Type', 'application/json');
    }
}
