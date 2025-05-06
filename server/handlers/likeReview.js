const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const likeReview = async(req, res) =>{
    const {username, reviewId} = req.body
    if(!username || !reviewId){
        return res.status(404).json({
            status: 404,
            message: `The body is not complete`
        })
    }
    try{
        const client = new MongoClient(MONGO_URI)
        await client.connect()
        const db = client.db("movie")
        const like = db.collection("reviews").updateOne({_id: reviewId}, {$push:{likes: username}})
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