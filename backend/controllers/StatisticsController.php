<?php
namespace Controllers;

use Core\Request;
use Core\Response;
use Config\Database;
use PDO;

class StatisticsController {
    private $conn;

    public function __construct() {
        $this->conn = Database::getConnection();
    }

    public function index(Request $request) {
        $stmtIps = $this->conn->query("
            SELECT ip, COUNT(*) as count 
            FROM attacks 
            WHERE ip IS NOT NULL AND ip != '' 
            GROUP BY ip 
            ORDER BY count DESC LIMIT 5
        ");
        $topIps = $stmtIps->fetchAll();

        $stmtTypes = $this->conn->query("
            SELECT type, COUNT(*) as count 
            FROM attacks 
            GROUP BY type 
            ORDER BY count DESC
        ");
        $attackTypes = $stmtTypes->fetchAll();

        $stmtTrends = $this->conn->query("
            SELECT DATE(created_at) as date, COUNT(*) as count 
            FROM attacks 
            GROUP BY DATE(created_at) 
            ORDER BY date DESC LIMIT 30
        ");
        $dailyTrends = $stmtTrends->fetchAll();

        Response::success([
            'topIps' => $topIps,
            'attackTypes' => $attackTypes,
            'dailyTrends' => array_reverse($dailyTrends)
        ]);
    }
}
