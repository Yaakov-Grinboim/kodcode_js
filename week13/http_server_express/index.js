import express from 'express';
//1
import tasksRouter from "./routers/tasks.js";
//3
import notesRouter from "./routers/notes.js";

const app = express();
app.use(express.json());

//1
app.use("/tasks", tasksRouter);
//3
app.use("/notes", notesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
