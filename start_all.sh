#!/bin/bash

###############################################################################
#                    AI Cyber Defender - Startup Script                      #
#                                                                              #
# هذا الملف يقوم بتشغيل جميع خدمات المشروع:                                  #
# 1. قاعدة البيانات (MySQL)                                                   #
# 2. الذكاء الاصطناعي (Flask)                                                 #
# 3. Backend (PHP API)                                                        #
# 4. Frontend (Angular)          
# تشغيل المشروع = ./start_all.sh 
#                          🔑 بيانات الدخول الجاهزة
# username: admin
# password: password                                                    #
###############################################################################

# الألوان للإخراج
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# الرموز
SUCCESS='✅'
ERROR='❌'
INFO='ℹ️'
WAIT='⏳'
ARROW='➜'
SEPARATOR='════════════════════════════════════════'

# المسار الأساسي
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# المتغيرات
declare -A PIDS
SERVICES=()

###############################################################################
# الدوال المساعدة
###############################################################################

print_header() {
    echo -e "\n${BLUE}${SEPARATOR}${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}${SEPARATOR}${NC}\n"
}

print_success() {
    echo -e "${GREEN}${SUCCESS} $1${NC}"
}

print_error() {
    echo -e "${RED}${ERROR} $1${NC}"
}

print_info() {
    echo -e "${CYAN}${INFO} $1${NC}"
}

print_wait() {
    echo -e "${YELLOW}${WAIT} $1${NC}"
}

print_arrow() {
    echo -e "${BLUE}${ARROW} $1${NC}"
}

# فحص إذا كان الأمر موجود
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# فحص إذا كان المنفذ مشغول
port_in_use() {
    netstat -tuln 2>/dev/null | grep -q ":$1 " && return 0 || return 1
}

###############################################################################
# وظائف التحقق
###############################################################################

check_requirements() {
    print_header "🔍 فحص المتطلبات"
    
    local missing=0
    
    if ! command_exists python3; then
        print_error "Python 3 غير مثبت"
        missing=1
    else
        print_success "Python 3 مثبت"
    fi
    
    if ! command_exists php; then
        print_error "PHP غير مثبت"
        missing=1
    else
        print_success "PHP مثبت"
    fi
    
    if ! command_exists node; then
        print_error "Node.js غير مثبت"
        missing=1
    else
        print_success "Node.js مثبت"
    fi
    
    if ! command_exists mysql; then
        print_error "MySQL Client غير مثبت"
        missing=1
    else
        print_success "MySQL Client مثبت"
    fi
    
    if [ $missing -eq 1 ]; then
        print_error "بعض المتطلبات مفقودة. يرجى تثبيتها أولاً."
        exit 1
    fi
}

check_services() {
    print_header "🔧 فحص الخدمات"
    
    if port_in_use 3306; then
        print_success "MySQL متاح على المنفذ 3306"
    else
        print_wait "MySQL غير متاح - سيتم محاولة بدء الخدمة"
    fi
    
    if port_in_use 5000; then
        print_error "المنفذ 5000 مشغول (AI Backend)"
    else
        print_success "المنفذ 5000 متاح"
    fi
    
    if port_in_use 8888; then
        print_error "المنفذ 8888 مشغول (PHP Backend)"
    else
        print_success "المنفذ 8888 متاح"
    fi
    
    if port_in_use 4200; then
        print_error "المنفذ 4200 مشغول (Frontend)"
    else
        print_success "المنفذ 4200 متاح"
    fi
}

###############################################################################
# وظائف التشغيل
###############################################################################

start_mysql() {
    print_header "🗄️  بدء MySQL Server"
    
    if ! command_exists mysql; then
        print_error "MySQL غير مثبت"
        return 1
    fi
    
    print_wait "بدء خدمة MySQL..."
    
    if sudo service mysql start >/dev/null 2>&1; then
        print_success "MySQL بدأ بنجاح"
        sleep 2
        return 0
    else
        print_error "فشل بدء MySQL"
        return 1
    fi
}

start_ai_backend() {
    print_header "🤖 بدء AI Backend (Flask)"
    
    if [ ! -d "$PROJECT_ROOT/AI" ]; then
        print_error "مجلد AI غير موجود"
        return 1
    fi
    
    if [ ! -d "$PROJECT_ROOT/AI/venv" ]; then
        print_error "البيئة الافتراضية غير موجودة. قم بتشغيل: python3 -m venv AI/venv"
        return 1
    fi
    
    if [ ! -f "$PROJECT_ROOT/AI/app.py" ]; then
        print_error "ملف app.py غير موجود"
        return 1
    fi
    
    print_wait "تشغيل Flask على المنفذ 5000..."
    
    cd "$PROJECT_ROOT/AI"
    
    # تشغيل التطبيق في الخلفية
    ./venv/bin/python app.py > /tmp/ai_backend.log 2>&1 &
    local pid=$!
    PIDS["ai_backend"]=$pid
    SERVICES+=("ai_backend")
    
    sleep 3
    
    if ps -p $pid > /dev/null; then
        print_success "AI Backend بدأ بنجاح (PID: $pid)"
        return 0
    else
        print_error "فشل بدء AI Backend"
        cat /tmp/ai_backend.log | tail -10
        return 1
    fi
}

start_php_backend() {
    print_header "🔧 بدء PHP Backend (API)"
    
    if [ ! -d "$PROJECT_ROOT/backend" ]; then
        print_error "مجلد backend غير موجود"
        return 1
    fi
    
    if [ ! -f "$PROJECT_ROOT/backend/index.php" ]; then
        print_error "ملف index.php غير موجود"
        return 1
    fi
    
    print_wait "تشغيل PHP على المنفذ 8888..."
    
    cd "$PROJECT_ROOT/backend"
    
    # تشغيل PHP في الخلفية
    php -S localhost:8888 > /tmp/php_backend.log 2>&1 &
    local pid=$!
    PIDS["php_backend"]=$pid
    SERVICES+=("php_backend")
    
    sleep 2
    
    if ps -p $pid > /dev/null; then
        print_success "PHP Backend بدأ بنجاح (PID: $pid)"
        return 0
    else
        print_error "فشل بدء PHP Backend"
        cat /tmp/php_backend.log | tail -10
        return 1
    fi
}

start_frontend() {
    print_header "🖥️  بدء Frontend (Angular)"
    
    if [ ! -d "$PROJECT_ROOT/frontend" ]; then
        print_error "مجلد frontend غير موجود"
        return 1
    fi
    
    if [ ! -f "$PROJECT_ROOT/frontend/package.json" ]; then
        print_error "ملف package.json غير موجود"
        return 1
    fi
    
    cd "$PROJECT_ROOT/frontend"
    
    if [ ! -d "node_modules" ]; then
        print_wait "تثبيت المكتبات (هذا قد يستغرق وقتاً)..."
        npm install > /tmp/npm_install.log 2>&1
        if [ $? -ne 0 ]; then
            print_error "فشل تثبيت المكتبات"
            return 1
        fi
        print_success "تم تثبيت المكتبات"
    fi
    
    print_wait "تشغيل Angular على المنفذ 4200..."
    
    npm start > /tmp/frontend.log 2>&1 &
    local pid=$!
    PIDS["frontend"]=$pid
    SERVICES+=("frontend")
    
    sleep 5
    
    if ps -p $pid > /dev/null; then
        print_success "Frontend بدأ بنجاح (PID: $pid)"
        return 0
    else
        print_error "فشل بدء Frontend"
        cat /tmp/frontend.log | tail -10
        return 1
    fi
}

###############################################################################
# عرض المعلومات
###############################################################################

display_services_status() {
    print_header "📊 حالة الخدمات"
    
    echo -e "${CYAN}┌─────────────────────────────────────────────────────────┐${NC}"
    echo -e "${CYAN}│ الخدمة              │ الرابط              │ المنفذ │${NC}"
    echo -e "${CYAN}├─────────────────────────────────────────────────────────┤${NC}"
    echo -e "${CYAN}│ MySQL Database      │ localhost:3306      │ 3306  │${NC}"
    echo -e "${CYAN}│ AI Backend (Flask)  │ localhost:5000      │ 5000  │${NC}"
    echo -e "${CYAN}│ PHP Backend (API)   │ localhost:8888      │ 8888  │${NC}"
    echo -e "${CYAN}│ Frontend (Angular)  │ localhost:4200      │ 4200  │${NC}"
    echo -e "${CYAN}└─────────────────────────────────────────────────────────┘${NC}\n"
}

display_quick_links() {
    print_header "🌐 الروابط السريعة"
    
    print_arrow "Frontend Dashboard:   ${BLUE}http://localhost:4200${NC}"
    print_arrow "AI Backend API:       ${BLUE}http://localhost:5000${NC}"
    print_arrow "PHP Backend API:      ${BLUE}http://localhost:8888${NC}"
    print_arrow "MySQL Workbench:      ${BLUE}localhost:3306${NC}"
    echo ""
}

display_process_info() {
    print_header "🔄 معلومات العمليات"
    
    for service in "${SERVICES[@]}"; do
        local pid=${PIDS[$service]}
        if ps -p $pid > /dev/null 2>&1; then
            print_arrow "$service (PID: $pid) - ${GREEN}يعمل${NC}"
        else
            print_arrow "$service (PID: $pid) - ${RED}متوقف${NC}"
        fi
    done
    echo ""
}

display_logs() {
    echo -e "\n${YELLOW}📝 السجلات:${NC}"
    echo -e "  ${BLUE}• AI Backend:${NC}  /tmp/ai_backend.log"
    echo -e "  ${BLUE}• PHP Backend:${NC}  /tmp/php_backend.log"
    echo -e "  ${BLUE}• Frontend:${NC}     /tmp/frontend.log"
    echo ""
}

###############################################################################
# وظائف الإيقاف
###############################################################################

stop_services() {
    print_header "🛑 إيقاف الخدمات"
    
    for service in "${SERVICES[@]}"; do
        local pid=${PIDS[$service]}
        if ps -p $pid > /dev/null 2>&1; then
            print_wait "إيقاف $service (PID: $pid)..."
            kill $pid 2>/dev/null
            wait $pid 2>/dev/null
            print_success "$service تم إيقافه"
        fi
    done
    
    # إيقاف MySQL (اختياري)
    if command_exists mysql; then
        print_wait "إيقاف MySQL..."
        sudo service mysql stop >/dev/null 2>&1
        print_success "MySQL تم إيقافه"
    fi
    
    print_success "جميع الخدمات تم إيقافها"
}

cleanup() {
    print_info "تنظيف..."
    stop_services
    echo ""
}

###############################################################################
# البرنامج الرئيسي
###############################################################################

main() {
    clear
    
    print_header "🚀 AI Cyber Defender - Startup Script"
    
    # فحص المتطلبات
    check_requirements
    sleep 1
    
    # فحص الخدمات
    check_services
    sleep 1
    
    # معالجة Ctrl+C
    trap cleanup SIGINT SIGTERM
    
    # بدء الخدمات
    start_mysql || print_wait "تجاوز MySQL (قد يكون مشغلاً بالفعل)"
    sleep 1
    
    start_ai_backend || exit 1
    sleep 1
    
    start_php_backend || exit 1
    sleep 1
    
    start_frontend || exit 1
    sleep 1
    
    # عرض المعلومات النهائية
    display_services_status
    display_quick_links
    display_process_info
    display_logs
    
    print_header "✨ جميع الخدمات جاهزة!"
    
    echo -e "${GREEN}${SEPARATOR}${NC}"
    echo -e "${GREEN}جميع الخدمات تعمل بنجاح! 🎉${NC}"
    echo -e "${GREEN}${SEPARATOR}${NC}"
    echo ""
    
    echo -e "${YELLOW}💡 نصائح:${NC}"
    echo -e "  • اضغط Ctrl+C لإيقاف جميع الخدمات"
    echo -e "  • يمكنك عرض السجلات باستخدام: tail -f /tmp/*.log"
    echo -e "  • لإعادة تشغيل خدمة، انتظر ثم اضغط Ctrl+C وشغل الملف مرة أخرى"
    echo ""
    
    # الانتظار
    wait
}

# تشغيل البرنامج
main
