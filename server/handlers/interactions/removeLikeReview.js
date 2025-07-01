const {MongoClient, ObjectId} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const removeLikeReview = async(req, res) =>{
    const {username, name, reviewId} = req.body
    if(!username || !reviewId || !name){
        return res.status(400).json({
            status: 400,
            message: `The request is not complete`
        })
    }
    if (!ObjectId.isValid(reviewId)) {
    return res.status(400).json({
    status: 400,
    message: "Invalid reviewId format"
    });
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        const removeLike = await db.collection("reviews").updateOne({_id: new ObjectId(`${reviewId}`)}, {$pull:{likes: {username: username, name: name}}})
        if(removeLike.matchedCount === 0){
            return res.status(404).json({
            status:404,
            message: `review id (${reviewId}) was not found`
            })
        }
        if(removeLike.modifiedCount === 0){
            return res.status(409).json({
            status: 409,
            message: `${username} was not able to remove the like for the review`
            })
        }
        res.status(200).json({
            status: 200,
            message: "The review was successfully unliked"
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

module.exports = removeLikeReview