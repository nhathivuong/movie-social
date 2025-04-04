const { MongoClient } = require("mongodb")
require("dotenv").config()
const { MONGO_URI } = process.env

const updateUser = async(req, res) =>{
    const {name, pronouns, bio} = req.body
    const {username} = req.params

    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        const userProfile = {
            name: name, 
            pronouns:pronouns, 
            bio:bio
        }
        const changeProfile = await db.collection("users").updateOne({username: username},{$set: userProfile})
        if(changeProfile.matchedCount === 0){
            return res.status(404).json({
                status:404,
                message: `${username} was not found in users`
            })
        }
        if(changeProfile.modifiedCount === 0){
            return res.status(409).json({
                status:409,
                message: `${username}'s info was not modified`
            })
        }
        const user = await db.collection("users").findOne({username:username})
        res.status(200).json({
            status:200,
            user: user // password
        })
    }
    catch(error){
        res.statue(502).json({
            status:502,
            message: error.message
        })
    }
    finally{
        await client.close()
    }
}

module.exports = updateUser