import { useEffect, useState } from "react"
import MoviePoster from "../MoviePoster"

const SearchedMovies = ({search}) => {
    const [moviesSearched, setMoviesSearched] = useState()
    useEffect(()=>{
        //this ensure the moviesSearched is empty each time we switch
        setMoviesSearched()
        const fetchMovies = async() => {
            try {
                const response = await fetch(`https://movie-social-backend.vercel.app/api/search/${search}`);
                const data = await response.json();
                if (data.status === 200) {
                    setMoviesSearched(data.moviesSearched);
                }
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