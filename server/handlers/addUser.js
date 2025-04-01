const { MongoClient } = require("mongodb")
require("dotenv").config()
const { MONGO_URI } = process.env
const {v4: uuidv4 } = require("uuid")

// this creates and account when a user sign up to the website
const addUser = async(req, res) => {
    const { name, email, username, picture } = req.body

    // checks if the body is filled properly
    if(!name ||!email ||!username ||!picture){
        return res.status(404).json({
            status: 404,
            message: "The request is missing data"
        })
    }
    
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

        // checks if the user(username or email) already exist in the database
        const usernameTaken = await db.collection("users").findOne({username: username})
        if(usernameTaken){
            return res.status(400).json({
                status:400,
                message: "The username is already taken"
            })
        }
        const emailTaken = await db.collection("users").findOne({email: email})
        if(emailTaken){
            return res.status(400).json({
                status:400,
                message: "The email is already taken"
            })
        }
        //creates the user in the database
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