<?php
namespace Repositories;

use PDO;

class ProductRepository {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function addProduct($data, $files) {
        $uploadDir = __DIR__ . '/../../uploads/';
        $imageName = null;
        $urlImage = null;
    
        if (isset($files['image'])) {
            $image = $files['image'];
    
            if ($image->getError() === UPLOAD_ERR_OK) {
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }
    
                $extension = pathinfo($image->getClientFilename(), PATHINFO_EXTENSION);
                $imageName = uniqid() . '.' . $extension;
                $imagePath = $uploadDir . $imageName;
    
                $image->moveTo($imagePath);
                $urlImage = "http://" . $_SERVER['HTTP_HOST'] . "/uploads/" . $imageName;
            } else {
                return ["error" => "Erreur lors de l'upload de l'image : " . $image->getError()];
            }
        } else {
            return ["error" => "Aucune image reçue dans la requête"];
        }

        $urlQrCode = "http://" . $_SERVER['HTTP_HOST'] . "/generate_qr.php?id=" . $data['id_mac'];

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
