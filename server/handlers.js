const addUser = require("./handlers/addUser")
const getUser = require("./handlers/getUser")
const getUsers = require("./handlers/getUsers")
const logIn = require("./handlers/logIn")
const updateUser = require("./handlers/updateUser")
const addList = require("./handlers/addList")
const movieDetails = require("./handlers/movieDetails")
const searchGenre = require("./handlers/searchGenre")
const searchQuery = require("./handlers/searchQuery")
const upcomingMovies = require("./handlers/upcomingMovies")
const popularMovies = require("./handlers/popularMovies")
const topMovies = require("./handlers/topMovies")
const getGenres = require("./handlers/getGenres")

module.exports = {
    addUser,
    getUser,
    getUsers,
    logIn,
    updateUser,
    addList,
    movieDetails,
    searchGenre,
    searchQuery,
    upcomingMovies,
    popularMovies,
    topMovies,
    getGenres
}