const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

//handlers
const {
    addUser,
    getUser,
    getUsers,
    logIn
} = require("./handlers")

// this creates and account when a user sign up to the website
app.post("/user", addUser);

// this is used to get userinfo
app.get("/user/:username", getUser);

// this get all the users basic info(name, username, src)
app.get("/users", getUsers)

// login the user
app.post("/login", logIn)

app.use('*', (req, res) => {
    res.status(404).json({status: 404, message: "Endpoint not found!"});
    });
    
app.listen(PORT, () => {console.log("Server listening on port ", PORT);});