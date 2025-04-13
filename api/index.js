const express = require("express");
const morgan = require("morgan");
require("dotenv").config()
const cors = require('cors');

const port = process.env.PORT || 4000;

const app = express();

app.use(cors({
    origin: [
        'https://movie-social-delta.vercel.app',
        'https://movie-social-git-dev-nha-thi-vuongs-projects.vercel.app/' // development frontend
    ],
    methods: ['GET', 'POST', 'PATCH'],
}));

//middleware
app.use(express.json());
app.use(morgan("tiny"));

//handlers
const {
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
    removeFriend
} = require("./handlers")

// this creates and account when a user sign up to the website
app.post("/user", addUser);

// this is used to get all the user's info
app.get("/user/:username", getUser);

// this get all the users basic info(name, username, src)
app.get("/users", getUsers)

// login the user
app.post("/login", logIn)

//changes the user information 
app.patch("/user/:username", updateUser)

// either add a movie to a list or create a list
app.post("/movie/:movieId/list", addList)

// creates a review
app.post("/movie/:movieId/review", addReview)

// gets all the movie details from the tmdb API
app.get("/api/movie/:movieId", movieDetails)

// filters movies by genre from the tmdb API
app.get("/api/genre/:genreId", searchGenre)

// searches movies based on a query from the tmdb API
app.get("/api/search/:query", searchQuery)

// give you all the movies(upcoming, top rated and popular) for the homepage from the tmdb API
app.get("/api/home", homeMovies)

//gives you a list of all official genres from the tmdb API
app.get("/api/genres", getGenres)

//this gets all the reviews
app.get("/reviews", getReviews)

//adds friend
app.patch("/addFriend", addFriend)
//remove friend
app.patch("/removeFriend", removeFriend)

app.use('*', (req, res) => {
    res.status(404).json({status: 404, message: "Endpoint not found!"});
    });
    
app.listen(port, () => {console.log("Server listening on port ", port);});
