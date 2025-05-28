// users handlers
const getUsers = require("./handlers/users/getUsers")
const getUser = require("./handlers/users/getUser")
const addUser = require("./handlers/users/addUser")
const logIn = require("./handlers/users/logIn")
const updateUser = require("./handlers/users/updateUser")
const addFriend = require("./handlers/users/addFriend")
const removeFriend = require("./handlers/users/removeFriend")
const verifyToken = require("./handlers/users/verifyToken")
const middleware = require("./handlers/users/middleware")
// interactions handlers
const addList = require("./handlers/interactions/addList")
const getReviews = require("./handlers/interactions/getReviews")
const addReview = require("./handlers/interactions/addReview")
const likeReview = require("./handlers/interactions/likeReview")
const removeLikeReview = require("./handlers/interactions/removeLikeReview")
const addComment = require("./handlers/interactions/addComment")
// TMDB API handlers
const movieDetails = require("./handlers/tmdb/movieDetails")
const searchGenre = require("./handlers/tmdb/searchGenre")
const searchQuery = require("./handlers/tmdb/searchQuery")
const homeMovies = require("./handlers/tmdb/homeMovies")
const getGenres = require("./handlers/tmdb/getGenres")

module.exports = {
    addUser,
    getUser,
    getUsers,
    logIn,
    updateUser,
    addList,
    addReview,
    movieDetails,
    searchGenre,
    searchQuery,
    homeMovies,
    getGenres,
    getReviews,
    addFriend,
    removeFriend,
    verifyToken,
    middleware,
    likeReview,
    removeLikeReview,
    addComment
}