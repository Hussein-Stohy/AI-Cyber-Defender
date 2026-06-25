#!/bin/bash
# ═══════════════════════════════════════════════════════════
# AI Cyber Defender — Continuous Log Simulator
# يضخ كمية كبيرة من الهجمات والأنشطة بشكل مستمر وبسرعة
# ═══════════════════════════════════════════════════════════

LOG_FILE="live_logs.txt"
DELAY=1.5  # ثانية ونصف بين كل هجوم والآخر ليكون العرض سريع وممتع

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════${NC}"
echo -e "  🧪 ${YELLOW}Continuous Test Log Simulator${NC} — AI Cyber Defender"
echo -e "${CYAN}═══════════════════════════════════════════════════════${NC}"
echo ""
echo "  سيتم ضخ كميات ضخمة ومستمرة من السجلات كل $DELAY ثانية..."
echo "  لإيقاف المحاكي، اضغط على (Ctrl + C)"
echo ""
echo -e "  ─────────────────────────────────────────────────────"
echo ""

COUNTER=1

while true; do
  echo -e "${NC}[Log #$COUNTER] ${GREEN}✅ Sending safe Windows login...${NC}"
  echo "2024-04-17 09:14:02 Security EventID=4624 An account was successfully logged on User=User$COUNTER SRC=192.168.1.$((COUNTER % 255))" >> $LOG_FILE
  sleep $DELAY

  echo -e "${NC}[Log #$((COUNTER+1))] ${RED}🚨 Sending brute force attack...${NC}"
  echo "2024-04-17 11:50:03 Security EventID=4625 An account failed to log on User=Administrator SRC=185.234.$((COUNTER % 255)).5 FailureReason=Unknown user or bad password" >> $LOG_FILE
  sleep $DELAY

  echo -e "${NC}[Log #$((COUNTER+2))] ${GREEN}✅ Sending safe web request...${NC}"
  echo "GET /home/page$COUNTER HTTP/1.1" >> $LOG_FILE
  sleep $DELAY

  echo -e "${NC}[Log #$((COUNTER+3))] ${RED}🚨 Sending SQL injection attack...${NC}"
  echo "GET /login?username=admin' OR $COUNTER=$COUNTER--&password=x HTTP/1.1" >> $LOG_FILE
  sleep $DELAY

  echo -e "${NC}[Log #$((COUNTER+4))] ${GREEN}✅ Sending safe network traffic...${NC}"
  echo "Apr 17 09:14:02 fw01 ACCEPT IN=eth0 OUT= SRC=192.168.1.20 DST=10.0.0.5 LEN=60 PROTO=TCP SPT=52344 DPT=443 ACK" >> $LOG_FILE
  sleep $DELAY

  echo -e "${NC}[Log #$((COUNTER+5))] ${RED}🚨 Sending SYN flood attack...${NC}"
  echo "May 3 14:05:23 fw01 kernel: [SYN Flood] DROP IN=eth0 OUT= SRC=185.220.101.$((COUNTER % 255)) DST=10.0.0.1 LEN=44 PROTO=TCP SPT=52301 DPT=80 WINDOW=65535 SYN" >> $LOG_FILE
  sleep $DELAY

  echo -e "${NC}[Log #$((COUNTER+6))] ${RED}🚨 Sending privilege enumeration...${NC}"
  echo "2024-04-17 11:50:24 Security EventID=4799 A security-enabled local group membership was enumerated User=Attacker$COUNTER SRC=185.234.219.5" >> $LOG_FILE
  sleep $DELAY

  echo -e "${NC}[Log #$((COUNTER+7))] ${RED}🚨 Sending suspicious process execution...${NC}"
  echo "2024-04-17 11:50:30 Security EventID=4688 A new process has been created Process=powershell.exe User=Administrator SRC=185.234.219.5" >> $LOG_FILE
  sleep $DELAY
  
  # XSS Attack
  echo -e "${NC}[Log #$((COUNTER+8))] ${RED}🚨 Sending Cross-Site Scripting (XSS)...${NC}"
  echo "GET /search?q=<script>alert('XSS_$COUNTER')</script> HTTP/1.1" >> $LOG_FILE
  sleep $DELAY

  # Data Exfiltration Network Log
  echo -e "${NC}[Log #$((COUNTER+9))] ${RED}🚨 Sending massive Data Exfiltration traffic...${NC}"
  echo "May 3 16:00:23 fw01 ACCEPT IN=eth0 OUT= SRC=10.0.0.5 DST=185.220.101.$((COUNTER % 255)) LEN=99999 PROTO=TCP SPT=443 DPT=80 ACK" >> $LOG_FILE
  sleep $DELAY

  COUNTER=$((COUNTER + 10))
done
