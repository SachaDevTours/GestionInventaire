<?php

use DI\Container;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Config\Database;
use Controllers\ProductController;
use Services\ProductService;
use Repositories\ProductRepository;
use Slim\Exception\HttpNotFoundException;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/config/config.php';

$container = new Container();
AppFactory::setContainer($container);
$app = AppFactory::create();

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();

$app->options('/{routes:.+}', function (Request $request, Response $response, array $args) {
    return $response->withHeader('Access-Control-Allow-Origin', '*')
                    ->withHeader('Access-Control-Allow-Headers', '*')
                    ->withHeader('Access-Control-Allow-Methods', '*')
                    ->withHeader('Access-Control-Allow-Credentials', 'true');
});

$app->add(function (Request $request, RequestHandlerInterface $handler): ResponseInterface {
    $response = $handler->handle($request);

    return $response->withHeader('Access-Control-Allow-Origin', '*')
                    ->withHeader('Access-Control-Allow-Headers', '*')
                    ->withHeader('Access-Control-Allow-Methods', '*')
                    ->withHeader('Access-Control-Allow-Credentials', 'true')
                    ->withHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
                    ->withHeader('Pragma', 'no-cache');
});

$app->addErrorMiddleware(true, true, true);

$container->set('db', function () {
    return Database::getConnection();
});

$pdo = $container->get('db');
$productRepository = new ProductRepository($pdo);
$productService = new ProductService($productRepository);
$productController = new ProductController($productService);

(require __DIR__ . '/../src/routes.php')($app, $productController);

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function (Request $request, Response $response) {
    throw new HttpNotFoundException($request);
});

$app->run();
