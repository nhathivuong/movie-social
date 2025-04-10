const addUser = require("./handlers/addUser")
const getUser = require("./handlers/getUser")
const getUsers = require("./handlers/getUsers")
const logIn = require("./handlers/logIn")
const updateUser = require("./handlers/updateUser")
const addList = require("./handlers/addList")
const addReview = require("./handlers/addReview")
const movieDetails = require("./handlers/movieDetails")
const searchGenre = require("./handlers/searchGenre")
const searchQuery = require("./handlers/searchQuery")
const homeMovies = require("./handlers/homeMovies")
const getGenres = require("./handlers/getGenres")
const getReviews = require("./handlers/getReviews")

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
    getReviews
}