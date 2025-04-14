const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

// this find the user in the database it is used to get user's info
const getUser = async(req, res) =>{
    const {username} = req.params
    if(!username){
        return res.status(404).json({
            status:404,
            message: "The username was not found in params"
        })
    }

    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        const foundUser = await db.collection("users").findOne({username: username}, {projection: {password: 0, _id : 0}})
        if(!foundUser){
            return res.status(404).json({
                status:404,
                message: `${username} was not found`
            })
        }
        res.status(200).json({
            status:200,
            user: foundUser
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
};

module.exports = getUser