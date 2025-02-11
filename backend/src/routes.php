<?php
use Slim\App;
use Controllers\ProductController;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function (App $app, ProductController $productController) {
    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write(json_encode(["message" => "Slim fonctionne !"]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->get('/products', [$productController, 'getAllProducts']);
    $app->get('/products/{id}', [$productController, 'getProductById']);
    $app->post('/products', [$productController, 'addProduct']);
    $app->put('/products/{id}', [$productController, 'updateProduct']);
    $app->delete('/products/{id}', [$productController, 'deleteProduct']);
};
