<?php
namespace Config;

use PDO;
use PDOException;

class Database {
    private static $pdo = null;

    public static function getConnection() {
        if (self::$pdo === null) {
            try {
                $host = "192.168.45.59";
                $dbname = "gestion-inventaire";
                $username = "root";
                $password = "root_password";

                self::$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]);
            } catch (PDOException $e) {
                die(json_encode(["error" => "Erreur de connexion : " . $e->getMessage()]));
            }
        }
        return self::$pdo;
    }
}
