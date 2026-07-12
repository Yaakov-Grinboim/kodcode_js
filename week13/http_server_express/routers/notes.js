import express from "express";

const router = express.Router();

//3
const notes = [];

router.get("/", (req, res) => {
    res.json(notes);
});

router.post("/", (req, res) => {
    const { content } = req.body;
    
    if (!content) {
        return res.status(400).json({ error: "content is required" });
    }
    
    const newNote = { id: notes.length + 1, content };
    notes.push(newNote);
    
    res.status(201).json(newNote);
});

export default router;
