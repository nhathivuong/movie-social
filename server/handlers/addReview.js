const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env
const {v4: uuidv4 } = require("uuid")

const addReview = async(req, res)=>{
    const {movieId} = req.params
    const {content, rating, username} = req.body
    if(!content||!rating||!username){
        return res.status(400).json({
            status:400,
            message: "The request is missing data"
        })
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        const review = {
            movieId: movieId,
            username: username,
            rating: rating,
            content: content,
            createdAt: new Date()
        }
        const alreadyReviewed = await db.collection("reviews").findOne({movieId: movieId, username:username})
        if(alreadyReviewed){
            return res.status(409).json({
                status: 409,
                message: `${username} has already reviewed this movie`
            })
        }
        else{
            await db.collection("reviews").insertOne(review)
            res.status(201).json({
                status:201,
                message: "The review was posted",
                review: review
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

module.exports = addReview