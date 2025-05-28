const { MongoClient } = require("mongodb")
require("dotenv").config()
const { MONGO_URI } = process.env

const getReviews = async(req, res) =>{
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db("movie");
        const reviews = await db.collection("reviews").find().toArray();
        res.status(200).json({ status: 200, data: reviews});

    } catch (error) {
        res.status(502).json({ status: 502, message: error.message })

    } finally {
        client.close();
    }
}

module.exports = getReviews