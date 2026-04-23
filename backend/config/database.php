<?php
namespace Config;

use PDO;
use PDOException;

class Database {
    private static $host = "localhost";
    private static $db_name = "ai_cyber_defender"; // Ensure this matches your DB
    private static $username = "root";
    private static $password = "";
    private static $conn = null;

    public static function getConnection() {
        if (self::$conn === null) {
            try {
                self::$conn = new PDO("mysql:host=" . self::$host . ";dbname=" . self::$db_name, self::$username, self::$password);
                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            } catch(PDOException $exception) {
                http_response_code(500);
                echo json_encode(["error" => "Database connection error: " . $exception->getMessage()]);
                exit;
            }
        }
        return self::$conn;
    }
}
