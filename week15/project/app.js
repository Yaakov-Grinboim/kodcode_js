import express from "express";
import "dotenv/config";
import { connectDB } from "./dbManager.js"

const app = express();

app.use("/", express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the DB Admin Dashboard Server!" });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running live on http://localhost:${PORT}`);
    });
});