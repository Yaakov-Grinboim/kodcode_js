import express from "express";
import booksRouter from "./routes/booksRouter.js"

const app = express();

app.use(express.json())
app.use("/", booksRouter) 


app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});