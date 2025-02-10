<?php
namespace Entities;

class Product {
    public $id;
    public $nom;
    public $quantite;
    public $prix;
    public $qr_code;

    public function __construct($id, $nom, $quantite, $prix, $qr_code) {
        $this->id = $id;
        $this->nom = $nom;
        $this->quantite = $quantite;
        $this->prix = $prix;
        $this->qr_code = $qr_code;
    }
}
