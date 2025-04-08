require("dotenv").config()
const {TMDB_API_KEY} = process.env

const movieDetails = async(req, res) => {
    const {movieId} = req.params
    if(!movieId){
        return res.status(404).json({
            status:404,
            message: "movie Id was not found"
        })
    }
    try {
        //getting movie details, credits, recommendations and reviews
        const movieDetailsApi = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
        const creditsApi  = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
        const recommendationsApi  = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`;
        const reviewsApi  = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`
        const options = {
            headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`
            }
        };
        
        const [movieDetails, credits, recommendations , reviews] = await Promise.all([
            fetch(movieDetailsApi, options).then(res => res.json()),
            fetch(creditsApi, options).then(res => res.json()),
            fetch(recommendationsApi, options).then(res => res.json()),
            fetch(reviewsApi, options).then(res => res.json())
            ])

        res.status(200).json({
            status: 200,
            movieDetails,
            credits: credits.cast,
            directors: credits.crew.filter(crew => crew.job === 'Director'),
            recommendations: recommendations.results,
            reviews: reviews.results
        })
    }
    catch(error){
        res.status(500).json({
            status:500,
            message: error.message
        })
    }
}

module.exports = movieDetails