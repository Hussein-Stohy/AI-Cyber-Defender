# 🎯 أوامر التشغيل السريعة

## تشغيل MySQL

```bash
# بدء خدمة MySQL
sudo service mysql start

# إيقاف خدمة MySQL
sudo service mysql stop

# التحقق من حالة MySQL
sudo service mysql status

# الدخول إلى MySQL
mysql -u root -p
```

## تشغيل AI Backend (Flask)

### بدء التشغيل

```bash
# الذهاب إلى المجلد
cd AI

# تفعيل البيئة الافتراضية
source venv/bin/activate

# تشغيل التطبيق
python app.py
```

### الملف الكامل (نسخ والصق):
```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/AI && source venv/bin/activate && python app.py
```

**الرابط:** http://localhost:5000

---

## تشغيل PHP Backend (API)

### بدء التشغيل

```bash
# الذهاب إلى المجلد
cd backend

# تشغيل خادم PHP
php -S localhost:8888

# لتشغيل على منفذ آخر:
php -S localhost:9000
```

### الملف الكامل (نسخ والصق):
```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/backend && php -S localhost:8888
```

**الرابط:** http://localhost:8888

---

## تشغيل Frontend (Angular)

### بدء التشغيل

```bash
# الذهاب إلى المجلد
cd frontend

# تثبيت المكتبات (للمرة الأولى فقط)
npm install

# تشغيل خادم التطوير
npm start
# أو
ng serve
```

### الملف الكامل (نسخ والصق):
```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/frontend && npm start
```

**الرابط:** http://localhost:4200

---

## تشغيل Script شامل لجميع الخدمات

### الخطوة 1: إعطاء صلاحيات التنفيذ

```bash
chmod +x start_all.sh
```

### الخطوة 2: تشغيل Script

```bash
./start_all.sh
```

أو من أي مجلد:

```bash
bash /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/start_all.sh
```

---

## 🔗 اختصارات سريعة

### نسخ والصق جميع الأوامر

#### Terminal 1 - MySQL

```bash
sudo service mysql start
```

#### Terminal 2 - AI Backend

```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/AI && source venv/bin/activate && python app.py
```

#### Terminal 3 - PHP Backend

```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/backend && php -S localhost:8888
```

#### Terminal 4 - Frontend

```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/frontend && npm start
```

---

## 📋 قائمة التحقق

- [ ] MySQL يعمل على 3306
- [ ] AI Backend يعمل على 5000
- [ ] PHP Backend يعمل على 8888
- [ ] Frontend يعمل على 4200

---

## 🌐 الروابط المتاحة

| الخدمة | الرابط |
|--------|--------|
| Dashboard | http://localhost:4200 |
| AI API | http://localhost:5000 |
| PHP API | http://localhost:8888 |
| MySQL | localhost:3306 |

---

## 🔧 استكشاف الأخطاء

### المنفذ مشغول

```bash
# معرفة العملية التي تستخدم المنفذ
lsof -i :8888

# إيقاف العملية
kill -9 <PID>
```

### إعادة تشغيل سريعة

```bash
# في Terminal الحالي
cd AI && source venv/bin/activate && python app.py
# اضغط Ctrl+C ثم شغل مرة أخرى
```

### عرض السجلات

```bash
tail -f /tmp/ai_backend.log
tail -f /tmp/php_backend.log
tail -f /tmp/frontend.log
```

---

## ⚡ أوامر مفيدة إضافية

### فحص حالة جميع المنافذ

```bash
netstat -tuln | grep LISTEN
```

### إعادة تشغيل البيئة الافتراضية

```bash
cd AI
deactivate  # إذا كانت مفعلة
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### حذف وإعادة إنشاء قاعدة البيانات

```bash
sudo mysql -u root -e "DROP DATABASE IF EXISTS ai_cyber_defender;"
sudo mysql -u root -e "CREATE DATABASE ai_cyber_defender CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -u root ai_cyber_defender < /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/backend/schema.sql
```

---

**آخر تحديث:** 2026-06-11
