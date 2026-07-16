import express from "express";

const app = express();
app.use(express.json());

function logger(req, res, next){
    console.log(req.method, req.url);
    next();
};

app.get("/", logger, (req, res)=>{
    res.send("Hello World");
});

app.get("/users/:id", (req, res)=>{
    console.log("get /users/:id");
    res.send({msg: "Hello " + req.params.id});
});

app.get("/users", (req, res)=>{
    console.log(req.query);
    res.send({msg: "Hello Users"});
});

app.listen(3000, (e)=>{
    if(e)console.log(e);
    console.log("server running");
});