import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/blog");

await client.connect();
console.log("Connected to MongoDB for exercises!");
const db = client.db("blog");
const posts = db.collection("posts");

// ==========================================
// תרגיל 1 — הוספת נתוני seed (3 פוסטים)
// ==========================================
await posts.insertMany([
  {
    title: "Introduction to MongoDB",
    content: "MongoDB is a powerful NoSQL database.",
    author: "Yaakov",
    published: true,
    createdAt: new Date(),
  },
  {
    title: "Docker Basics",
    content: "Learn how to use Docker containerization.",
    author: "Yaakov",
    published: false,
    createdAt: new Date(),
  },
  {
    title: "Express Basics",
    content: "Express is a minimal web framework.",
    author: "Yaakov",
    published: false,
    createdAt: new Date(),
  },
]);

// ==========================================
// תרגיל 2 — GET /posts
// ==========================================

app.get("/posts", async (req, res) => {
  try {
    const publishedPosts = await posts.find({ published: true }).toArray();
    res.json(publishedPosts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// ==========================================
// תרגיל 3 — POST /posts
// ==========================================
app.post("/posts", async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      published: req.body.published ?? false,
      createdAt: new Date(),
    };

    const result = await posts.insertOne(newPost);
    newPost._id = result.insertedId;
    res.status(201).json(newPost);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// ==========================================
// תרגיל 4 — GET & DELETE /posts/:id
// ==========================================

// ==========================================
// תרגיל 5 — PUT /posts/:id
// ==========================================

// הפעלת השרת
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Exercise server is running on http://localhost:${PORT}`);
});
