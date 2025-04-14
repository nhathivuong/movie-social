const { MongoClient } = require("mongodb")
require("dotenv").config()
const { MONGO_URI } = process.env
const {v4: uuidv4 } = require("uuid")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

// this creates and account when a user sign up to the website
const addUser = async(req, res) => {
    const { name, email, username, src, password } = req.body
    
    // checks if the body is filled properly
    if(!name ||!email ||!username || !src ||!password){
        return res.status(404).json({
            status: 404,
            message: "The request is missing data"
        })
    }
    
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")

        // checks if the user(username or email) already exist in the database
        const usernameTaken = await db.collection("users").findOne({username: username})
        if(usernameTaken){
            return res.status(400).json({
                status:400,
                message: "The username is already taken"
            })
        }
        const emailTaken = await db.collection("users").findOne({email: email})
        if(emailTaken){
            return res.status(400).json({
                status:400,
                message: "The email is already taken"
            })
        }

        //encrypts the password
        const encryptedPassword = await bcrypt.hash(password, 10)
        // the user object
        const newUser = {
            _id: uuidv4(),
            name: name,
            username: username,
            email: email,
            password: encryptedPassword,
            src: src,
            lists: [{name: "To Watch", movies: []}],
            follows: [],
            status: "active"
        }
        //creates the user in the database
        await db.collection("users").insertOne(newUser)

        const token = jwt.sign(
            {userId: newUser._id, username: newUser.username},
            JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.status(201).json({
            status: 201,
            token,
            username: username,
            message: `${username} account has been created`
        })
    }
    catch(error){
        return res.status(502).json({
            status:502,
            message: error.message
        })
    }
    finally{
        await client.close()
    }
};

module.exports = addUser