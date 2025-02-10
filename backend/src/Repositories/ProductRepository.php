<?php
namespace Repositories;

use Entities\Product;
use PDO;

class ProductRepository {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getAllProducts() {
        $stmt = $this->pdo->query("SELECT * FROM produits");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProductById($id) {
        $stmt = $this->pdo->prepare("SELECT * FROM produits WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function addProduct($data) {
        $stmt = $this->pdo->prepare("INSERT INTO produits (nom, quantite, prix, qr_code) VALUES (:nom, :quantite, :prix, :qr_code)");
        $stmt->execute([
            'nom' => $data['nom'],
            'quantite' => $data['quantite'],
            'prix' => $data['prix'],
            'qr_code' => $data['qr_code']
        ]);
        return ['message' => 'Produit ajouté avec succès'];
    }

    public function updateProduct($data) {
        $stmt = $this->pdo->prepare("UPDATE produits SET nom = :nom, quantite = :quantite, prix = :prix WHERE id = :id");
        $stmt->execute([
            'id' => $data['id'],
            'nom' => $data['nom'],
            'quantite' => $data['quantite'],
            'prix' => $data['prix']
        ]);
        return ['message' => 'Produit mis à jour avec succès'];
    }

    public function deleteProduct($id) {
        $stmt = $this->pdo->prepare("DELETE FROM produits WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return ['message' => 'Produit supprimé avec succès'];
    }
}
