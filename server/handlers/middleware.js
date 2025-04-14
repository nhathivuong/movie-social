const { MongoClient } = require("mongodb")
require("dotenv").config()
const { MONGO_URI } = process.env

const middleware = async(req, res) =>{
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db("movie");
        const user = await db.collection("users").findOne({_id: req.user._id}, {projection: {password: 0, _id : 0}})
        res.status(200).json({
            status:200,
            user: user
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

module.exports = middleware