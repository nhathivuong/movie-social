const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const removeFriend = async(req, res) => {
    const {name, exFriend} = req.body
    if(!name){
        return res.status(408).json({
            status:408,
            message: "Please enter a name"
        })
    }
    if(!exFriend){
        return res.status(408).json({
            status:408,
            message: "Please enter an exFriend"
        })
    }
    if(name === exFriend){
        return res.status(400).json({
            status: 400,
            message: `${name} and ${exFriend} are the same`
        })
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db(DB)
        const findFriends = await db.collection("users").findOne({name: name})
        if(!findFriends){
            return res.status(404).json({
            status: 404,
            message: `${name} was not found`
            })
        }
        if(!findFriends.friends.includes(exFriend)){
            return res.status(409).json({
            status: 409,
            message: `${name} and ${exFriend} are not friends`
            })
        }
        const updateExFriendFriendsArray = await db.collection("users").updateOne({name: exFriend}, {$pull:{friends: name}})
        const updateNameFriendsArray = await db.collection("users").updateOne({name: name}, {$pull:{friends: exFriend}})
        if(updateExFriendFriendsArray.modifiedCount === 0 || updateNameFriendsArray.modifiedCount === 0){
            return res.status(409).json({
            status:409,
            message: `${name} and ${exFriend} are still friends, could not stop being friends`
            })
        }
        res.status(200).json({
            status: 200,
            message: `${name} and ${exFriend} are not friends anymore after a fight`
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