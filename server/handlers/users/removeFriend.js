const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const removeFriend = async(req, res) => {
    const {username, unfollow} = req.body
    // checks the input is valid
    if(!username){
        return res.status(400).json({
            status:400,
            message: "Please enter a the current user username"
        })
    }
    if(!unfollow){
        return res.status(400).json({
            status:400,
            message: "Please enter the username of the person you want to unfollow"
        })
    }
    if(username === unfollow){
        return res.status(400).json({
            status: 400,
            message: `${username} and ${unfollow} are the same`
        })
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        //
        const findUser = await db.collection("users").findOne({username: username}, {projection: {password: 0, _id : 0, email: 0}})
        if(!findUser){
            return res.status(404).json({
            status: 404,
            message: `${username} was not found`
            })
        }
        if(!findUser.follows.includes(unfollow)){
            return res.status(409).json({
            status: 409,
            message: `${username} does not follow ${unfollow}`
            })
        }
        const updateUserFollowsArray = await db.collection("users").updateOne({username: username}, {$pull:{follows: unfollow}})
        if(updateUserFollowsArray.modifiedCount === 0){
            return res.status(409).json({
            status:409,
            message: `${username} could not unfollow ${unfollow}`
            })
        }
        res.status(200).json({
            status: 200,
            username: username,
            message: `${username} does not follow ${unfollow} anymore`
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

module.exports = removeFriend