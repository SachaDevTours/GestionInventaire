<?php

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../repositories/ProductRepository.php';
require_once __DIR__ . '/../vendor/phpqrcode/qrlib.php';

use Config\Database;
use Repositories\ProductRepository;

if (!isset($_GET['id'])) {
    die("ID produit manquant");
}

$id = intval($_GET['id']);
$pdo = Database::getConnection();
$productRepo = new ProductRepository($pdo);
$product = $productRepo->getProductById($id);

if (!$product) {
    die("Produit non trouvé");
}

define("BASE_URL", "http://" . $_SERVER['HTTP_HOST'] . "/");
$qrData = BASE_URL . ltrim($product['qr_code'], '/');

header("Content-Type: image/png");
QRcode::png($qrData);
