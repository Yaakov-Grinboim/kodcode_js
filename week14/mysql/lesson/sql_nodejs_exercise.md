# Node.js + mysql2 — תרגיל

## הכנה
```bash
npm install mysql2 express
```

צור DB בשם `todo_db` עם טבלה:
```sql
CREATE TABLE tasks (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  title     VARCHAR(200) NOT NULL,
  done      BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## קוד בסיס
```javascript
const mysql   = require('mysql2/promise');
const express = require('express');

const app  = express();
app.use(express.json());

const pool = mysql.createPool({
  host:            'localhost',
  user:            'root',
  password:        'secret',
  database:        'todo_db',
  connectionLimit: 10,
});

app.listen(3000, () => console.log('port 3000'));
```

---

## משימה 1 — GET /tasks
כתוב route שמחזיר את כל המשימות מהטבלה.

**תוצאה צפויה:**
```json
[
  { "id": 1, "title": "לקנות חלב", "done": false },
  { "id": 2, "title": "לגמור תרגיל", "done": true }
]
```

---

## משימה 2 — POST /tasks
כתוב route שמוסיף משימה חדשה עם `title` מה-body.  
החזר את ה-ID שנוצר.

**בקשה:**
```json
POST /tasks
{ "title": "לגמור תרגיל" }
```

**תשובה:**
```json
{ "id": 3 }
```

---

## משימה 3 — PUT /tasks/:id
עדכן את שדה `done` ל-`true` עבור ה-id הנתון.

**בקשה:** `PUT /tasks/2`  
**תשובה:** `{ "updated": 1 }` (affectedRows)

---

## משימה 4 — DELETE /tasks/:id
מחק משימה לפי id.  
**תשובה:** `{ "deleted": 1 }`

---

## משימה 5 (בונוס) — GET /tasks?done=true
סנן משימות לפי `done`:
- `?done=true` → רק שהושלמו
- `?done=false` → רק שלא הושלמו
- ללא param → הכל

**רמז:** `WHERE done = ?` עם `[req.query.done === 'true' ? 1 : 0]`
