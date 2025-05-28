require("dotenv").config()
const {TMDB_API_KEY} = process.env

const searchGenre = async(req, res) => {
    const {genreId} = req.params
    const {page} = req.query
    const page1 = Number(page)
    const page2 = page1 + 1
    if(!genreId){
        return res.status(404).json({
            status:404,
            message: "Genre Id was not found"
        })
    }
    try {
        //getting 2 pages to get a total of 40 movies
        const url1 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page1}&sort_by=popularity.desc&with_genres=${genreId}`;
        const url2 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page2}&sort_by=popularity.desc&with_genres=${genreId}`;
        const options = {
            headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`
            }
        };
        
        const [json1, json2] = await Promise.all([
            fetch(url1, options).then(res => res.json()),
            fetch(url2, options).then(res => res.json())
            ])

        const moviesByGenre = [...json1.results, ...json2.results]
        const maxPages = json1.total_pages
        res.status(200).json({
            status: 200,
            moviesByGenre,
            maxPages
        })
    }
    catch(error){
        res.status(502).json({
            status:502,
            message: error.message
        })
    }
}

module.exports = searchGenre