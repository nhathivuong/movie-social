const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const addList = async(req, res) =>{
    const {movieId} = req.params
    const {username, movieTitle, movieSrc, listName} = req.body
    if(!movieId||!username||!movieTitle||!movieSrc||!listName){
        return res.status(404).json({
            status:404,
            message: "The request is missing data"
        })
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("movie")
        const movie = {
            title: movieTitle,
            id: movieId,
            src: movieSrc
        }
        const user = await db.collection("users").findOne({username:username})
        if(!user){
            return res.status(404).json({
                status:404,
                message: `${username} was not found`
            })
        }
        const findList = user.lists.findIndex(list => list.name === listName)
        if(findList !== -1){
            const findMovie = user.lists[findList].movies.some(movie => movie.id === movieId)
            if(findMovie){
                return res.status(409).json({
                    status: 409,
                    message: `${movieTitle} is already in the list `
                })
            }
            if(!findMovie){
                const addMovie = await db.collection("users").updateOne({username: username, "lists.name": listName},{$push:{"lists.$.movies": movie}})
                if(addMovie.matchedCount === 0){
                    return res.status(404).json({
                        status:404,
                        message: `${listName} was not found`
                    })
                }
                if(addMovie.modifiedCount === 0){
                    return res.status(409).json({
                        status:409,
                        message: `${movieTitle} was not added to ${listName}`
                    })
                }
                res.status(201).json({
                    status:201,
                    message: `${movieTitle} was added to ${listName}`
                })
            }
        }
        else{
            const addList = await db.collection("users").updateOne({username: username}, {$push: {lists: {name: listName, movies: [movie]}}})
            if(addList.matchedCount === 0){
                return res.status(404).json({
                    status:404,
                    message: `${username} was not found`
                })
            }
            if(addList.modifiedCount === 0){
                return res.status(409).json({
                    status:409,
                    message: `${listName} was not added`
                })
            }
            res.status(201).json({
                status:201,
                message: `${listName} was created`
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

module.exports = addList