import { NavLink } from "react-router-dom"
import styled from "styled-components"

//this will used for all movies quick display
const MoviePoster = ({movie}) =>{
    return <NavLink to={`/movie/${movie.id}`} draggable="false">
        <img  
        src={movie.poster_path 
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}` 
        : "/assets/no_poster.jpg"} 
        alt={movie.title} 
        width={150} height={225}/>
        <MovieTitle>{movie.title}</MovieTitle>
    </NavLink>
}
const MovieTitle = styled.h3`
    width:150px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow:hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`
export default MoviePoster