const express = require("express");
const morgan = require("morgan");
require("dotenv").config()
const cors = require('cors');

const port = process.env.PORT || 4000;

const app = express();

app.use(cors({
    origin: [
        'https://film-media.vercel.app'
    ],
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true
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
    removeFriend,
    verifyToken,
    middleware,
    likeReview,
    removeLikeReview,
    addComment
} = require("./handlers")

//// Users endpoints ////

// this get all the users basic info(name, username, src)
app.get("/users", getUsers)
// this is used to get the user's selected info
app.get("/user/:username", getUser);
// this creates and account when a user sign up to the website
app.post("/user", addUser);
// login the user
app.post("/login", logIn)
//changes the user information 
app.patch("/user/:username", updateUser)
//adds friend
app.patch("/add-friend", addFriend)
//remove friend
app.patch("/remove-friend", removeFriend)
// verify token and gives loggedin user info
app.get("/profile", verifyToken, middleware)

//// Interactions endpoints ////

// either add a movie to a list or create a list
app.post("/movie/:movieId/list", addList)
//this gets all the reviews
app.get("/reviews", getReviews)
// creates a review
app.post("/movie/:movieId/review", addReview)
//this allows the user to like a review
app.patch("/like-review", likeReview)
//this allows the user to remove their like on a review
app.patch("/unlike-review", removeLikeReview)
// adds a comment to a review 
app.patch("/comment-review", addComment)

//// TMDB API endpoints ////

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

app.use('*', (req, res) => {
    res.status(404).json({status: 404, message: "Endpoint not found!"});
    });
    
app.listen(port, () => {console.log("Server listening on port ", port);});
