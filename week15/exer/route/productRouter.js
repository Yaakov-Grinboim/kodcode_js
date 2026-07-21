import { Router } from "express";
import { getAll, getById, create, deleteById, updateById } from "../DAL/products.js"
export const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const products = await getAll();
  res.json(products);
});

productRouter.get("/:id", async (req, res) => {
  const prod = await getById(req.params.id);
  if (!prod) return res.status(404).json({ err: "prod not found" })
  res.json(prod);
});

productRouter.post("/", async (req, res) => {
  const result = await create(req.body);
  if (!result) return res.status(500).json({ message: "something wrong" })
  return res.json(req.body);
})

productRouter.put("/:id", async (req, res) => {
  const result = await updateById(req.params.id, req.body);
  if (!result) return res.status(500).json({ message: "something wrong" })
  return res.json(result);
});

productRouter.delete("/:id", async (req, res) => {
  const result = await deleteById(req.params.id);
  return res.json(result);
});

export default productRouter;