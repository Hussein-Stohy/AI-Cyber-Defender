USE ai_cyber_defender;

-- Clear old attack data
DELETE FROM attack_timelines;
DELETE FROM attack_logs;
DELETE FROM attacks;

-- ============================================================
-- INSERT 120 ATTACKS (varied types, levels, IPs, dates)
-- Covers last 30 days for chart data
-- ============================================================
INSERT INTO attacks (source_type, attack_type, attack_name, threat_score, threat_level, source_ip, username, event_time, recommended_actions, raw_context, status) VALUES

-- DAY -30
('external','DDoS','Volumetric Flood Attack',92.50,'critical','185.220.101.45','anonymous','2026-05-19 02:14:00','Block IP range, enable rate limiting, contact ISP','GET / HTTP/1.1 - 50000 req/s from botnet','active'),
('external','SQL Injection','Union-Based SQL Injection',78.00,'high','91.108.56.130','db_attacker','2026-05-19 08:30:00','Sanitize inputs, use prepared statements, WAF rules','SELECT * FROM users UNION SELECT 1,2,3--','investigating'),
('internal','Brute Force','SSH Brute Force Login',65.00,'medium','10.0.0.45','root','2026-05-19 11:22:00','Enforce MFA, fail2ban, disable root SSH login','Failed password for root from 10.0.0.45 port 22','resolved'),

-- DAY -28
('external','Ransomware','WannaCry Variant',98.00,'critical','203.0.113.75','SYSTEM','2026-05-21 03:45:00','Isolate machine, restore from backup, patch MS17-010','SMB exploit detected: EternalBlue variant','active'),
('external','Phishing','Spear Phishing Email',72.00,'high','77.88.55.80','ceo_user','2026-05-21 09:10:00','Block sender domain, user awareness training','Email from fake-ceo@comp4ny.com with malicious link','resolved'),
('external','Port Scan','Nmap SYN Scan',45.00,'medium','194.165.16.76','scanner','2026-05-21 14:30:00','Update firewall rules, close unnecessary ports','SYN scan from 194.165.16.76 on ports 1-65535','resolved'),
('external','XSS','Stored XSS Attack',68.00,'high','45.142.212.100','web_user','2026-05-21 16:55:00','Encode output, CSP headers, XSS filter','script alert injected into comment field','resolved'),

-- DAY -26
('external','DDoS','HTTP Flood Attack',88.00,'critical','102.130.122.76','anonymous','2026-05-23 01:00:00','Enable DDoS protection, CDN failover','HTTP GET flood: 30000 req/s to /api/products','active'),
('internal','Insider Threat','Unauthorized Data Export',82.00,'high','192.168.1.112','john_smith','2026-05-23 10:45:00','Revoke access, audit logs, HR investigation','User exported 50000 records at 10:45 PM','investigating'),
('external','Malware','Trojan Dropper Detected',75.00,'high','31.14.133.50','anonymous','2026-05-23 13:20:00','Quarantine file, full AV scan, isolate host','trojan.dropper.win32 detected in downloads folder','resolved'),

-- DAY -24
('external','SQL Injection','Blind SQL Injection',76.00,'high','185.156.73.60','anonymous','2026-05-25 07:15:00','Parameterized queries, DB firewall, error handling','time-based blind injection on login endpoint','investigating'),
('external','Brute Force','RDP Brute Force',70.00,'high','91.92.251.103','Administrator','2026-05-25 09:30:00','Disable RDP, use VPN, account lockout policy','3200 failed RDP attempts in 10 minutes','resolved'),
('external','Port Scan','Aggressive Port Scan',40.00,'low','194.61.24.102','unknown','2026-05-25 12:00:00','Log and monitor, update IDS rules','masscan -p1-65535 at 10000 packets/sec','resolved'),
('external','XSS','Reflected XSS',60.00,'medium','5.188.210.227','anonymous','2026-05-25 15:45:00','Input validation, output encoding','XSS payload in search parameter: <img onerror=alert(1)>','resolved'),
('external','Phishing','Credential Harvesting',80.00,'high','185.81.157.92','hr_manager','2026-05-25 17:30:00','Reset passwords, enable MFA, block domain','Fake Microsoft login page capturing credentials','resolved'),

-- DAY -22
('external','DDoS','DNS Amplification',90.00,'critical','34.65.228.130','anonymous','2026-05-27 00:30:00','Disable open DNS resolver, rate limit DNS responses','DNS amplification x50 factor from open resolvers','active'),
('external','Ransomware','Ryuk Ransomware',97.00,'critical','45.33.32.156','SYSTEM','2026-05-27 04:15:00','Disconnect from network immediately, engage IR team','Ryuk ransomware encrypting network shares','active'),
('internal','Privilege Escalation','Sudo Privilege Abuse',78.00,'high','10.10.0.23','dev_user','2026-05-27 11:00:00','Audit sudoers file, principle of least privilege','User dev_user escalated to root via sudo exploit','investigating'),
('external','SQL Injection','Error-Based Injection',74.00,'high','176.111.174.200','anonymous','2026-05-27 14:20:00','Error suppression, WAF, DB hardening','MySQL error-based injection via EXTRACTVALUE()','resolved'),

-- DAY -20
('external','Malware','Cryptojacker Installed',72.00,'high','185.220.101.33','miner','2026-05-29 06:00:00','Kill process, remove persistence, patch OS','CPU usage 100%: xmrig cryptominer process found','resolved'),
('external','Brute Force','WordPress Login Attack',55.00,'medium','103.251.167.20','admin','2026-05-29 08:45:00','Limit login attempts, CAPTCHA, strong passwords','xmlrpc.php brute force: 5000 attempts','resolved'),
('external','Port Scan','Service Enumeration',38.00,'low','162.142.125.61','scanner','2026-05-29 10:30:00','Firewall hardening, honeypot deployment','Banner grabbing on services: FTP SSH HTTP SMTP','resolved'),
('external','Phishing','Business Email Compromise',85.00,'critical','209.14.0.234','finance_user','2026-05-29 13:15:00','Verify wire transfers, email authentication','CFO impersonation requesting $50k wire transfer','investigating'),
('external','XSS','DOM-Based XSS',65.00,'medium','80.82.77.139','web_anon','2026-05-29 16:00:00','DOM sanitization, trusted types API','DOM XSS via location.hash manipulation','resolved'),

-- DAY -18
('external','DDoS','UDP Flood',85.00,'critical','5.34.180.200','anonymous','2026-05-31 02:00:00','Rate limit UDP, null route attacker IP','UDP flood 20Gbps targeting port 53','active'),
('external','SQL Injection','Second-Order Injection',77.00,'high','193.32.162.184','anonymous','2026-05-31 09:30:00','Parameterize all queries, DB activity monitoring','Stored payload executed on profile update','investigating'),
('internal','Data Exfiltration','Large Data Transfer',88.00,'critical','192.168.10.55','sales_rep','2026-05-31 14:00:00','Block transfer, audit user activity, legal review','45GB upload to personal Dropbox account','investigating'),
('external','Ransomware','LockBit 3.0',99.00,'critical','198.235.24.130','SYSTEM','2026-05-31 22:00:00','Immediate isolation, FBI notification, IR team','LockBit 3.0 detected, ransom note found on desktop','active'),

-- DAY -16
('external','Brute Force','FTP Brute Force',52.00,'medium','91.108.4.136','ftpuser','2026-06-02 07:15:00','Disable FTP, use SFTP, IP whitelist','2000 failed FTP logins from single IP','resolved'),
('external','Malware','Spyware Installation',74.00,'high','46.161.27.151','user01','2026-06-02 10:00:00','Remove malware, reset credentials, monitor network','Keylogger spyware detected sending data to C2','resolved'),
('external','Port Scan','Vulnerability Scanner',42.00,'medium','185.142.239.10','scanner','2026-06-02 12:30:00','Review exposed services, patch vulnerabilities','Nessus scan signatures detected from external IP','resolved'),
('external','XSS','File Upload XSS',71.00,'high','94.102.49.191','anon_user','2026-06-02 15:45:00','File type validation, sandbox execution','SVG file with embedded XSS payload uploaded','resolved'),
('external','Phishing','Vishing Attack',68.00,'medium','N/A','receptionist','2026-06-02 17:00:00','Staff training, call verification procedures','Employee tricked into revealing passwords via phone','resolved'),

-- DAY -14
('external','DDoS','Slowloris Attack',78.00,'high','45.95.169.112','anonymous','2026-06-04 03:30:00','Limit concurrent connections, reverse proxy','Slowloris keeping connections open, server exhausted','active'),
('external','SQL Injection','Stacked Query Injection',80.00,'high','185.220.101.60','sql_anon','2026-06-04 09:00:00','Disable stacked queries, DB permissions review','Multiple SQL statements injected via semicolon','investigating'),
('internal','Lateral Movement','Mimikatz Credential Dump',92.00,'critical','10.0.5.30','svc_account','2026-06-04 11:30:00','Reset all credentials, enable credential guard','Mimikatz lsadump::sam detected on Windows host','active'),
('external','Ransomware','BlackCat Ransomware',96.00,'critical','144.202.42.216','SYSTEM','2026-06-04 20:00:00','Isolate, engage IR, restore from offline backup','BlackCat/ALPHV ransomware encrypting VMware ESXi','active'),
('external','Brute Force','Email Account Brute Force',58.00,'medium','91.92.248.105','user@company.com','2026-06-04 14:00:00','Password policy, MFA, account lockout','Office365 login brute force from Russian IP','resolved'),

-- DAY -12
('external','Malware','Emotet Banking Trojan',83.00,'high','31.214.157.14','anonymous','2026-06-06 06:00:00','Block C2 domains, quarantine infected hosts','Emotet dropper via malicious Word macro','resolved'),
('external','Port Scan','SCADA Port Scan',55.00,'medium','185.156.177.100','ics_scanner','2026-06-06 08:30:00','Air-gap ICS networks, IDS for OT protocols','Shodan-like scan targeting industrial ports 102,502','investigating'),
('external','Phishing','QR Code Phishing',73.00,'high','104.21.234.100','mgr_user','2026-06-06 10:45:00','Block URL, user training, email filtering','QR code in email leads to credential harvest page','resolved'),
('external','XSS','CSRF via XSS',67.00,'medium','193.106.31.130','web_user','2026-06-06 13:00:00','CSRF tokens, SameSite cookies, CSP','XSS used to forge authenticated requests','resolved'),
('external','DDoS','NTP Amplification',87.00,'critical','185.3.135.10','anonymous','2026-06-06 16:00:00','Disable monlist, NTP source filtering','NTP amplification x550 factor DDoS attack','active'),

-- DAY -10
('external','SQL Injection','NoSQL Injection',69.00,'medium','94.232.43.63','nosql_anon','2026-06-08 07:00:00','Sanitize MongoDB queries, schema validation','MongoDB injection: {$gt: ""} in login field','resolved'),
('internal','Insider Threat','IP Theft Attempt',89.00,'critical','192.168.1.200','ex_employee','2026-06-08 09:15:00','Revoke all access immediately, legal action','Terminated employee accessing proprietary source code','investigating'),
('external','Brute Force','VPN Brute Force',62.00,'medium','176.10.99.200','vpn_user','2026-06-08 11:30:00','Certificate-based auth, geo-blocking','500 VPN login failures from Eastern Europe','resolved'),
('external','Ransomware','Conti Ransomware',98.00,'critical','23.106.160.174','SYSTEM','2026-06-08 23:00:00','Invoke BCP, notify stakeholders, engage law enforcement','Conti ransomware via Log4Shell exploit chain','active'),
('external','Malware','RAT Installation',77.00,'high','83.97.73.245','remote_user','2026-06-08 14:45:00','Remove RAT, block C2, forensic analysis','AsyncRAT installed via fake software crack','resolved'),

-- DAY -8
('external','DDoS','Carpet Bombing DDoS',91.00,'critical','5.188.86.172','botnet','2026-06-10 01:15:00','Upstream filtering, anycast routing','Distributed carpet bombing across /24 subnet','active'),
('external','SQL Injection','Time-Based Blind SQLi',75.00,'high','185.220.70.42','anonymous','2026-06-10 08:00:00','Query timeout, WAF tuning, prepared statements','SLEEP(5) injection causing 5-second delays','investigating'),
('external','XSS','Angular Template Injection',70.00,'high','178.73.215.171','ng_anon','2026-06-10 10:30:00','Disable template compilation in prod, sanitize','AngularJS template injection via user input','resolved'),
('internal','Privilege Escalation','Windows Token Impersonation',81.00,'high','10.10.1.50','svc_sql','2026-06-10 13:00:00','Patch Windows, restrict service account perms','PrintNightmare exploit for SYSTEM privileges','investigating'),
('external','Phishing','CEO Fraud',86.00,'critical','209.141.38.197','cfo_user','2026-06-10 15:30:00','Verify requests out-of-band, financial controls','Spoofed CEO email requesting urgent payment','investigating'),
('external','Port Scan','Cloud Infrastructure Scan',44.00,'low','34.83.240.210','cloud_scan','2026-06-10 17:00:00','Review security groups, least privilege network','AWS metadata endpoint scan from external IP','resolved'),

-- DAY -6
('external','Ransomware','Hive Ransomware',95.00,'critical','185.220.101.72','SYSTEM','2026-06-12 02:30:00','Isolate network segment, contact FBI IC3','Hive ransomware via Exchange ProxyShell vuln','active'),
('external','Brute Force','Database Brute Force',66.00,'medium','103.35.74.50','sa','2026-06-12 07:45:00','Change default ports, firewall rules, strong passwords','MSSQL sa account brute force from external IP','resolved'),
('external','Malware','Rootkit Installation',85.00,'critical','80.94.95.230','kernel_user','2026-06-12 10:00:00','Boot from clean media, full wipe and restore','Ring-0 rootkit hiding processes and network connections','active'),
('external','SQL Injection','JSON SQL Injection',71.00,'high','195.123.226.200','api_anon','2026-06-12 12:30:00','Validate JSON schema, parameterize DB calls','SQL injection via JSON body in REST API endpoint','resolved'),
('external','XSS','mXSS Attack',64.00,'medium','5.34.246.184','mx_user','2026-06-12 14:00:00','DOMPurify upgrade, HTML parser review','Mutation XSS bypassing existing sanitization','resolved'),
('external','DDoS','BGP Hijacking',93.00,'critical','1.179.112.230','bgp_attacker','2026-06-12 20:00:00','Contact upstream providers, RPKI validation','BGP route hijack redirecting 50k IP addresses','active'),
('external','Phishing','Smishing Attack',60.00,'medium','SMS','field_worker','2026-06-12 16:15:00','Block shortlinks, user awareness, MDM policy','SMS phishing link impersonating IT helpdesk','resolved'),

-- DAY -4
('external','Brute Force','Kerberos Ticket Attack',79.00,'high','10.0.2.100','svc_kerberos','2026-06-14 06:00:00','Enforce AES encryption, disable RC4, audit SPNs','Kerberoasting attack extracting service tickets','investigating'),
('external','SQL Injection','ORM Injection',68.00,'medium','46.101.166.19','orm_anon','2026-06-14 08:30:00','Audit ORM queries, input validation','Hibernate ORM injection via JPQL manipulation','resolved'),
('external','Malware','Worm Propagation',80.00,'high','192.168.0.200','worm_host','2026-06-14 10:15:00','Network segmentation, patch vulnerable services','Self-propagating worm via EternalBlue on LAN','investigating'),
('external','DDoS','Application Layer DDoS',84.00,'critical','185.8.105.112','l7_bot','2026-06-14 12:00:00','Bot detection, CAPTCHA, rate limiting per endpoint','Layer 7 DDoS mimicking legitimate user behavior','active'),
('external','Ransomware','Cl0p Ransomware',96.00,'critical','45.153.160.140','SYSTEM','2026-06-14 22:30:00','Engage CISA, disable GoAnywhere, restore from backup','Cl0p ransomware via GoAnywhere MFT zero-day','active'),
('internal','Data Exfiltration','Email Data Leak',76.00,'high','192.168.5.42','marketing_mgr','2026-06-14 15:30:00','DLP policy enforcement, email gateway review','Customer PII sent to personal email account','investigating'),
('external','XSS','PostMessage XSS',58.00,'medium','162.55.32.111','pm_anon','2026-06-14 17:00:00','Validate postMessage origin, CSP frame-ancestors','Cross-origin message XSS via iframe postMessage','resolved'),

-- DAY -3
('external','Port Scan','Kubernetes API Scan',51.00,'medium','185.220.101.90','k8s_scan','2026-06-15 09:00:00','Restrict API server access, RBAC, network policy','Kubernetes API server probing from external IP','resolved'),
('external','Brute Force','Redis Brute Force',57.00,'medium','194.165.16.90','redis_anon','2026-06-15 11:00:00','Auth password, bind localhost only','Unauthorized Redis access attempts, no password set','resolved'),
('external','Malware','Supply Chain Attack',91.00,'critical','update.legit-looking.com','build_server','2026-06-15 13:30:00','Audit dependencies, verify checksums, isolate pipeline','Compromised npm package in CI/CD build pipeline','active'),
('external','SQL Injection','GraphQL Injection',72.00,'high','178.128.100.45','gql_anon','2026-06-15 15:00:00','Depth limiting, query complexity, input validation','GraphQL introspection + field injection attack','investigating'),
('external','DDoS','ReDoS Attack',62.00,'medium','91.92.109.200','regex_bot','2026-06-15 17:00:00','Regex timeout limits, safe regex patterns','Regular expression DoS on input validation endpoint','resolved'),

-- DAY -2
('external','Ransomware','Royal Ransomware',97.00,'critical','185.220.101.95','SYSTEM','2026-06-16 03:00:00','Executive escalation, engage Mandiant, isolate DC','Royal ransomware targeting Active Directory','active'),
('external','Phishing','Adversary-in-Middle',82.00,'high','10.0.99.1','mitm_host','2026-06-16 08:00:00','Certificate pinning, HSTS, network monitoring','AitM attack intercepting OAuth tokens','investigating'),
('external','XSS','Web Cache Poisoning',73.00,'high','104.198.14.52','cache_anon','2026-06-16 10:30:00','Cache key normalization, Vary headers','XSS via poisoned CDN cache response','resolved'),
('internal','Insider Threat','Config File Access',71.00,'high','10.1.0.88','devops_user','2026-06-16 12:00:00','Secret rotation, vault integration, access audit','Production .env file with DB credentials accessed','investigating'),
('external','Brute Force','JWT Brute Force',63.00,'medium','95.143.192.70','jwt_anon','2026-06-16 14:00:00','Strong JWT secret, RS256 algorithm, token expiry','JWT HS256 secret brute-forced via offline attack','resolved'),
('external','DDoS','DNS Water Torture',86.00,'critical','5.45.79.200','dns_bot','2026-06-16 18:00:00','NXDOMAIN rate limiting, authoritative DNS protection','Pseudo-random subdomain DDoS on authoritative DNS','active'),
('external','Malware','Fileless Malware',88.00,'critical','N/A','ps_user','2026-06-16 20:30:00','Memory forensics, PowerShell logging, AMSI','PowerShell-based fileless malware in memory only','investigating'),

-- DAY -1
('external','SQL Injection','SQLi via Header',74.00,'high','176.111.174.55','header_anon','2026-06-17 07:30:00','Sanitize all input sources, log headers','SQL injection via X-Forwarded-For header','investigating'),
('external','Ransomware','Play Ransomware',95.00,'critical','23.29.115.175','SYSTEM','2026-06-17 04:00:00','Isolate immediately, engage IR team','Play ransomware via FortiOS vulnerability','active'),
('external','Port Scan','Docker API Scan',48.00,'medium','185.142.236.34','docker_scan','2026-06-17 09:00:00','Secure Docker API, TLS certificates','Unauthenticated Docker API exposed to internet','resolved'),
('external','Phishing','QRLJacking Attack',69.00,'medium','N/A','support_user','2026-06-17 11:00:00','OTP verification, session binding','QR code hijacking for WhatsApp Web session','resolved'),
('external','Brute Force','Cloud Console Brute Force',67.00,'medium','34.102.136.180','aws_user','2026-06-17 13:00:00','MFA on cloud console, IP restrictions, CloudTrail','AWS console login brute force from unknown location','resolved'),
('external','XSS','JSONP XSS',61.00,'medium','185.220.70.90','jsonp_anon','2026-06-17 15:00:00','Remove JSONP endpoints, use CORS properly','JSONP callback parameter XSS exploitation','resolved'),
('external','DDoS','HTTP/2 Rapid Reset',89.00,'critical','92.63.194.200','h2_bot','2026-06-17 19:00:00','Patch web servers, HTTP/2 stream limits','CVE-2023-44487: HTTP/2 Rapid Reset DDoS','active'),
('internal','Data Exfiltration','Database Dump',90.00,'critical','192.168.8.100','dba_user','2026-06-17 21:00:00','Revoke DBA access, audit trail, legal hold','Full database dump of customer PII table','investigating'),

-- TODAY (2026-06-18)
('external','DDoS','Botnet DDoS Attack',93.00,'critical','185.220.100.240','botnet','2026-06-18 01:00:00','Activate DDoS mitigation service, upstream ACL','10M packet/s botnet DDoS from 5000 infected nodes','active'),
('external','SQL Injection','Advanced SQLi',82.00,'high','91.92.251.200','adv_sql','2026-06-18 06:30:00','Emergency WAF rule deployment','Advanced SQLi bypassing current WAF signatures','active'),
('external','Ransomware','Akira Ransomware',98.00,'critical','194.165.16.200','SYSTEM','2026-06-18 05:00:00','Immediate crisis response, CISA notification','Akira ransomware via Cisco VPN zero-day','active'),
('external','Brute Force','Active Directory Attack',84.00,'high','10.0.100.50','ad_anon','2026-06-18 08:00:00','Account lockout tuning, detect and alert on AS-REP','AS-REP Roasting attack against AD accounts','investigating'),
('external','Malware','Zero-Day Exploit',95.00,'critical','unknown','zero_day','2026-06-18 09:30:00','Emergency patching, threat hunting across all hosts','Unknown zero-day exploit in popular web framework','active'),
('external','Phishing','Deepfake Vishing',88.00,'critical','N/A','exec_user','2026-06-18 10:00:00','Verify identity, deepfake detection tools, training','AI-generated deepfake voice call impersonating CEO','investigating'),
('external','XSS','Prototype Pollution',70.00,'high','178.62.200.100','pp_anon','2026-06-18 11:00:00','Freeze prototypes, strict mode, input sanitization','Prototype pollution via JSON merge leading to XSS','investigating'),
('external','Port Scan','Automated Recon',46.00,'low','185.220.101.100','shodan_scan','2026-06-18 12:00:00','Reduce attack surface, honeypots','Shodan-style automated internet scan detected','resolved'),
('internal','Insider Threat','Privileged Access Abuse',87.00,'critical','10.5.0.20','sysadmin','2026-06-18 13:00:00','Emergency access review, PAM deployment','SysAdmin accessing executive emails outside work hours','active'),
('external','DDoS','Multi-Vector DDoS',94.00,'critical','multiple','multi_bot','2026-06-18 14:00:00','Activate full DDoS mitigation stack','Simultaneous L3/L4/L7 DDoS attack in progress','active');

-- ============================================================
-- ATTACK LOGS (sample for first 20 attacks)
-- ============================================================
INSERT INTO attack_logs (attack_id, log_text)
SELECT id, CONCAT('[', DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s'), '] ALERT: ', attack_name, ' detected from ', COALESCE(source_ip, 'unknown'), ' - Severity: ', threat_level)
FROM attacks;

INSERT INTO attack_logs (attack_id, log_text)
SELECT id, CONCAT('[', DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s'), '] SYSTEM: Automated response triggered for ', attack_type, ' attack')
FROM attacks WHERE threat_level IN ('critical', 'high');

-- ============================================================
-- ATTACK TIMELINES (for all attacks)
-- ============================================================
INSERT INTO attack_timelines (attack_id, timestamp, description)
SELECT id,
  DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s'),
  CONCAT('Initial detection: ', attack_name, ' identified by IDS/IPS')
FROM attacks;

INSERT INTO attack_timelines (attack_id, timestamp, description)
SELECT id,
  DATE_FORMAT(DATE_ADD(created_at, INTERVAL 5 MINUTE), '%Y-%m-%d %H:%i:%s'),
  CONCAT('Alert generated: ', threat_level, ' severity threat confirmed - Score: ', threat_score)
FROM attacks;

INSERT INTO attack_timelines (attack_id, timestamp, description)
SELECT id,
  DATE_FORMAT(DATE_ADD(created_at, INTERVAL 10 MINUTE), '%Y-%m-%d %H:%i:%s'),
  CONCAT('Analyst assigned: Investigating ', attack_type, ' from ', COALESCE(source_ip, 'unknown'))
FROM attacks WHERE threat_level IN ('critical', 'high');

INSERT INTO attack_timelines (attack_id, timestamp, description)
SELECT id,
  DATE_FORMAT(DATE_ADD(created_at, INTERVAL 30 MINUTE), '%Y-%m-%d %H:%i:%s'),
  'Incident contained: Threat neutralized and systems secured'
FROM attacks WHERE status = 'resolved';

-- Summary
SELECT 'Seed data inserted successfully!' AS Status;
SELECT COUNT(*) AS TotalAttacks FROM attacks;
SELECT threat_level, COUNT(*) AS Count FROM attacks GROUP BY threat_level ORDER BY Count DESC;
SELECT attack_type, COUNT(*) AS Count FROM attacks GROUP BY attack_type ORDER BY Count DESC;
SELECT status, COUNT(*) AS Count FROM attacks GROUP BY status;
