# 🚀 دليل تشغيل مشروع AI Cyber Defender

## المتطلبات المسبقة
- Python 3.14+
- PHP 8.2+
- Node.js & npm
- MySQL Server
- Git (اختياري)

---

## 📋 خطوات التشغيل

### 1️⃣ تشغيل AI Backend (Python Flask)

```bash
# الذهاب إلى مجلد AI
cd AI

# تفعيل البيئة الافتراضية
source venv/bin/activate
# أو على Windows:
# venv\Scripts\activate

# تشغيل خادم Flask
./venv/bin/python app.py

# أو بعد تفعيل البيئة:
python app.py
```

**الرابط:** http://localhost:5000

**المنفذ:** 5000

**الوضع:** Development Server

---

### 2️⃣ تشغيل Backend (PHP API)

```bash
# التأكد من تشغيل MySQL
sudo service mysql start

# الذهاب إلى مجلد Backend
cd backend

# تشغيل خادم PHP
php -S localhost:8888
```

**الرابط:** http://localhost:8888

**المنفذ:** 8888

**قاعدة البيانات:** `ai_cyber_defender`

---

### 3️⃣ تشغيل Frontend (Angular)

```bash
# الذهاب إلى مجلد Frontend
cd frontend

# تثبيت المكتبات (للمرة الأولى فقط)
npm install

# تشغيل خادم التطوير
npm start
# أو
ng serve
```

**الرابط:** http://localhost:4200

**المنفذ:** 4200

---

## 🔄 تشغيل جميع الخدمات في نفس الوقت

### خيار 1: استخدام Script Bash

```bash
#!/bin/bash

# تشغيل MySQL
echo "🔄 Starting MySQL..."
sudo service mysql start

# تشغيل AI Backend
echo "🔄 Starting AI Backend (Flask)..."
cd AI
source venv/bin/activate
./venv/bin/python app.py &
AI_PID=$!
echo "✅ AI Backend started (PID: $AI_PID)"

# تشغيل PHP Backend
echo "🔄 Starting PHP Backend..."
cd ../backend
php -S localhost:8888 &
PHP_PID=$!
echo "✅ PHP Backend started (PID: $PHP_PID)"

# تشغيل Frontend
echo "🔄 Starting Frontend..."
cd ../frontend
npm start &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "════════════════════════════════════════"
echo "✨ جميع الخدمات قيد التشغيل!"
echo "════════════════════════════════════════"
echo ""
echo "🌐 الروابط المتاحة:"
echo "   • Frontend:      http://localhost:4200"
echo "   • AI Backend:    http://localhost:5000"
echo "   • PHP Backend:   http://localhost:8888"
echo "   • MySQL:         localhost:3306"
echo ""
echo "📝 لإيقاف الخدمات:"
echo "   kill $AI_PID $PHP_PID $FRONTEND_PID"
echo ""

# الانتظار لإيقاف البرنامج
wait
```

### خيار 2: استخدام Docker Compose (اختياري)

يمكن إنشاء ملف `docker-compose.yml` لتشغيل جميع الخدمات في حاويات منفصلة.

---

## 📊 حالة الخدمات

| الخدمة | الرابط | المنفذ | الحالة |
|--------|--------|--------|--------|
| **Frontend (Angular)** | http://localhost:4200 | 4200 | ⏳ جاهز للتشغيل |
| **AI Backend (Flask)** | http://localhost:5000 | 5000 | ✅ يعمل |
| **PHP Backend (API)** | http://localhost:8888 | 8888 | ✅ يعمل |
| **MySQL Database** | localhost:3306 | 3306 | ✅ يعمل |

---

## 🗄️ قاعدة البيانات

### معلومات الاتصال
```
Host: localhost
Port: 3306
Database: ai_cyber_defender
User: root
Password: (فارغة)
```

### الجداول الرئيسية
- `users` - بيانات المستخدمين
- `tokens` - رموز المصادقة
- `attacks` - سجلات الهجمات
- `attack_logs` - تفاصيل السجلات
- `attack_timelines` - المخطط الزمني

### إعادة تعيين قاعدة البيانات
```bash
sudo mysql -u root -e "DROP DATABASE IF EXISTS ai_cyber_defender;"
sudo mysql -u root -e "CREATE DATABASE ai_cyber_defender CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -u root ai_cyber_defender < backend/schema.sql
```

---

## 🛠️ استكشاف الأخطاء

### الخطأ: Address already in use

```bash
# البحث عن العملية التي تستخدم المنفذ
lsof -i :8888
# أو
netstat -tuln | grep 8888

# إيقاف العملية
kill -9 <PID>
```

### الخطأ: Permission denied (MySQL)

```bash
# استخدام sudo
sudo service mysql start
# أو
sudo systemctl start mysql
```

### الخطأ: Module not found (Python)

```bash
# تفعيل البيئة الافتراضية
source venv/bin/activate

# إعادة تثبيت المكتبات
pip install -r requirements.txt
```

---

## 📝 ملاحظات مهمة

### للتطوير
- استخدم Debug Mode في Flask: `FLASK_ENV=development`
- استخدم Watch Mode في Angular: `ng serve --watch`
- استخدم Live Reload في PHP: `php -S localhost:8888 -t .`

### للإنتاج
- استخدم Gunicorn أو uWSGI للـ Flask
- استخدم Apache أو Nginx للـ PHP
- استخدم `npm run build` للـ Angular
- استخدم SSL/TLS للاتصالات الآمنة

### الملفات المهمة
- `AI/requirements.txt` - المكتبات المطلوبة للـ AI
- `backend/schema.sql` - مخطط قاعدة البيانات
- `frontend/package.json` - المكتبات المطلوبة للـ Frontend

---

## ✅ الخطوات المكتملة

- ✅ تثبيت Python و المكتبات
- ✅ تشغيل AI Backend (Flask)
- ✅ تثبيت PHP و MySQL
- ✅ إنشاء قاعدة البيانات
- ✅ تشغيل PHP Backend
- ⏳ تشغيل Frontend (في الانتظار)

---

## 🚀 الخطوات التالية

1. فعّل البيئة الافتراضية في Python
2. ابدأ تشغيل جميع الخدمات
3. اختبر الاتصالات
4. انقر على الروابط أعلاه

---

**آخر تحديث:** 2026-06-11
**الإصدار:** 1.0.0
