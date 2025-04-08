require("dotenv").config()
const {TMDB_API_KEY} = process.env

const getGenres = async(req, res) =>{
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
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
            genres: data.genres
        })
    }
    catch(error){
        res.status(500).json({
            status:500,
            message: error.message
        })
    }
}

module.exports = getGenres