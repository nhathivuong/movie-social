const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

const logIn = async(req, res) =>{
    const {username, password} = req.body

    if(!username||!password){
        return res.status(404).json({
            status:404,
            message: "Please enter both username and password"
        })
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        const user = await db.collection("users").findOne({username: username},)
        if(!user){
            return res.status(400).json({
                status: 400,
                message: "Invalid credentials"
            })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(400).json({
                status: 400,
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign(
            {userId: user._id, username: user.username},
            JWT_SECRET,
            {expiresIn: "1d"}
        )
        res.status(200).json({
            status: 200,
            token
        })
    }
    catch(error){
        res.status(502).json({
            status:502,
            message: error.message
        })
    }
    finally{
        await client.close()
    }
}
module.exports = logIn