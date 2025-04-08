require("dotenv").config()
const {TMDB_API_KEY} = process.env

const popularMovies = async(req, res) =>{
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
        headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`
        }
    };
    try{
        const response = await fetch(url, options);
        const data = await response.json();

        res.status(200).json({
            status: 200,
            popularMovies: data.results
        })
    }
    catch(error){
        res.status(500).json({
            status:500,
            message: error.message
        })
    }
}

module.exports = popularMovies