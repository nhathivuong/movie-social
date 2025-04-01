const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const app = express();
//handlers
import addUser from "./handlers/addUser";
import getUser from "./handlers/getUser";

// this creates and account when a user sign up to the website
app.post("/user", addUser)

// this is used to login an user
app.get("/user/:username", getUser)