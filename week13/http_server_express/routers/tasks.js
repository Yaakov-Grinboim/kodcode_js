import express from "express";

const router = express.Router();

const tasks = [];

//1 and //4
router.get("/", (req, res)=>{
    //4
    if (req.query.done === 'true') {
        const filteredTasks = tasks.filter(t => t.done === true);
        return res.json(filteredTasks);
    }
    
    //1
    res.json(tasks);
});

//2
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
});

//1 and //4
router.post("/", (req, res) => {
    //1
    const { title } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: "title is required" });
    }
    
    const newTask = { 
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1, 
        title,
        //4
        done: false 
    };
    tasks.push(newTask);
    
    res.status(201).json(newTask);
});

//2
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    tasks.splice(index, 1);
    res.status(204).send();
});

//4
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { done } = req.body;
    
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    
    if (typeof done !== 'undefined') {
        task.done = done;
    }
    
    res.json(task);
});

export default router;