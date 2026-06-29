#!/usr/bin/env python3
"""
╔═══════════════════════════════════════════════════════════════╗
║           AI Cyber Defender — Live Log Monitoring Agent       ║
║                                                               ║
║  يراقب ملف logs بشكل حي ويبعث كل سطر جديد للـ Backend        ║
║  الـ Backend يحلله بالذكاء الاصطناعي ويحفظ التهديدات          ║
║                                                               ║
║  الاستخدام:                                                   ║
║    python3 log_agent.py                                       ║
║    python3 log_agent.py --file /var/log/auth.log              ║
║    python3 log_agent.py --source network                      ║
╚═══════════════════════════════════════════════════════════════╝
"""

import time
import argparse
import requests
from pathlib import Path
from datetime import datetime

# ═══════════════════════════════════════
# Configuration
# ═══════════════════════════════════════
BACKEND_URL = "http://127.0.0.1:8888/api/ingest-logs"
DEFAULT_LOG_FILE = "live_logs.txt"
DEFAULT_SOURCE = "windows"
POLL_INTERVAL = 0.5  # seconds between checks

# Colors for terminal output
class Colors:
    RED    = "\033[91m"
    GREEN  = "\033[92m"
    YELLOW = "\033[93m"
    BLUE   = "\033[94m"
    CYAN   = "\033[96m"
    BOLD   = "\033[1m"
    RESET  = "\033[0m"


def print_banner():
    print(f"""
{Colors.CYAN}╔═══════════════════════════════════════════════════════════╗
║  {Colors.BOLD}🛡️  AI Cyber Defender — Live Log Agent{Colors.RESET}{Colors.CYAN}                   ║
╚═══════════════════════════════════════════════════════════╝{Colors.RESET}
""")


def print_status(msg, color=Colors.GREEN):
    ts = datetime.now().strftime("%H:%M:%S")
    print(f"  {Colors.BOLD}[{ts}]{Colors.RESET} {color}{msg}{Colors.RESET}")


def send_log(log_line, source):
    """Send a single log line to the backend for AI analysis."""
    payload = {
        "source": source,
        "logs": [log_line]
    }

    try:
        res = requests.post(BACKEND_URL, json=payload, timeout=10)
        data = res.json()

        if res.status_code == 200 and "data" in data:
            results = data["data"].get("results", [])
            alerts_saved = data["data"].get("alerts_saved", 0)

            for r in results:
                status = r.get("status", "unknown")

                if status == "alert":
                    attack_type = r.get("attack_type", "unknown")
                    threat_level = r.get("threat_level", "low")
                    threat_score = r.get("threat_score", 0)
                    source_ip = r.get("source_ip", "N/A")
                    attack_id = r.get("attack_id", "?")

                    level_color = {
                        "critical": Colors.RED,
                        "high": Colors.RED,
                        "medium": Colors.YELLOW,
                        "low": Colors.GREEN
                    }.get(threat_level, Colors.YELLOW)

                    print_status(f"🚨 ALERT — {attack_type}", Colors.RED)
                    print(f"           {level_color}Threat: {threat_level.upper()} (score: {threat_score}){Colors.RESET}")
                    print(f"           IP: {source_ip} | DB ID: #{attack_id}")
                    print(f"           📊 Dashboard updated automatically!")
                    print()

                elif status == "safe":
                    score = r.get("threat_score", 0)
                    print_status(f"✅ SAFE — Normal activity (score: {score})")

                else:
                    print_status(f"⚠️  {r.get('message', 'Unknown response')}", Colors.YELLOW)

            return alerts_saved
        else:
            error = data.get("error", res.text[:100])
            print_status(f"❌ Backend error: {error}", Colors.RED)
            return 0

    except requests.exceptions.ConnectionError:
        print_status("❌ Cannot connect to backend at " + BACKEND_URL, Colors.RED)
        print_status("   Make sure the backend is running (./start_all.sh)", Colors.YELLOW)
        return 0
    except Exception as e:
        print_status(f"❌ Error: {e}", Colors.RED)
        return 0


def follow_file(filepath, source):
    """Watch a file for new lines (tail -f behavior)."""
    path = Path(filepath)

    # Create file if doesn't exist
    path.touch(exist_ok=True)

    print_status(f"📁 Watching file: {path.resolve()}", Colors.BLUE)
    print_status(f"📡 Source type: {source}", Colors.BLUE)
    print_status(f"🌐 Backend URL: {BACKEND_URL}", Colors.BLUE)
    print()
    print(f"  {Colors.BOLD}{Colors.CYAN}💡 Add logs to '{filepath}' and they'll be analyzed in real-time!{Colors.RESET}")
    print(f"  {Colors.BOLD}{Colors.CYAN}   Example: echo '2024-04-17 EventID=4625 Failed login User=admin SRC=185.234.219.5' >> {filepath}{Colors.RESET}")
    print()
    print(f"  {Colors.BOLD}{'─' * 60}{Colors.RESET}")
    print()

    total_alerts = 0

    with open(path, "r", encoding="utf-8", errors="replace") as f:
        # Jump to end of file (only watch NEW lines)
        f.seek(0, 2)

        while True:
            line = f.readline()

            if not line:
                time.sleep(POLL_INTERVAL)
                continue

            log = line.strip()
            if not log:
                continue

            print_status(f"📥 Received log: {log[:80]}{'...' if len(log) > 80 else ''}", Colors.CYAN)

            alerts = send_log(log, source)
            total_alerts += alerts


def main():
    global BACKEND_URL
    parser = argparse.ArgumentParser(
        description="AI Cyber Defender — Live Log Monitoring Agent"
    )
    parser.add_argument(
        "--file", "-f",
        default=DEFAULT_LOG_FILE,
        help=f"Log file to monitor (default: {DEFAULT_LOG_FILE})"
    )
    parser.add_argument(
        "--source", "-s",
        default=DEFAULT_SOURCE,
        choices=["windows", "web", "network", "auto"],
        help=f"Log source type (default: {DEFAULT_SOURCE})"
    )
    parser.add_argument(
        "--url",
        default=BACKEND_URL,
        help=f"Backend URL (default: {BACKEND_URL})"
    )

    args = parser.parse_args()

    BACKEND_URL = args.url

    print_banner()

    # Quick connectivity check
    try:
        requests.get("http://127.0.0.1:8888/api/auth/login", timeout=2)
    except Exception:
        print_status("⚠️  Backend may not be running. Start it with ./start_all.sh", Colors.YELLOW)
        print()

    try:
        follow_file(args.file, args.source)
    except KeyboardInterrupt:
        print()
        print_status("🛑 Agent stopped.", Colors.YELLOW)
        print()


if __name__ == "__main__":
    main()
