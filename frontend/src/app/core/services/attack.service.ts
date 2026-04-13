import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Attack } from '../models/attack.model';

@Injectable({
  providedIn: 'root'
})
export class AttackService {
  private mockAttacks: Attack[] = [
    { 
      id: 'ATT-2024-001', 
      type: 'SQL Injection', 
      severity: 'high', 
      ip: '192.168.1.105', 
      timestamp: '2024-04-13T10:00:00Z', 
      status: 'active',
      confidence: 0.98,
      explanation: 'Detected multiple anomalous POST requests containing high-entropy strings and SQL keywords (UNION, SELECT, OR "1"="1"). The pattern indicates a deliberate attempt to bypass the authentication layer using a time-based blind injection vector.',
      logs: [
        '2024-04-13 10:00:01: Incoming request from 192.168.1.105 to /api/login',
        '2024-04-13 10:00:02: Header: User-Agent: Mozilla/5.0 (PentestBot/1.0)',
        '2024-04-13 10:00:03: Payload detection: username=admin\' OR \'1\'=\'1',
        '2024-04-13 10:00:05: AI classified security threat: High Confidence (SQLi)',
        '2024-04-13 10:00:06: Automatic isolation protocol initiated for entry point /api/login'
      ],
      timeline: [
        { timestamp: '10:00:01', description: 'Initial connection from suspicious IP detected' },
        { timestamp: '10:00:03', description: 'Pattern matching identified SQL tokens in payload' },
        { timestamp: '10:00:05', description: 'AI Engine confirmed SQL Injection bypass attempt' },
        { timestamp: '10:00:06', description: 'Threat classified as High Severity; Alerted SecOps' }
      ]
    },
    { id: 'ATT-2024-002', type: 'Brute Force', severity: 'medium', ip: '10.0.0.42', timestamp: '2024-04-13T10:15:00Z', status: 'resolved' },
    { id: 'ATT-2024-003', type: 'XSS Query', severity: 'low', ip: '172.16.254.1', timestamp: '2024-04-13T10:30:00Z', status: 'mitigated' },
    { id: 'ATT-2024-004', type: 'DDoS Attempt', severity: 'high', ip: '45.12.33.21', timestamp: '2024-04-13T11:00:00Z', status: 'active' },
    { id: 'ATT-2024-005', type: 'Port Scan', severity: 'medium', ip: '192.168.1.50', timestamp: '2024-04-13T11:20:00Z', status: 'resolved' },
    { id: 'ATT-2024-006', type: 'Credential Stuffing', severity: 'high', ip: '88.21.44.11', timestamp: '2024-04-13T11:45:00Z', status: 'active' },
    { id: 'ATT-2024-007', type: 'Data Leakage', severity: 'high', ip: '192.168.1.12', timestamp: '2024-04-13T12:00:00Z', status: 'active' },
    { id: 'ATT-2024-008', type: 'Weak Password', severity: 'low', ip: '192.168.1.5', timestamp: '2024-04-13T12:15:00Z', status: 'resolved' },
    { id: 'ATT-2024-009', type: 'Phishing Link', severity: 'medium', ip: '15.44.22.11', timestamp: '2024-04-13T12:30:00Z', status: 'mitigated' },
    { id: 'ATT-2024-010', type: 'Zero Day Exploit', severity: 'high', ip: '102.33.44.55', timestamp: '2024-04-13T13:00:00Z', status: 'active' },
    { id: 'ATT-2024-011', type: 'API Abuse', severity: 'medium', ip: '192.168.1.100', timestamp: '2024-04-13T13:10:00Z', status: 'resolved' },
    { id: 'ATT-2024-012', type: 'Local File Inclusion', severity: 'high', ip: '172.20.10.5', timestamp: '2024-04-13T13:25:00Z', status: 'active' },
    { id: 'ATT-2024-013', type: 'Remote Code Execution', severity: 'high', ip: '44.11.22.33', timestamp: '2024-04-13T13:40:00Z', status: 'active' },
    { id: 'ATT-2024-014', type: 'DNS Hijacking', severity: 'medium', ip: '1.2.3.4', timestamp: '2024-04-13T14:00:00Z', status: 'mitigated' },
    { id: 'ATT-2024-015', type: 'Man-in-the-Middle', severity: 'high', ip: '192.168.10.5', timestamp: '2024-04-13T14:15:00Z', status: 'resolved' },
    { id: 'ATT-2024-016', type: 'Insecure Redirect', severity: 'low', ip: '55.66.77.88', timestamp: '2024-04-13T14:30:00Z', status: 'resolved' },
    { id: 'ATT-2024-017', type: 'Buffer Overflow', severity: 'high', ip: '12.13.14.15', timestamp: '2024-04-13T14:45:00Z', status: 'active' },
    { id: 'ATT-2024-018', type: 'Malware Download', severity: 'high', ip: '8.8.8.8', timestamp: '2024-04-13T15:00:00Z', status: 'active' },
    { id: 'ATT-2024-019', type: 'Path Traversal', severity: 'medium', ip: '192.168.1.75', timestamp: '2024-04-13T15:15:00Z', status: 'resolved' },
    { id: 'ATT-2024-020', type: 'Resource Exhaustion', severity: 'low', ip: '10.0.0.101', timestamp: '2024-04-13T15:30:00Z', status: 'mitigated' },
    { id: 'ATT-2024-021', type: 'Clickjacking', severity: 'low', ip: '99.88.77.66', timestamp: '2024-04-13T15:45:00Z', status: 'resolved' },
    { id: 'ATT-2024-022', type: 'Command Injection', severity: 'high', ip: '11.22.33.44', timestamp: '2024-04-13T16:00:00Z', status: 'active' },
    { id: 'ATT-2024-023', type: 'LDAP Injection', severity: 'medium', ip: '192.168.1.200', timestamp: '2024-04-13T16:15:00Z', status: 'resolved' },
    { id: 'ATT-2024-024', type: 'Cookie Stealing', severity: 'medium', ip: '4.3.2.1', timestamp: '2024-04-13T16:30:00Z', status: 'mitigated' },
    { id: 'ATT-2024-025', type: 'Social Engineering', severity: 'high', ip: '1.1.1.1', timestamp: '2024-04-13T16:45:00Z', status: 'active' }
  ];

  getAttacks(): Observable<Attack[]> {
    return of(this.mockAttacks);
  }

  getAttackById(id: string): Observable<Attack | undefined> {
    const attack = this.mockAttacks.find(a => a.id === id);
    return of(attack);
  }
}
