require("dotenv").config()
const {TMDB_API_KEY} = process.env

const homeMovies = async(req, res) => {
    try {
        //getting all the movies for the homepage
        const popularMoviesApi = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&include_adult=false"
        const topRatedMoviesApi  = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&include_adult=false"
        const upcomingMoviesApi  = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&include_adult=false"
        const options = {
            headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`
            }
        };
        
        const [popularMovies, topRatedMovies, upcomingMovies] = await Promise.all([
            fetch(popularMoviesApi, options).then(res => res.json()),
            fetch(topRatedMoviesApi, options).then(res => res.json()),
            fetch(upcomingMoviesApi, options).then(res => res.json())
            ])

        res.status(200).json({
            status: 200,
            popularMovies: popularMovies.results,
            topRatedMovies: topRatedMovies.results,
            upcomingMovies: upcomingMovies.results
        })
    }
    catch(error){
        res.status(500).json({
            status:500,
            message: error.message
        })
    }
}

module.exports = homeMovies