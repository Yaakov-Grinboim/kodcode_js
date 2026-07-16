# דף תרגילים — Express Middleware

---

## חלק א' — שאלות הבנה

**1.** מה ההגדרה של Middleware ב-Express? תאר במילים שלך מה תפקידו בתהליך הטיפול בבקשה.

---

**2.** מהם שלושת הפרמטרים של פונקציית Middleware? הסבר מה תפקיד כל אחד מהם.

---

**3.** מה קורה אם שוכחים לקרוא ל-`next()` בתוך Middleware? מתי בכוונה לא קוראים לה?

---

**4.** מה ההבדל בין השימושים הבאים? מתי תשתמש בכל אחד מהם?

```js
app.use(logger);
app.use('/api/users', logger);
app.get('/profile', logger, handler);
```

---

**5.** מדוע `express.json()` הוא Middleware חיוני? מה יקרה ב-`req.body` אם לא נוסיף אותו?

---

## חלק ב' — השלמת קוד

**6.** השלם את פונקציית ה-Middleware החסרה כך שתדפיס ל-console את ה-method וה-url של כל בקשה, ותמשיך לבקשה הבאה:

```js
function logger(req, res, next) {
  // ________________________________________
  // ________________________________________
}
```

---

**7.** השלם את קוד השרת כך שיוכל לקרוא את ה-body של בקשות POST:

```js
const express = require('express');
const app = express();

// ________________________________________

app.post('/users', (req, res) => {
  console.log(req.body); // צריך להדפיס אובייקט ולא undefined
  res.json({ received: req.body });
});
```

---

**8.** השלם את פונקציית ה-Middleware לאימות (`auth`) כך שתחזיר שגיאה 401 אם אין `Authorization` header, ותמשיך הלאה אם יש:

```js
function auth(req, res, next) {
  const token = ____________________________;

  if (____________________________________) {
    return res.status(____).json({ message: '___________' });
  }

  ___________; // המשך
}
```

---

## חלק ג' — ניתוח קוד

**9.** מה יהיה הפלט של הבקשות הבאות לשרת הזה? הסבר את סדר הריצה:

```js
app.use(logger);
app.use('/api', auth);

app.get('/home', (req, res) => res.send('Home'));
app.get('/api/data', (req, res) => res.send('Data'));
```

א. `GET /home` — מה יקרה?

ב. `GET /api/data` ללא token — מה יקרה?

ג. `GET /api/data` עם token — מה יקרה?

---

**10.** מצא את הבאג בקוד הבא והסבר מה הבעיה:

```js
function checkAdmin(req, res, next) {
  if (req.headers['x-role'] === 'admin') {
    next();
  }
  res.status(403).json({ message: 'Forbidden' });
}
```

---

## חלק ד' — כתיבת קוד

**11.** כתוב Middleware בשם `requestTimer` שמוסיף ל-`req` שדה בשם `startTime` עם הזמן הנוכחי (`Date.now()`), ואז ממשיך הלאה.

---

**12.** כתוב שרת Express מלא שמכיל:
- Middleware גלובלי ל-JSON
- Middleware גלובלי של logger (מדפיס method + url)
- Route ציבורי: `GET /public` — מחזיר `{ message: 'Public' }`
- Route מוגן: `GET /private` — עם Middleware `auth`, מחזיר `{ message: 'Secret' }`

---

**13. (בונוס)** כתוב Middleware בשם `validateBody` שמקבל כפרמטר מערך של שדות חובה, ומחזיר שגיאה 400 אם אחד מהם חסר ב-`req.body`:

```js
// שימוש לדוגמה:
app.post('/users', validateBody(['name', 'email']), (req, res) => {
  res.json({ created: req.body });
});
```
