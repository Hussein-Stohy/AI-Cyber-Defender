# 🔧 ملف الإعدادات والمتغيرات

تحتوي هذه الملفات على كل المعلومات المتعلقة بالإعدادات والمتغيرات البيئية

---

## 📝 معلومات النظام

```
النظام الحالي: Linux
توزيعة: Ubuntu/Debian
الإصدار: آخر إصدار
```

---

## 🐍 معلومات Python

```
الإصدار المثبت: 3.14.4
مسار التثبيت: /usr/bin/python3
البيئة الافتراضية: AI/venv/
الحالة: ✅ يعمل
```

### مكتبات Python المثبتة

```
pandas                   3.0.3
numpy                    2.4.6
scikit-learn             1.9.0
scipy                    1.17.1
matplotlib               3.10.9
jupyter                  1.1.1
notebook                 7.5.7
xgboost                  3.2.0
joblib                   1.5.3
tldextract               5.3.1
flask                    3.1.3
requests                 2.34.2
```

---

## 🐘 معلومات PHP

```
الإصدار المثبت: 8.5.4
مسار التثبيت: /usr/bin/php
الحالة: ✅ يعمل
```

### الإضافات المتاحة

```
mysql/mysqli (للاتصال بـ MySQL)
curl
json
pdo
xml
```

---

## 🗄️ معلومات MySQL

```
الإصدار المثبت: آخر إصدار
الحالة: ✅ يعمل
المنفذ: 3306
الخادم: localhost
المستخدم الافتراضي: root
كلمة المرور: (فارغة)
```

### قاعدة البيانات الرئيسية

```
اسم قاعدة البيانات: ai_cyber_defender
الترميز: utf8mb4
Collation: utf8mb4_unicode_ci
```

### الجداول

```sql
-- المستخدمون
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- الرموز
CREATE TABLE tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(64) UNIQUE NOT NULL,
    expires_at TIMESTAMP NULL
);

-- الهجمات
CREATE TABLE attacks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    source_type VARCHAR(50),
    attack_type VARCHAR(100),
    threat_level VARCHAR(50),
    threat_score DECIMAL(5,2),
    source_ip VARCHAR(45),
    username VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- سجلات الهجمات
CREATE TABLE attack_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    attack_id INT NOT NULL,
    log_text TEXT NOT NULL
);

-- خط زمني للهجمات
CREATE TABLE attack_timelines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    attack_id INT NOT NULL,
    timestamp VARCHAR(100),
    description TEXT
);
```

---

## 🌐 معلومات Node.js (Frontend)

```
الإصدار: 14+ (يحتاج تثبيت)
npm: آخر إصدار
الحالة: ⏳ يحتاج تثبيت
```

### الحزم المطلوبة

```json
{
    "@angular/core": "^16.0.0",
    "@angular/common": "^16.0.0",
    "typescript": "~5.1.0",
    "tailwindcss": "^3.3.0",
    "ng-bootstrap": "^14.0.0"
}
```

---

## 🚀 معلومات الخدمات

### AI Backend (Flask)

```
النوع: Python Web Framework
المنفذ: 5000
الرابط: http://localhost:5000
ملف البدء: AI/app.py
البيئة الافتراضية: AI/venv/
الحالة: ✅ يعمل
```

### PHP Backend

```
النوع: PHP API Server
المنفذ: 8888
الرابط: http://localhost:8888
ملف البدء: backend/index.php
قاعدة البيانات: ai_cyber_defender
الحالة: ✅ يعمل
```

### Frontend

```
النوع: Angular Application
المنفذ: 4200
الرابط: http://localhost:4200
ملف البدء: frontend/src/main.ts
المجلد: frontend/
الحالة: ⏳ جاهز للتشغيل
```

### MySQL Database

```
النوع: Relational Database
المنفذ: 3306
الحالة: ✅ يعمل
قاعدة البيانات: ai_cyber_defender
```

---

## 📂 مسارات المهمة

```
المشروع الجذر: /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/

AI Backend:
  └─ /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/AI/

PHP Backend:
  └─ /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/backend/

Frontend:
  └─ /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/frontend/

المكتبات:
  └─ AI: /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/AI/venv/
  └─ Frontend: /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/frontend/node_modules/

قاعدة البيانات:
  └─ /var/lib/mysql/ai_cyber_defender/
```

---

## 🔐 الأوراق الاعتماد

### MySQL

```
المستخدم: root
كلمة المرور: (فارغة)
Host: localhost
Port: 3306
Database: ai_cyber_defender
```

### PHP API

```
طريقة المصادقة: Token-based
رأس التحقق: Authorization: Bearer <token>
```

### Flask API

```
طريقة المصادقة: JSON-based
Content-Type: application/json
```

---

## 🌍 متغيرات البيئة

### للتطوير

```bash
# Python
export FLASK_ENV=development
export FLASK_DEBUG=1

# Node.js
export NODE_ENV=development

# PHP
export APP_ENV=development
```

### للإنتاج

```bash
# Python
export FLASK_ENV=production
export FLASK_DEBUG=0

# Node.js
export NODE_ENV=production

# PHP
export APP_ENV=production
```

---

## 📊 تكوين الملفات

### AI/requirements.txt

```
pandas>=2.0.0
numpy>=1.24.0
scikit-learn>=1.3.0
tensorflow>=2.13.0
flask>=3.0.0
jupyter>=1.0.0
```

### backend/config/database.php

```php
$host = getenv('DB_HOST') ?: "localhost";
$db_name = getenv('DB_DATABASE') ?: "ai_cyber_defender";
$username = getenv('DB_USERNAME') ?: "root";
$password = getenv('DB_PASSWORD') ?: "";
$port = getenv('DB_PORT') ?: "3306";
```

### frontend/package.json

```json
{
    "scripts": {
        "start": "ng serve",
        "build": "ng build",
        "test": "ng test"
    }
}
```

---

## 🛠️ الأدوات المساعدة

### للفحص والمراقبة

```bash
# عرض المنافذ المستخدمة
netstat -tuln | grep LISTEN

# عرض العمليات الجارية
ps aux | grep -E "python|php|node"

# عرض استهلاك الموارد
top

# عرض سجلات النظام
sudo journalctl -u mysql
sudo journalctl -u apache2
```

### للاختبار

```bash
# اختبار الاتصال بـ MySQL
mysql -u root -e "SELECT 1;"

# اختبار Flask API
curl http://localhost:5000/

# اختبار PHP API
curl http://localhost:8888/

# اختبار Frontend
curl http://localhost:4200/
```

---

## 📈 قائمة التحقق

- [ ] Python 3.14+ مثبت
- [ ] PHP 8.5.4 مثبت
- [ ] Node.js 14+ مثبت
- [ ] MySQL يعمل
- [ ] البيئة الافتراضية تم إنشاؤها
- [ ] المكتبات مثبتة
- [ ] قاعدة البيانات تم إنشاؤها
- [ ] الجداول تم إنشاؤها
- [ ] الخدمات تعمل بشكل صحيح

---

## 🔄 إعادة تعيين الإعدادات

### إعادة تعيين البيئة الافتراضية

```bash
cd AI
deactivate
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### إعادة تعيين Node.js

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### إعادة تعيين قاعدة البيانات

```bash
sudo mysql -u root -e "DROP DATABASE IF EXISTS ai_cyber_defender;"
sudo mysql -u root -e "CREATE DATABASE ai_cyber_defender CHARACTER SET utf8mb4;"
sudo mysql -u root ai_cyber_defender < backend/schema.sql
```

---

## 📞 جهات الاتصال للدعم

**البريد:** support@ai-cyber-defender.local
**الموقع:** http://localhost:4200
**التوثيق:** STARTUP_GUIDE.md

---

**آخر تحديث:** 2026-06-11
**الإصدار:** 1.0.0
