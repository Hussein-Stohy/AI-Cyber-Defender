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

    public function analyzeLog(Request $request) {
        $data = $request->getBody();
        $inputText = $data['input_text'] ?? null;
        $logs = $data['logs'] ?? null;

        if (!$inputText && !$logs) {
            Response::error('Missing input_text or logs', 400);
        }

        $results = [];
        $hasLogsArray = is_array($logs) && count($logs) > 0;
        $itemsToProcess = $hasLogsArray ? $logs : [$inputText];

        foreach ($itemsToProcess as $logText) {
            if (!$logText) continue;

            $ch = \curl_init('http://localhost:5000/api/predict');
            \curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            \curl_setopt($ch, CURLOPT_POST, true);
            \curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            \curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['input_text' => $logText]));
            
            $response = \curl_exec($ch);
            $httpCode = \curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlError = \curl_error($ch);
            if (is_resource($ch)) { \curl_close($ch); }

            if ($response === false) {
                Response::error('Failed to connect to the new AI system. cURL Error: ' . $curlError, 500);
            }

            $aiResult = json_decode($response, true);
            
            if (isset($aiResult['error'])) {
                 Response::error("AI System Error on log '$logText': " . $aiResult['error'], $httpCode >= 400 ? $httpCode : 400);
            }

            if ($httpCode !== 200) {
                 Response::error("Unexpected response from AI system. HTTP Code: $httpCode", 500);
            }

            $results[] = ['original_text' => $logText, 'ai_result' => $aiResult];
        }

        $responseData = [];

        foreach ($results as $item) {
            $result = $item['ai_result'];
            $originalText = $item['original_text'];
            $attackId = null;

            if (isset($result['prediction']) && $result['prediction'] === 'anomaly') {
                $explanation = '';
                if (!empty($result['recommended_actions'])) {
                    $actions = $result['recommended_actions'];
                    if (is_array($actions)) {
                        $flatActions = [];
                        array_walk_recursive($actions, function($a) use (&$flatActions) { 
                            $flatActions[] = $a; 
                        });
                        $explanation = implode(' ', $flatActions);
                    } else {
                        $explanation = $actions;
                    }
                }

                $attackId = $this->attackModel->create([
                    'source_type' => $result['source_type'] ?? null,
                    'attack_type' => $result['attack_type'] ?? 'unknown',
                    'attack_name' => $result['attack_name'] ?? 'unknown',
                    'threat_score' => $result['threat_score'] ?? 0,
                    'threat_level' => $result['threat_level'] ?? 'low',
                    'source_ip' => $result['source_ip'] ?? null,
                    'username' => $result['username'] ?? null,
                    'event_time' => $result['event_time'] ?? date('Y-m-d H:i:s'),
                    'recommended_actions' => $explanation,
                    'raw_context' => isset($result['raw_context']) ? json_encode($result['raw_context']) : null
                ]);

                if ($attackId) {
                    $this->attackModel->addLog($attackId, $originalText);
                    $this->attackModel->addTimeline($attackId, date('Y-m-d H:i:s'), 'Attack detected by AI analysis');
                }
            }
            $result['attack_id'] = $attackId;
            $responseData[] = $result;
        }

        if (!$hasLogsArray) {
            $responseData = $responseData[0] ?? null;
        }

        Response::success($responseData, ['message' => 'Analysis complete'], 200);
    }

    /**
     * POST /api/ingest-logs
     * Receives logs from the live monitoring agent.
     * Expects: { "source": "windows|web|network", "logs": ["log line 1", ...] }
     * Forwards each log to AI Flask /api/predict, saves anomalies to DB.
     */
    public function ingestLogs(Request $request) {
        $data = $request->getBody();
        $source = $data['source'] ?? 'auto';
        $logs = $data['logs'] ?? [];

        if (!is_array($logs) || count($logs) === 0) {
            Response::error('Missing or empty "logs" array', 400);
        }

        $results = [];
        $saved = 0;

        foreach ($logs as $logText) {
            $logText = trim($logText);
            if (empty($logText)) continue;

            // Forward to AI Flask service
            $ch = \curl_init('http://localhost:5000/api/predict');
            \curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            \curl_setopt($ch, CURLOPT_POST, true);
            \curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            \curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['input_text' => $logText]));
            \curl_setopt($ch, CURLOPT_TIMEOUT, 10);

            $response = \curl_exec($ch);
            $httpCode = \curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlError = \curl_error($ch);
            if (is_resource($ch)) { \curl_close($ch); }

            if ($response === false) {
                $results[] = [
                    'log' => $logText,
                    'status' => 'error',
                    'message' => 'AI service unreachable: ' . $curlError
                ];
                continue;
            }

            $aiResult = json_decode($response, true);

            if (!$aiResult || isset($aiResult['error'])) {
                $results[] = [
                    'log' => $logText,
                    'status' => 'error',
                    'message' => $aiResult['error'] ?? 'Invalid AI response'
                ];
                continue;
            }

            $prediction = $aiResult['prediction'] ?? 'normal';

            // Save anomalies to database
            if ($prediction === 'anomaly' || $prediction === 'malicious') {
                $explanation = '';
                if (!empty($aiResult['recommended_actions'])) {
                    $actions = $aiResult['recommended_actions'];
                    if (is_array($actions)) {
                        $flatActions = [];
                        array_walk_recursive($actions, function($a) use (&$flatActions) {
                            $flatActions[] = $a;
                        });
                        $explanation = implode(' | ', $flatActions);
                    } else {
                        $explanation = $actions;
                    }
                }

                $attackId = $this->attackModel->create([
                    'source_type'         => $aiResult['source_type'] ?? $source,
                    'attack_type'         => $aiResult['attack_type'] ?? 'unknown',
                    'attack_name'         => $aiResult['attack_name'] ?? 'Unknown Attack',
                    'threat_score'        => $aiResult['threat_score'] ?? 0,
                    'threat_level'        => $aiResult['threat_level'] ?? 'low',
                    'source_ip'           => $aiResult['source_ip'] ?? null,
                    'username'            => $aiResult['username'] ?? null,
                    'event_time'          => $aiResult['event_time'] ?? date('Y-m-d H:i:s'),
                    'recommended_actions' => $explanation,
                    'raw_context'         => isset($aiResult['raw_context']) ? json_encode($aiResult['raw_context']) : $logText
                ]);

                if ($attackId) {
                    $this->attackModel->addLog($attackId, '[AGENT] ' . $logText);
                    $this->attackModel->addTimeline($attackId, date('Y-m-d H:i:s'), 'Live log ingested by monitoring agent');
                    $this->attackModel->addTimeline($attackId, date('Y-m-d H:i:s', strtotime('+1 second')), 'AI analysis: ' . ($aiResult['attack_type'] ?? 'anomaly') . ' detected — Threat score: ' . ($aiResult['threat_score'] ?? 0));
                    $saved++;
                }

                $results[] = [
                    'log'        => $logText,
                    'status'     => 'alert',
                    'attack_id'  => $attackId,
                    'prediction' => $prediction,
                    'attack_type'=> $aiResult['attack_type'] ?? 'unknown',
                    'threat_level'=> $aiResult['threat_level'] ?? 'low',
                    'threat_score'=> $aiResult['threat_score'] ?? 0,
                    'source_ip'  => $aiResult['source_ip'] ?? null
                ];
            } else {
                $results[] = [
                    'log'        => $logText,
                    'status'     => 'safe',
                    'prediction' => 'normal',
                    'threat_score'=> $aiResult['threat_score'] ?? 0
                ];
            }
        }

        Response::success([
            'processed' => count($results),
            'alerts_saved' => $saved,
            'results' => $results
        ], ['message' => "Processed " . count($results) . " logs, saved $saved alerts"]);
    }
}
