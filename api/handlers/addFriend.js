const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const addFriend = async (req, res) =>{
    const {username, newFollow} = req.body
    // checks the input is valid
    if(!username){
        return res.status(400).json({
            status:400,
            message: "Please enter a username"
        })
    }
    if(!newFollow){
        return res.status(400).json({
            status:400,
            message: "Please enter an user you want to follow"
        })
    }
    if(username === newFollow){
        return res.status(400).json({
            status: 400,
            message: `${username} and ${newFollow} are the same`
        })
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        //find if the users exists in the database
        const findUser = await db.collection("users").findOne({username: username})
        if(!findUser){
            return res.status(404).json({
            status:404,
            message: `${username} was not found`
            })
        }
        const findNewFollow = await db.collection("users").findOne({username: newFollow})
        if(!findNewFollow){
            return res.status(404).json({
            status:404,
            message: `${newFollow} was not found`
            })
        }
        // find if the user already follows newFollow
        if(findUser.follows.includes(newFollow)){
            return res.status(409).json({
            status:409,
            message: `${username} already follows ${newFollow}`
            })
        }
        // adds newFollow in the user follows array 
        const addNewFollow = await db.collection("users").updateOne({username: username}, {$push: {follows: newFollow}})
        if(addNewFollow.matchedCount === 0){
            return res.status(404).json({
            status:404,
            message: `${username} was not found`
            })
        }
        if(addNewFollow.modifiedCount === 0){
            return res.status(409).json({
            status: 409,
            message: `${newFollow} was not added to ${username}'s follows`
            })
        }
        res.status(200).json({
            status:200,
            username: username,
            message:`${username} now follows ${newFollow}`
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

module.exports = addFriend