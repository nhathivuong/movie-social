require("dotenv").config()
const {TMDB_API_KEY} = process.env

const searchQuery = async(req, res) => {
    const {query} = req.params
    if(!query){
        return res.status(404).json({
            status:404,
            message: "Query not found"
        })
    }
    try {
        //getting 2 pages to get a total of 40 movies
        const url1 = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
        const url2 = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=2`;
        const options = {
            headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`
            }
        };
        
        const [json1, json2] = await Promise.all([
            fetch(url1, options).then(res => res.json()),
            fetch(url2, options).then(res => res.json())
            ])

        const moviesSearched = [...json1.results, ...json2.results]

        res.status(200).json({
            status: 200,
            moviesSearched
        })
    }
    catch(error){
        res.status(500).json({
            status:500,
            message: error.message
        })
    }
}

module.exports = searchQuery