const {MongoClient, ObjectId} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const likeReview = async(req, res) =>{
    const {username, name, reviewId} = req.body
    if(!username || !reviewId || !name){
        return res.status(400).json({
            status: 400,
            message: `The request is not complete`
        })
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        const id = new ObjectId(reviewId)
        const like = await db.collection("reviews").updateOne({_id: id}, {$push:{likes: {username: username, name: name}}})
        if(like.matchedCount === 0){
            return res.status(404).json({
            status:404,
            message: `review id (${reviewId}) was not found`
            })
        }
        if(like.modifiedCount === 0){
            return res.status(409).json({
            status: 409,
            message: `${username} was not able to like the review`
            })
        }
        res.status(200).json({
            status: 200,
            message: "The review was successfully liked"
        })
    }
    catch(error){
        return res.status(502).json({
            status:502,
            message: error.message
        })
    }
    finally{
        await client.close()
    }
}

module.exports = likeReview