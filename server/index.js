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
} = require("./handlers")

// this creates and account when a user sign up to the website
app.post("/user", addUser);

// this is used to login an user
app.get("/user/:username", getUser);

app.use('*', (req, res) => {
    res.status(404).json({status: 404, message: "This isn't the endpoint you're looking for!"});
    });
    
app.listen(PORT, () => {console.log("Server listening on port ", PORT);});