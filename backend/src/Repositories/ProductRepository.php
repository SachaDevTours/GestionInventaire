<?php
namespace Repositories;

use PDO;

class ProductRepository {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function addProduct($data, $image = null) {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
        $host = $_SERVER['HTTP_HOST']; 
        $baseUrl = $protocol . "://" . $host;

        $uploadDir = __DIR__ . '/../uploads/';
        $urlImage = null;

        if ($image) {
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $extension = pathinfo($image->getClientFilename(), PATHINFO_EXTENSION);
            $imageName = uniqid() . '.' . $extension;
            $imagePath = $uploadDir . $imageName;

            $image->moveTo($imagePath);
            $urlImage = $baseUrl . "/uploads/" . $imageName; // 🔹 Stocke l'URL complète de l'image
        }

        $urlQrCode = $baseUrl . "/generate_qr.php?id=" . $data['id_mac'];

        $stmt = $this->pdo->prepare("INSERT INTO products (name, id_mac, url_image, url_qr_code) 
                                     VALUES (:name, :id_mac, :url_image, :url_qr_code)");
        $stmt->execute([
            'name' => $data['name'],
            'id_mac' => $data['id_mac'],
            'url_image' => $urlImage,
            'url_qr_code' => $urlQrCode
        ]);

        return [
            'message' => 'Produit ajouté avec succès',
            'url_image' => $urlImage,
            'url_qr_code' => $urlQrCode
        ];
    }
    
    
    

    public function getAllProducts() {
        $stmt = $this->pdo->query("SELECT * FROM products");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProductById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM products WHERE id_mac = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
