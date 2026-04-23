<?php
namespace Controllers;

use Core\Request;
use Core\Response;
use Models\Attack;

class AiController {
    private $attackModel;

    public function __construct() {
        $this->attackModel = new Attack();
    }

    public function storeResult(Request $request) {
        $data = $request->getBody();

        if (!$data || !isset($data['type'])) {
            Response::error('Invalid AI payload', 400);
        }

        // 1. Create Attack
        $attackId = $this->attackModel->create([
            'type' => $data['type'] ?? 'unknown',
            'severity' => $data['severity'] ?? 'low',
            'ip' => $data['ip'] ?? null,
            'timestamp' => $data['timestamp'] ?? date('Y-m-d H:i:s'),
            'confidence' => $data['confidence'] ?? 0,
            'explanation' => $data['explanation'] ?? null
        ]);

        if (!$attackId) {
            Response::error('Failed to store attack', 500);
        }

        // 2. Store Logs
        if (!empty($data['logs']) && is_array($data['logs'])) {
            foreach ($data['logs'] as $log) {
                $this->attackModel->addLog($attackId, $log);
            }
        }

        // 3. Store Timeline
        if (!empty($data['timeline']) && is_array($data['timeline'])) {
            foreach ($data['timeline'] as $event) {
                $ts = $event['timestamp'] ?? date('Y-m-d H:i:s');
                $desc = $event['description'] ?? 'Event recorded';
                $this->attackModel->addTimeline($attackId, $ts, $desc);
            }
        }

        Response::success(['attack_id' => $attackId], ['message' => 'AI result stored successfully'], 201);
    }
}
