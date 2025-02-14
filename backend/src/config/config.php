<?php
namespace Config;

use PDO;
use PDOException;
use Dotenv\Dotenv;

class Database {
    private static $pdo = null;

    public static function getConnection() {
        if (self::$pdo === null) {
            try {
                
                $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
                $dotenv->load();

                $host = $_ENV['DB_HOST'];
                $dbname = $_ENV['DB_NAME'];
                $username = $_ENV['DB_USER'];
                $password = $_ENV['DB_PASSWORD'];
                $charset = $_ENV['DB_CHARSET'] ?? 'utf8';

                self::$pdo = new PDO(
                    "mysql:host=$host;dbname=$dbname;charset=$charset",
                    $username,
                    $password,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                    ]
                );

            } catch (PDOException $e) {
                die(json_encode(["error" => "Erreur de connexion : " . $e->getMessage()]));
            }
        }
        return self::$pdo;
    }
}
