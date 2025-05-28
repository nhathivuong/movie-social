const {MongoClient, ObjectId} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const addComment = async (req,res) =>{
    const {comment, username, reviewId} = req.body
    if(!comment||!username ||!reviewId){
        return res.status(400).json({
            status:400,
            message: "The request is missing data"
        })
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        const id = new ObjectId(reviewId)
        const commentInfo = {
            username: username, 
            text:comment, 
            edited: false,
            createdAt: new Date()
        }
        const commentReview = await db.collection("reviews").updateOne({_id: id}, {$push:{comments: commentInfo}})
        if(commentReview.matchedCount === 0){
            return res.status(404).json({
            status:404,
            message: `Review Id(${reviewId}) was not found`
            })
        }
        if(commentReview.modifiedCount === 0){
            return res.status(409).json({
            status: 409,
            message: `The comment was not successfully posted`
            })
        }
        res.status(200).json({
            status: 200,
            message: "The comment was succesful on the review"
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

module.exports = addComment