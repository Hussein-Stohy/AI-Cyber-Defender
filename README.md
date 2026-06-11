# 🛡️ AI Cyber Defender - دليل شامل

مشروع متكامل للدفاع السيبراني باستخدام الذكاء الاصطناعي
chmod +x start_all.sh
./start_all.sh
---

## 📚 المحتويات

1. [نظرة عامة](#نظرة-عامة)
2. [المتطلبات](#المتطلبات)
3. [البنية](#البنية)
4. [التثبيت](#التثبيت)
5. [التشغيل](#التشغيل)
6. [الملفات المهمة](#الملفات-المهمة)
7. [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## 🎯 نظرة عامة

AI Cyber Defender هو منصة ذكية لكشف التهديدات السيبرانية من خلال:

- **🤖 تحليل الذكاء الاصطناعي** - كشف الشذوذ والأنماط المريبة
- **🔍 فحص الشبكة** - تحليل سجلات الشبكة والويب
- **🪟 مراقبة Windows** - كشف تهديدات النظام
- **🔗 تحليل URLs** - كشف الروابط الخطرة

---

## 📋 المتطلبات

### البرامج المطلوبة

| البرنامج | الإصدار | الحالة |
|---------|---------|--------|
| Python | 3.14+ | ✅ مثبت |
| PHP | 8.2+ | ✅ مثبت |
| Node.js | 14+ | ⏳ يحتاج تثبيت |
| MySQL | 5.7+ | ✅ مثبت |
| Git | أي | ⏳ اختياري |

### المكتبات (Python)

```
pandas>=2.0.0
numpy>=1.24.0
scikit-learn>=1.3.0
tensorflow>=2.13.0  # للـ AI Model
flask>=3.0.0
jupyter>=1.0.0
```

### المكتبات (Node.js)

```
@angular/core
typescript
tailwind
ng-bootstrap
```

---

## 🏗️ البنية

```
AI-Cyber-Defender/
│
├── 📁 AI/                          # خادم الذكاء الاصطناعي (Flask)
│   ├── app.py                      # التطبيق الرئيسي
│   ├── requirements.txt            # المكتبات المطلوبة
│   ├── venv/                       # البيئة الافتراضية
│   ├── models/                     # نماذج التعلم الآلي
│   ├── src/                        # كود المصدر
│   ├── notebooks/                  # Jupyter notebooks
│   └── preprocessing/              # معالجة البيانات
│
├── 📁 backend/                     # خادم PHP (API)
│   ├── index.php                   # نقطة الدخول
│   ├── schema.sql                  # مخطط قاعدة البيانات
│   ├── config/                     # الإعدادات
│   ├── controllers/                # معالجات الطلبات
│   ├── models/                     # نماذج البيانات
│   ├── core/                       # الوظائف الأساسية
│   └── routes/                     # المسارات
│
├── 📁 frontend/                    # تطبيق Angular
│   ├── src/
│   │   ├── index.html              # الصفحة الرئيسية
│   │   ├── main.ts                 # نقطة الدخول
│   │   └── app/                    # مكونات التطبيق
│   ├── package.json                # المكتبات
│   └── angular.json                # إعدادات Angular
│
├── 📄 STARTUP_GUIDE.md             # دليل التشغيل المفصل
├── 📄 COMMANDS.md                  # أوامر سريعة
├── 🚀 start_all.sh                 # ملف بدء جميع الخدمات
└── README.md                       # هذا الملف
```

---

## ⚙️ التثبيت

### الخطوة 1: متطلبات النظام

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y python3 php mysql-server nodejs npm git

# Verify installations
python3 --version
php --version
mysql --version
node --version
npm --version
```

### الخطوة 2: استنساخ المشروع

```bash
cd /path/to/projects
git clone <repo-url>
cd AI-Cyber-Defender
```

### الخطوة 3: إعداد Python

```bash
cd AI

# إنشاء البيئة الافتراضية
python3 -m venv venv

# تفعيل البيئة
source venv/bin/activate

# تثبيت المكتبات
pip install -r requirements.txt
```

### الخطوة 4: إعداد قاعدة البيانات

```bash
# بدء MySQL
sudo service mysql start

# إنشاء قاعدة البيانات
sudo mysql -u root -e "CREATE DATABASE ai_cyber_defender CHARACTER SET utf8mb4;"

# تطبيق المخطط
sudo mysql -u root ai_cyber_defender < backend/schema.sql
```

### الخطوة 5: إعداد Frontend

```bash
cd frontend

# تثبيت المكتبات
npm install

# إنشاء ملف البيئة (اختياري)
cp src/environments/environment.ts src/environments/environment.prod.ts
```

---

## 🚀 التشغيل

### خيار 1: تشغيل جميع الخدمات بأمر واحد

```bash
# من المجلد الجذر
chmod +x start_all.sh
./start_all.sh
```

### خيار 2: تشغيل كل خدمة على حدة

#### Terminal 1 - MySQL (اختياري)
```bash
sudo service mysql start
```

#### Terminal 2 - AI Backend
```bash
cd AI
source venv/bin/activate
python app.py
```

#### Terminal 3 - PHP Backend
```bash
cd backend
php -S localhost:8888
```

#### Terminal 4 - Frontend
```bash
cd frontend
npm start
```

### الروابط المتاحة بعد التشغيل

| الخدمة | الرابط | الوصف |
|--------|--------|--------|
| **Dashboard** | http://localhost:4200 | واجهة المستخدم الرئيسية |
| **AI API** | http://localhost:5000 | API الذكاء الاصطناعي |
| **PHP API** | http://localhost:8888 | API الخادم |
| **MySQL** | localhost:3306 | قاعدة البيانات |

---

## 📄 الملفات المهمة

### ملفات التشغيل

| الملف | الوصف | النوع |
|------|--------|--------|
| `STARTUP_GUIDE.md` | دليل شامل للتشغيل | 📘 توثيق |
| `COMMANDS.md` | أوامر سريعة | 📋 اختصارات |
| `start_all.sh` | بدء جميع الخدمات | 🚀 script |

### ملفات المشروع

| الملف | الوصف |
|------|--------|
| `AI/app.py` | تطبيق Flask الرئيسي |
| `backend/index.php` | نقطة دخول PHP |
| `backend/schema.sql` | مخطط قاعدة البيانات |
| `frontend/src/main.ts` | نقطة دخول Angular |

### ملفات الإعدادات

| الملف | الوصف |
|------|--------|
| `AI/requirements.txt` | مكتبات Python |
| `backend/config/database.php` | إعدادات قاعدة البيانات |
| `frontend/package.json` | مكتبات Node.js |
| `frontend/angular.json` | إعدادات Angular |

---

## 🐛 استكشاف الأخطاء

### خطأ: "Address already in use"

```bash
# البحث عن العملية التي تستخدم المنفذ
lsof -i :8888

# إيقاف العملية
kill -9 <PID>

# أو استخدم منفذ آخر
php -S localhost:9000
```

### خطأ: "ModuleNotFoundError"

```bash
# تأكد من تفعيل البيئة الافتراضية
source venv/bin/activate

# أعد تثبيت المكتبات
pip install -r requirements.txt
```

### خطأ: "MySQL connection error"

```bash
# تحقق من حالة MySQL
sudo service mysql status

# ابدأ MySQL
sudo service mysql start

# تحقق من صلاحيات المستخدم
sudo mysql -u root -p
```

### خطأ: "npm ERR! code EACCES"

```bash
# قم بتصحيح صلاحيات npm
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

## 📊 معلومات قاعدة البيانات

### بيانات الاتصال

```
Host: localhost
Port: 3306
Database: ai_cyber_defender
Username: root
Password: (فارغة بشكل افتراضي)
```

### الجداول الرئيسية

#### users
```sql
SELECT * FROM users;
```

#### attacks
```sql
SELECT * FROM attacks WHERE created_at > DATE_SUB(NOW(), INTERVAL 1 DAY);
```

#### attack_logs
```sql
SELECT * FROM attack_logs JOIN attacks ON attack_logs.attack_id = attacks.id;
```

### نسخ احتياطية

```bash
# عمل نسخة احتياطية
mysqldump -u root ai_cyber_defender > backup_$(date +%Y%m%d).sql

# استعادة من نسخة احتياطية
mysql -u root ai_cyber_defender < backup_20260611.sql
```

---

## 🔐 الأمان

### نصائح مهمة

⚠️ **للتطوير فقط:**
- لا تستخدم كلمة مرور فارغة في الإنتاج
- لا تستخدم Debug Mode في الإنتاج
- استخدم HTTPS بدلاً من HTTP

### إعدادات الأمان المقترحة

1. تغيير كلمة مرور MySQL
2. إضافة Authentication في PHP
3. تفعيل CORS بحذر
4. استخدام Environment Variables

---

## 📈 الخطوات التالية

### للتطوير

- [ ] استكشف الـ Notebooks في `AI/notebooks/`
- [ ] عدّل النماذج في `AI/src/`
- [ ] أضف ميزات جديدة في `frontend/src/app/`

### للإنتاج

- [ ] استخدم Gunicorn/uWSGI للـ Flask
- [ ] استخدم Apache/Nginx للـ PHP
- [ ] بناء Frontend مع `npm run build`
- [ ] إضافة SSL/TLS

---

## 📞 الدعم والمساعدة

### الموارد المفيدة

- 📖 [Flask Documentation](https://flask.palletsprojects.com/)
- 📖 [Angular Documentation](https://angular.io/docs)
- 📖 [PHP Documentation](https://www.php.net/manual/)
- 📖 [MySQL Documentation](https://dev.mysql.com/doc/)

### الملفات المرجعية

```bash
# عرض سجلات الخطأ
tail -f /tmp/ai_backend.log
tail -f /tmp/php_backend.log
tail -f /tmp/frontend.log

# فحص المنافذ
netstat -tuln | grep LISTEN
```

---

## 📝 سجل التحديثات

### 2026-06-11
- ✅ تم تثبيت جميع الخدمات
- ✅ تم إنشاء قاعدة البيانات
- ✅ تم إنشاء ملفات التوثيق
- ⏳ في انتظار تشغيل Frontend

---

## 📄 الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام التعليمي

---

**آخر تحديث:** 2026-06-11
**الإصدار:** 1.0.0
**الحالة:** 🟢 تشغيل
