import express from "express"
import { createTable } from "./dbConnection.js";
import soldierRouter from "./soldierRouter.js";

const app  = express();
app.use(express.json());

console.log("\nconnected success\n");

createTable();

app.use("/", soldierRouter);

app.listen(3000, () => console.log('port 3000\n'));