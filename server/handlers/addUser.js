const { MongoClient } = require("mongodb")
require("dotenv").config()
const { MONGO_URI } = process.env
const {v4: uuidv4 } = require("uuid")

const DATABASE = "movie";
const USER_COLLECTION = "users";

const addUser = async(req, res) => {
    const { name, email, username, picture } = req.body
    // validation
    const newUser = {
        _id: uuidv4(),
        name: name,
        username: username,
        email: email,
        pic: picture,
        bio: "",
        followers: [],
        favorites: [],
        reviews: [],
        likes: [],
        comment: [],
        status: "active"
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        await db.collection("users").insertOne(newUser)
        res.status(201).json({
            status: 201,
            data: newUser,
            message: `${username} account has been created`
        })
    }
    catch(error){
        return res.status(500).json({
            status:502,
            message: error.message
        })
    }
    finally{
        await client.close()
    }
}
export default addUser