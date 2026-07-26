# MongoDB + Docker — תרגילים

## הכנה

הרץ MongoDB ב-Docker:
```bash
docker run --name mongo -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -d mongo:7
```

## קוד בסיס

```javascript
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const app = express();
app.use(express.json());

const client = new MongoClient(
  'mongodb://admin:secret@localhost:27017/blog?authSource=admin'
);
await client.connect();
const db = client.db('blog');
const posts = db.collection('posts');
```

מסמך `post` מכיל: `title` (String), `content` (String), `author` (String), `published` (Boolean, ברירת מחדל false), `createdAt` (Date).

---

## תרגיל 1 — הוספת נתוני seed

הוסף 3 פוסטים לקולקציה עם `insertMany`:
- פוסט אחד עם `published: true`
- שני פוסטים עם `published: false`

---

## תרגיל 2 — GET /posts

כתוב route שמחזיר כל הפוסטים שפורסמו (`published: true`).

**בדיקה:** `GET /posts` → array של פוסטים

---

## תרגיל 3 — POST /posts

כתוב route שמוסיף פוסט חדש.

- הוסף `createdAt: new Date()` בעת השמירה
- תגובה: 201 עם הפוסט שנוצר

---

## תרגיל 4 — GET /posts/:id + DELETE

1. `GET /posts/:id` — שלוף פוסט לפי id; 404 אם לא נמצא  
   (השתמש ב-`new ObjectId(req.params.id)`)
2. `DELETE /posts/:id` — מחק פוסט; 204 אם הצליח

---

## תרגיל 5 — PUT /posts/:id

עדכן פוסט לפי id.

- תמיכה בעדכון `title`, `content`, `published` עם `$set`
- החזר את המסמך המעודכן (`returnDocument: 'after'`)
- 404 אם לא נמצא

**בדיקה:**
```
PUT /posts/ID { "published": true }  → 200 פוסט מעודכן
```
