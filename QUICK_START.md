# 🎯 ملف الأوامر السريعة

هذا الملف يحتوي على أوامر التشغيل السريعة لجميع خدمات المشروع.

## ⚡ نسخ والصق الأوامر

### 1️⃣ تشغيل MySQL فقط

```bash
sudo service mysql start
```

---

### 2️⃣ تشغيل AI Backend (Flask)

نسخ الأمر الكامل:
```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/AI && source venv/bin/activate && python app.py
```

أو خطوة بخطوة:
```bash
cd AI
source venv/bin/activate
python app.py
```

**النتيجة:** AI يعمل على http://localhost:5000

---

### 3️⃣ تشغيل PHP Backend (API)

نسخ الأمر الكامل:
```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/backend && php -S localhost:8888
```

أو خطوة بخطوة:
```bash
cd backend
php -S localhost:8888
```

**النتيجة:** Backend يعمل على http://localhost:8888

---

### 4️⃣ تشغيل Frontend (Angular)

نسخ الأمر الكامل:
```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/frontend && npm start
```

أو خطوة بخطوة:
```bash
cd frontend
npm install  # إذا كان أول مرة
npm start
```

**النتيجة:** Frontend يعمل على http://localhost:4200

---

### 5️⃣ تشغيل جميع الخدمات بأمر واحد

```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender && bash start_all.sh
```

أو:
```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender && ./start_all.sh
```

---

## 📊 جدول الأوامر

| الخدمة | الأمر | المنفذ | الرابط |
|--------|------|--------|--------|
| **MySQL** | `sudo service mysql start` | 3306 | localhost:3306 |
| **AI** | `cd AI && source venv/bin/activate && python app.py` | 5000 | http://localhost:5000 |
| **PHP** | `cd backend && php -S localhost:8888` | 8888 | http://localhost:8888 |
| **Frontend** | `cd frontend && npm start` | 4200 | http://localhost:4200 |
| **الكل** | `bash start_all.sh` | جميعها | جميعها |

---

## 🖥️ أفضل الطرق للتشغيل

### الطريقة 1️⃣: 4 Terminals (الأفضل)

استخدم 4 Terminals منفصلة:

**Terminal 1:**
```bash
sudo service mysql start
```

**Terminal 2:**
```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/AI && source venv/bin/activate && python app.py
```

**Terminal 3:**
```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/backend && php -S localhost:8888
```

**Terminal 4:**
```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/frontend && npm start
```

### الطريقة 2️⃣: Script واحد (السهل)

```bash
cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender && ./start_all.sh
```

### الطريقة 3️⃣: Screen أو Tmux (المتقدم)

```bash
# استخدام Screen
screen -S ai_cyber_defender

# قسّم الـ screen وشغّل الخدمات المختلفة في كل قسم
```

---

## 🌐 الروابط بعد التشغيل

انسخ والصق الروابط في المتصفح:

```
http://localhost:4200      ← Dashboard (Frontend)
http://localhost:5000      ← AI API (Flask)
http://localhost:8888      ← Backend API (PHP)
http://localhost:3306      ← Database (MySQL)
```

---

## ❌ إيقاف الخدمات

### إيقاف منفرد

```bash
# AI: اضغط Ctrl+C في Terminal
# PHP: اضغط Ctrl+C في Terminal
# Frontend: اضغط Ctrl+C في Terminal
# MySQL:
sudo service mysql stop
```

### إيقاف script

```bash
# اضغط Ctrl+C في Terminal الذي يعمل عليه start_all.sh
```

---

## 🔄 إعادة التشغيل

### إعادة خدمة واحدة

```bash
# في Terminal الخدمة، اضغط Ctrl+C ثم شغّل الأمر مرة أخرى
cd AI && source venv/bin/activate && python app.py
```

### إعادة جميع الخدمات

```bash
# اضغط Ctrl+C في start_all.sh ثم شغّله مرة أخرى
./start_all.sh
```

---

## 🆘 استكشاف المشاكل

### خطأ: "Address already in use"

```bash
# اعرف العملية التي تستخدم المنفذ
lsof -i :8888

# اقتل العملية
kill -9 <PID>
```

### خطأ: "command not found"

```bash
# تأكد أنك في المجلد الصحيح
pwd

# تفعيل البيئة الافتراضية إذا لزم الأمر
source venv/bin/activate
```

### خطأ: "Connection refused"

```bash
# تأكد من تشغيل MySQL
sudo service mysql status

# إذا لم يكن يعمل:
sudo service mysql start
```

---

## 📱 اختبار سريع

### اختبار AI

```bash
curl http://localhost:5000/
```

### اختبار Backend

```bash
curl http://localhost:8888/
```

### اختبار Frontend

افتح في المتصفح: http://localhost:4200

---

## 💾 حفظ الأوامر

### في .bashrc أو .zshrc

أضف إلى الملف:

```bash
# AI Cyber Defender Aliases
alias start_ai="cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/AI && source venv/bin/activate && python app.py"
alias start_backend="cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/backend && php -S localhost:8888"
alias start_frontend="cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender/frontend && npm start"
alias start_all_services="cd /home/hussein/Documents/my_prjects/my_prjects/AI-Cyber-Defender && ./start_all.sh"
```

ثم استخدم:

```bash
start_ai
start_backend
start_frontend
start_all_services
```

---

## 📚 المراجع

- [STARTUP_GUIDE.md](STARTUP_GUIDE.md) - دليل مفصل
- [README.md](README.md) - معلومات عامة
- [start_all.sh](start_all.sh) - Script التشغيل

---

**آخر تحديث:** 2026-06-11
