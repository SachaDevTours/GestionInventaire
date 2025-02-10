<?php

$host = "localhost";
$dbname = "qemi1281_GestionInventaire";
$username = "GestionInventaire";
$password = "GestionInventaire";

define("BASE_URL", "http://" . $_SERVER['HTTP_HOST'] . "/");

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}
