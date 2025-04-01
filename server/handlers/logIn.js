const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const logIn = async(req, res) =>{
    const {username} = req.body

    if(!username){
        return res.status(404).json({
            status:404,
            message: "please enter a username"
        })
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        const user = await db.collection("users").findOne({username: username})
        if(!user){
            return res.status(404).json({
                status: 404,
                message: `${username} was not found`
            })
        }
        res.status(200).json({
            status: 200,
            user: {
                name: user.name,
                username: user.username,
                src: user.src
            }
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
module.exports = logIn