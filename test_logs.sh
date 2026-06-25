#!/bin/bash
# ═══════════════════════════════════════════════════════════
# AI Cyber Defender — Test Log Simulator
# يضيف logs تجريبية لملف live_logs.txt بشكل تدريجي
# ═══════════════════════════════════════════════════════════

LOG_FILE="live_logs.txt"
DELAY=3  # seconds between each log

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  🧪 Test Log Simulator — AI Cyber Defender"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "  سيتم إرسال logs متنوعة كل ${DELAY} ثواني..."
echo "  تأكد إن الـ log_agent.py شغال في terminal ثاني"
echo ""
echo "  ─────────────────────────────────────────────────────"
echo ""

# Safe Windows login
echo -e "${GREEN}[1/8] ✅ Sending safe Windows login...${NC}"
echo '2024-04-17 09:14:02 Security EventID=4624 An account was successfully logged on User=Ahmed SRC=192.168.1.20' >> $LOG_FILE
sleep $DELAY

# Failed login (ATTACK)
echo -e "${RED}[2/8] 🚨 Sending brute force attack...${NC}"
echo '2024-04-17 11:50:03 Security EventID=4625 An account failed to log on User=Administrator SRC=185.234.219.5 FailureReason=Unknown user or bad password' >> $LOG_FILE
sleep $DELAY

# Safe web request
echo -e "${GREEN}[3/8] ✅ Sending safe web request...${NC}"
echo 'GET /home HTTP/1.1' >> $LOG_FILE
sleep $DELAY

# SQL Injection (ATTACK)
echo -e "${RED}[4/8] 🚨 Sending SQL injection attack...${NC}"
echo "GET /login?username=admin' OR 1=1--&password=x HTTP/1.1" >> $LOG_FILE
sleep $DELAY

# Safe network traffic
echo -e "${GREEN}[5/8] ✅ Sending safe network traffic...${NC}"
echo 'Apr 17 09:14:02 fw01 ACCEPT IN=eth0 OUT= SRC=192.168.1.20 DST=10.0.0.5 LEN=60 PROTO=TCP SPT=52344 DPT=443 ACK' >> $LOG_FILE
sleep $DELAY

# SYN Flood (ATTACK)
echo -e "${RED}[6/8] 🚨 Sending SYN flood attack...${NC}"
echo 'May 3 14:05:23 fw01 kernel: [SYN Flood] DROP IN=eth0 OUT= SRC=185.220.101.45 DST=10.0.0.1 LEN=44 PROTO=TCP SPT=52301 DPT=80 WINDOW=65535 SYN' >> $LOG_FILE
sleep $DELAY

# Privilege Enumeration (ATTACK)
echo -e "${RED}[7/8] 🚨 Sending privilege enumeration...${NC}"
echo '2024-04-17 11:50:24 Security EventID=4799 A security-enabled local group membership was enumerated User=Administrator SRC=185.234.219.5' >> $LOG_FILE
sleep $DELAY

# PowerShell suspicious process (ATTACK)
echo -e "${RED}[8/8] 🚨 Sending suspicious process execution...${NC}"
echo '2024-04-17 11:50:30 Security EventID=4688 A new process has been created Process=powershell.exe User=Administrator SRC=185.234.219.5' >> $LOG_FILE

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  ✨ Done! All 8 test logs sent."
echo "  📊 Check the dashboard: http://localhost:4200"
echo "═══════════════════════════════════════════════════════"
echo ""
