import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
app.use(express.json()); // מאפשר לשרת לקרוא JSON מה-Body של הבקשה

// חיבור לבסיס הנתונים
const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/example_db");
await client.connect();
const db = client.db("example_db");
const users = db.collection("users");

// =======================================================
// 1. יצירה (CREATE) - הוספת מסמך חדש לבסיס הנתונים
// =======================================================
app.post("/users", async (req, res) => {
  try {
    const newUser = {
      username: req.body.username,
      age: req.body.age,
      createdAt: new Date()
    };

    // insertOne מקבל אובייקט ומכניס אותו לאוסף
    const result = await users.insertOne(newUser);
    
    // insertOne מחזיר אובייקט שמכיל insertedId
    newUser._id = result.insertedId;

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =======================================================
// 2. קריאה (READ) - שליפת כל המסמכים מהאוסף
// =======================================================
app.get("/users", async (req, res) => {
  try {
    // find() מחזיר Cursor. כדי לקבל את המערך משתמשים ב-toArray()
    const allUsers = await users.find().toArray();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =======================================================
// 3. קריאה לפי מזהה (READ ONE) - שליפת מסמך בודד לפי _id
// =======================================================
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // חובה לוודא שהמזהה שנתקבל הוא בפורמט תקין של ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // findOne מחזיר את המסמך הראשון שמתאים לתנאי, או null אם לא נמצא
    const user = await users.findOne({ _id: new ObjectId(id) });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =======================================================
// 4. עדכון (UPDATE) - עדכון שדות מסוימים במסמך קיים
// =======================================================
app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // אופרטור $set משמש לעדכון שדות ספציפיים מבלי לדרוס את כל המסמך
    const result = await users.updateOne(
      { _id: new ObjectId(id) }, // תנאי החיפוש
      { $set: { username: req.body.username, age: req.body.age } } // השינוי
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =======================================================
// 5. מחיקה (DELETE) - הסרת מסמך מהאוסף
// =======================================================
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // deleteOne מוחק את המסמך הראשון שמתאים לתנאי
    const result = await users.deleteOne({ _id: new ObjectId(id) });

    // deletedCount יכיל 1 אם נמחק מסמך, או 0 אם לא נמצא
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(204).send(); // 204 מציין הצלחה ללא תוכן מוחזר
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Example server running on port 3000"));
