<?php
use DI\Container;
use Slim\Factory\AppFactory;
use Config\Database;
use Controllers\ProductController;
use Services\ProductService;
use Repositories\ProductRepository;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/config/config.php';

$container = new Container();
AppFactory::setContainer($container);
$app = AppFactory::create();

$app->addErrorMiddleware(true, true, true);

$container->set('db', function () {
    return Database::getConnection();
});

$pdo = $container->get('db');
$productRepository = new ProductRepository($pdo);
$productService = new ProductService($productRepository);
$productController = new ProductController($productService);


(require __DIR__ . '/../src/routes.php')($app, $productController);

$app->run();
