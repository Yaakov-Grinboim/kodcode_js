# שבוע 15 - סדר בתיקיות והנחיות חיבור (Atlas & Render)

קובץ זה נועד לעשות לך סדר בבלאגן, להסביר מה קורה בכל תיקייה, היכן שמים את משתני הסביבה (מקומי ובענן) ואיך מעלים את הפרויקטים לרשת.

---

## 📂 מפת התיקיות והקבצים

```text
week15/
├── README.md                 <-- הקובץ שאתה קורא כרגע
├── study_guide.html          <-- מדריך הלמידה האינטראקטיבי המעוצב שלך
│
├── supabase/                 <-- פרויקט עבודה מול Supabase (ללא שרת)
│   ├── app.js                <-- קובץ הריצה הראשי שמפעיל את הפעולות
│   ├── db.js                 <-- קובץ יצירת ה-Client של Supabase ופעולות על authors
│   ├── codeCRUD.js           <-- קוד דוגמה מוכן ל-CRUD על סרטים (לעיון בלבד)
│   ├── .env                  <-- משתני סביבה לחיבור (כתובת ה-URL ומפתח ה-API)
│   ├── package.json          <-- הגדרות פרויקט וספריות
│   └── supabase_exercises_EXE.md <-- הנחיות התרגיל שצריך להשלים
│
├── mongo_db/                 <-- תרגילי מונגו מקומיים וחלוקה ל-DAL
│   ├── app.js                <-- קובץ ריצה ישיר מול ה-DB (טיוטת בדיקות)
│   ├── index.js              <-- קובץ ריצה נוסף (טיוטת חיבור למסד momo)
│   ├── atlas-credentials.env <-- הגדרות סביבה לחיבור לענן
│   ├── package.json          <-- הגדרות פרויקט וספריות
│   ├── db/
│   │   └── db.js             <-- יצירת חיבור מרכזי ל-MongoDB וייצוא שלו
│   ├── DAL/
│   │   └── users.dal.js      <-- שכבת גישה לנתונים (CRUD מלא של משתמשים)
│   └── exercises/            <-- תרגילי הבלוג שניתנו בכיתה
│       ├── mongodb_exercise.md <-- הנחיות התרגיל של הבלוג
│       ├── crud_example.js   <-- קוד דוגמה מלא ומצוין לשרת Express + מונגו
│       └── index.js          <-- שרת הבלוג שאתה בונה (תרגילים 1,2,3 מוכנים, 4 ו-5 להשלמה)
│
└── exer/                     <-- שרת Express לניהול מוצרים (חנות)
    ├── app.js                <-- שרת ה-Express הראשי שמאזין לבקשות
    ├── .env                  <-- הגדרת פורט השרת (PORT=3000)
    ├── package.json          <-- הגדרות פרויקט וספריות
    ├── db/
    │   └── mongodb.js        <-- חיבור למסד הנתונים shop (דורש תיקון שגיאות)
    └── route/
        └── productRouter.js  <-- ניתוב בקשות מוצרים (כרגע מחזיר נתונים מדומים)
```

---

## 🌐 חיבור ל-MongoDB Atlas (ענן) ומשתני סביבה

כאשר למדתם היום חיבור ל-Atlas, החלפתם את מסד הנתונים המקומי (שיושב על המחשב שלך ב-Docker) במסד נתונים מרוחק שיושב בענן של MongoDB.

### איך זה עובד ובאיזה קובץ נוגעים?

1. **מחרוזת החיבור (Connection String):** באטלס קיבלת מחרוזת שנראית בערך כך:
   `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority`
2. **איפה שמים אותה?** בקובץ משתני הסביבה המקומי שלך (לדוגמה בקובץ `.env` או `atlas-credentials.env`).
   יוצרים שם משתנה סביבתי בשם `MONGODB_URI`:
   ```env
   MONGODB_URI="mongodb+srv://user123:password123@cluster0.xxxx.mongodb.net/my_database?retryWrites=true&w=majority"
   ```
3. **איך הקוד קורא את זה?**
   בקוד החיבור שלך (כמו למשל ב-[db.js](file:///C:/Users/yaako/Desktop/study-kodcode/js-stading/week15/mongo_db/db/db.js) או [mongodb.js](file:///C:/Users/yaako/Desktop/study-kodcode/js-stading/week15/exer/db/mongodb.js)), במקום לכתוב את הכתובת המקומית `mongodb://localhost:27017` ישירות בקוד (Hardcoded), אנו טוענים אותה ממשתני הסביבה:
   ```javascript
   const client = new MongoClient(process.env.MONGODB_URI);
   ```
4. **שימוש ב-Node.js flag:** שים לב שב-`package.json` שלכם אתם מריצים את השרת עם הדגל `--env-file=.env` (או `.env` אחר) המאפשר ל-Node לקרוא את הקובץ אוטומטית לתוך `process.env`.

---

## 🚀 העלאה וחיבור ל-Render

**Render** הוא שירות ענן חינמי (במסלול ה-Hobby) המאפשר להריץ שרתי Node.js (כמו שרתי Express שכתבת) באינטרנט, כך שכל אחד יוכל לגשת אליהם דרך כתובת URL ציבורית.

### שלבי העלאה לשרת:

1. **הכנת הקוד המקומי:**
   * ודא שבקובץ `package.json` מוגדר סקריפט התחלה (`start`):
     ```json
     "scripts": {
       "start": "node app.js"
     }
     ```
   * ודא שהאזנה לפורט בשרת בודקת את משתנה הסביבה `PORT` (כי Render קובע את הפורט באופן דינמי):
     ```javascript
     const PORT = process.env.PORT || 3000;
     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
     ```
   * **חשוב מאוד:** ודא שקובץ ה-`.env` שלך נמצא בתוך קובץ ה-`.gitignore` כך שהוא לא יעלה ל-GitHub (אסור להעלות סיסמאות ומפתחות ל-GitHub!).

2. **דחיפה ל-GitHub:**
   העלה את הפרויקט שלך למאגר (Repository) ב-GitHub.

3. **יצירת שירות ב-Render:**
   * היכנס לאתר Render וחבר את חשבון ה-GitHub שלך.
   * לחץ על **New +** ובחר **Web Service**.
   * בחר את המאגר של הפרויקט שלך מתוך הרשימה.
   * הגדרות בסיסיות:
     * **Runtime:** Node
     * **Build Command:** `npm install` (התקנת הספריות)
     * **Start Command:** `npm start` (הרצת השרת)

4. **הגדרת משתני סביבה ב-Render (קריטי!):**
   מאחר שקובץ ה-`.env` לא עלה ל-GitHub (ומצוין שכך), השרת ב-Render לא מכיר את סיסמת ה-MongoDB Atlas או את מפתחות ה-Supabase שלך.
   * בתפריט הצדדי של השירות שלך ב-Render, כנס ללשונית **Environment**.
   * לחץ על **Add Environment Variable** והוסף את המשתנים שלך ידנית:
     * מפתח (Key): `MONGODB_URI` | ערך (Value): `מחרוזת החיבור שקיבלת מאטלס`
     * מפתח (Key): `SUPABASE_URL` | ערך (Value): `כתובת ה-URL`
     * מפתח (Key): `API_KEY` | ערך (Value): `מפתח ה-API`
   * לחץ על **Save Changes**. השרת יבצע פריסה מחדש (Redeploy) ויקרא את המשתנים האלו בהצלחה דרך `process.env`.
