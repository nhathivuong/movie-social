//this will used for all movies quick display
import { NavLink } from "react-router-dom"

const MoviePoster = ({movie}) =>{
    return <NavLink to={`/movie/${movie.id}`}>
        <img  
        src={movie.poster_path 
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}` 
        : "/assets/no_poster.jpg"} 
        alt={movie.title} 
        width={150} height={225}/>
        <h3>{movie.title}</h3>
    </NavLink>
}

export default MoviePoster