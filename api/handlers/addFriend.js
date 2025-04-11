const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const addFriend = async (req, res) =>{
    const {name, newFriend} = req.body
    if(!name){
        return res.status(408).json({
            status:408,
            message: "Please enter a name"
        })
    }
    if(!newFriend){
        return res.status(408).json({
            status:408,
            message: "Please enter a newFriend"
        })
    }
    if(name === newFriend){
        return res.status(400).json({
            status: 400,
            message: `${name} and ${newFriend} are the same`
        })
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db(DB)
        const findUser = await db.collection("users").findOne({name: name})
        if(!findUser){
            return res.status(404).json({
            status:404,
            message: `${name} was not found`
            })
        }
        const findNewFriend = await db.collection("users").findOne({name: newFriend})
        if(!findNewFriend){
            return res.status(404).json({
            status:404,
            message: `${newFriend} was not found`
            })
        }
        if(findUser.friends.includes(newFriend)|| findNewFriend.friends.includes(name)){
            return res.status(409).json({
            status:409,
            message: `${newFriend} is already ${name}'s friend`
            })
        }
        const addFriendUser = await db.collection("users").updateOne({name: name}, {$push: {friends: newFriend}})
        const addFriendNewFriend = await db.collection("users").updateOne({name:newFriend},  {$push: {friends: name}})
        if(addFriendNewFriend.matchedCount === 0 || addFriendUser.matchedCount === 0){
            return res.status(404).json({
            status:404,
            message: `${name} or ${newFriend} was not found`
            })
        }
        if(addFriendUser.modifiedCount === 0){
            return res.status(409).json({
            status: 409,
            message: `${newFriend} was not added to ${name}'s friends`
            })
        }
        if(addFriendNewFriend.modifiedCount === 0){
            return res.status(409).json({
            status: 409,
            message: `${name} was not added to ${newFriend}'s friends`
            })
        }
        res.status(200).json({
            status:200,
            message:`${name} and ${newFriend} are now friend`
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