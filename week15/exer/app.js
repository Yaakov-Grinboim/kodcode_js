import 'dotenv/config'
import express from "express";
import router from "./route/productRouter.js";
import './db/mongodb.js'

const app = express();

app.use(express.json())
app.use("/products", router)


const PORT = process.env.PORT || 3000;

app.listen(PORT, async (e) => {
  if (e) console.error(e);
  console.log(`server running on http://127.0.0.1:${PORT}....`);
});
