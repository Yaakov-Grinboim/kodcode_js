import express from "express";

const app = express();
app.use(express.json());


// 1

function timeDate(req, res, next) {
    req.requestTime = new Date().toISOString();
    next();
};

// 2

app.get("/time", timeDate, (req, res) => {
    try {
        res.json({ "Request received at": req.requestTime })
    } catch (error) {
        console.error("error")
    }
});


// 3


function isBody(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: `Body cannot be empty` });
    }
    next();
};

// 4

app.post("/data", isBody, (req, res) => {
    console.log(req.body);
    res.json({ message: req.method })
});

// 5

function validatePassword(req, res, next) {
    const password = req.body.password;
    if (!password || password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 chars."
        });
    };
    next();
};

app.post("/register", validatePassword, (req, res) => {
    res.json({ message: "Registration successful!" });
});

// 6

function isPermission(req, res, next) {
    const permission = req.query.admin;
    if (!permission || permission !== "true") {

        return res.status(403).json({ message: "Forbidden: Admins only." });
    } req.userPermission = permission;
    next();
};

// 7

app.get("/settings", isPermission, (req, res) => {
    console.log(req.userPermission);
    res.json({ message: "Welcome to the settings page" });
})

// 8


app.get("/error-test", (req, res)=>{
    throw new Error("Something went wrong!").

})




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Exercises server is running on http://localhost:${PORT}`);
});