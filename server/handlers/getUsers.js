const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

//this will have acess to all users details, it will be used in the allUsersContext
const getUsers = async(req, res) =>{
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        const allUsers = await db.collection("users").find().project({_id:0, name: 1, username: 1, src:1}).toArray()
        if (allUsers.length === 0) {
            return res.status(404).json({
                status:404,
                message: "No user found"
        })}else{ 
        res.status(200).json({
            status: 200,
            allUsers: allUsers
        })}
    }
    catch(error){
        res.status(502).json({
            status: 502,
            message: error.message
        })
    }
    finally{
        await client.close()
    }
}

module.exports = getUsers