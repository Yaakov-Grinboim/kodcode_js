import express from "express";
import { readFileContent, writeToFile } from "../service/dbManager.js";

const router = express.Router();

router.get("/", (req, res) => {
    try {
        res.json({ success: true, data: { message: "Welcome to my online store API" } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/health", (req, res) => {
    try {
        res.json({ success: true, data: { status: "ok" } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/products", async (req, res) => {
    try {
        const books = await readFileContent("books.json");
        const { inStock, maxPrice, search } = req.query;
        
        let filteredBooks = books;

        if (inStock === "true") {
            filteredBooks = filteredBooks.filter(book => book.stock > 0);
        }

        if (maxPrice) {
            const priceLimit = Number(maxPrice);
            if (!isNaN(priceLimit)) {
                filteredBooks = filteredBooks.filter(book => book.price <= priceLimit);
            }
        }

        if (search) {
            const searchStr = search.toLowerCase();
            filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(searchStr));
        }

        res.json({ success: true, data: filteredBooks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

async function getOrCreateCustomer(customerId) {
    const customers = await readFileContent("customers.json");
    let customer = customers.find(c => c.customerId === customerId);
    if (!customer) {
        customer = {
            customerId: customerId,
            balance: Number(process.env.STARTING_BALANCE) || 500,
            cart: [],
            createdAt: Date.now()
        };
        customers.push(customer);
        await writeToFile("customers.json", customers);
    }
    return customer;
}

router.get("/cart", async (req, res) => {
    try {
        const { customerId } = req.query;
        if (!customerId) {
            return res.status(400).json({ success: false, message: "customerId query parameter is required" });
        }

        const customer = await getOrCreateCustomer(customerId);
        const books = await readFileContent("books.json");

        let totalAmount = 0;
        const items = customer.cart.map(item => {
            const book = books.find(b => b.id === item.productId);
            const price = book ? book.price : 0;
            const name = book ? book.name : "Unknown Book";
            const itemTotal = price * item.quantity;
            totalAmount += itemTotal;
            return {
                productId: item.productId,
                name: name,
                price: price,
                quantity: item.quantity,
                total: itemTotal
            };
        });

        res.json({
            success: true,
            data: {
                customerId: customer.customerId,
                items: items,
                totalAmount: totalAmount
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/cart/items", async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;

        if (!customerId || productId === undefined || quantity === undefined) {
            return res.status(400).json({ success: false, message: "customerId, productId, and quantity are required" });
        }

        const qty = parseInt(quantity);
        const prodId = parseInt(productId);

        if (isNaN(qty) || qty <= 0) {
            return res.status(400).json({ success: false, message: "Quantity must be a positive integer" });
        }

        if (isNaN(prodId)) {
            return res.status(400).json({ success: false, message: "ProductId must be a valid number" });
        }

        const books = await readFileContent("books.json");
        const book = books.find(b => b.id === prodId);

        if (!book) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const customers = await readFileContent("customers.json");
        let customer = customers.find(c => c.customerId === customerId);

        if (!customer) {
            customer = {
                customerId: customerId,
                balance: Number(process.env.STARTING_BALANCE) || 500,
                cart: [],
                createdAt: Date.now()
            };
            customers.push(customer);
        }

        const existingCartItem = customer.cart.find(item => item.productId === prodId);
        const existingQty = existingCartItem ? existingCartItem.quantity : 0;

        if (existingQty + qty > book.stock) {
            return res.status(400).json({ success: false, message: "Insufficient stock" });
        }

        if (existingCartItem) {
            existingCartItem.quantity += qty;
        } else {
            customer.cart.push({ productId: prodId, quantity: qty });
        }

        await writeToFile("customers.json", customers);

        res.json({ success: true, data: customer.cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete("/cart/items/:productId", async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        const { customerId } = req.body;

        if (!customerId) {
            return res.status(400).json({ success: false, message: "customerId is required in body" });
        }

        if (isNaN(productId)) {
            return res.status(400).json({ success: false, message: "productId must be a valid number" });
        }

        const customers = await readFileContent("customers.json");
        let customer = customers.find(c => c.customerId === customerId);

        res.json({ success: true, data: customer ? customer.cart : [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/account/balance", async (req, res) => {
    try {
        const { customerId } = req.query;
        if (!customerId) {
            return res.status(400).json({ success: false, message: "customerId query parameter is required" });
        }
        const customer = await getOrCreateCustomer(customerId);
        res.json({ success: true, data: { balance: customer.balance } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/orders/checkout", async (req, res) => {
    try {
        const { customerId } = req.body;

        if (!customerId) {
            return res.status(400).json({ success: false, message: "customerId is required in body" });
        }

        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/orders", async (req, res) => {
    try {
        const { customerId } = req.query;

        if (!customerId) {
            return res.status(400).json({ success: false, message: "customerId query parameter is required" });
        }

        res.json({ success: true, data: [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;