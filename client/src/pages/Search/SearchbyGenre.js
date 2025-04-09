import { useEffect, useState } from "react"
import MoviePoster from "../MoviePoster";

// this gets the movies sorted by popularity based on genre
const SearchbyGenre = ({genreId}) => {
    const [moviesbyGenre , setMoviesbyGenre] = useState()

    useEffect(()=>{
        //this ensure the moviesbyGenre is empty each time we switch
        setMoviesbyGenre()
        const fetchMovies = async() => {
            try {
                const response = await fetch(`https://movie-social-backend.vercel.app/api/genre/${genreId}`);
                const data = await response.json();
                if (data.status === 200) {
                    setMoviesbyGenre(data.moviesByGenre);
                }
            }
            catch(error){
                console.error(error.message)
            }
        }
        fetchMovies()
    },[genreId])

    return <>
        {moviesbyGenre 
        ? moviesbyGenre.map((movie)=>{
            return <MoviePoster key={movie.id} movie={movie}/>
        })
        :<p>Loading...</p> }</>
}


export default SearchbyGenre