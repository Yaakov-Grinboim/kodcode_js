import express from "express";
import userRouter from "./routers/users"
const app = express();

app.use(express.json());
app.use("./users", userRouter)


//  exercises

const products = [
    { id: 1, name: 'Laptop', price: 3000, category: 'tech' },
    { id: 2, name: 'Mouse', price: 150, category: 'tech' },
    { id: 3, name: 'Desk', price: 800, category: 'furniture' },
    { id: 4, name: 'Monitor', price: 1200, category: 'tech' },
];


// 1

// app.get("/products/:id", (req, res) => {
//     const { id } = req.params;
//     if (isNaN(id)) return res.status(400).json({error: "invalid path"});
//     const product = products.find(p => p.id === +id);
//     if (!product) return res.status(404).json({error: "product not found"});
//     res.json(product);
// });

// 2

app.get("/products", (req, res) => {
    const query = req.query;
    console.log(query);

    return res.json(products);

});


app.listen(3000, () => {
    console.log("sarver running...");
});

// app.post("/users", (req, res) => {
//     const { name } = req.body;
//     if (!name) return res.status(400).json({ err: "Miss rquired filed" })
//     console.log(name);
//     res.end("end post")
// })


// app.get("/", (req, res) => {
//     console.log(req.query);
//     res.end("Hello client");
// })



// app.get("/users/:id", (req, res) => {
//     const { id } = req.params
//     console.log(req.params);
//     res.end("Hello Momo\n")
// })



