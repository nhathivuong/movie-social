import { useEffect, useState } from "react"
import MoviePoster from "../MoviePoster"

const SearchedMovies = ({search}) => {
    const [moviesSearched, setMoviesSearched] = useState()
    useEffect(()=>{
        //this ensure the moviesSearched is empty each time we switch
        setMoviesSearched()
        const fetchMovies = async() => {
            try {
                //getting 2 pages to get a total of 40 movies
                const url1 = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
                const url2 = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=2`;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc1OTMwMjU1YWVjYzI2ZWU5MDIxYjliNjkwNzczZiIsIm5iZiI6MTc0MzA0NTg1OS40LCJzdWIiOiI2N2U0YzRlM2Y4NDY3OTRlOTkxMDk5NGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rm5e7ovYbkMaOkH0I5hy-CjAPUSSUYyR1ov3TEgRWjY'
                    }
                };
                
                const [json1, json2] = await Promise.all([
                    fetch(url1, options).then(res => res.json()),
                    fetch(url2, options).then(res => res.json())
                    ])

                setMoviesSearched([...json1.results, ...json2.results])
            }
            catch(error){
                console.error(error.message)
            }
        }
        fetchMovies()
    },[search])

    return <>
    {moviesSearched 
    ? moviesSearched.map((movie)=>{
        return <MoviePoster key={movie.id} movie={movie}/>
    })
    :<p>Loading...</p> }</>
}

export default SearchedMovies