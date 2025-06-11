import { NavLink } from "react-router-dom"
import styled from "styled-components"

//this will used for all movies quick display
const MoviePoster = ({movie}) =>{
    return <Navigation to={`/movie/${movie.id}`} draggable="false">
        <img  
        src={movie.poster_path 
        ? `https://image.tmdb.org/t/p/original${movie.poster_path}` 
        : "/assets/no_poster.jpg"} 
        alt={movie.title} 
        width={150} height={225}/>
        <MovieTitle>{movie.title}</MovieTitle>
    </Navigation>
}
const Navigation = styled(NavLink)`
    &:hover{
        text-decoration-color: var(--color-accent);
    }
`
const MovieTitle = styled.h3`
    width:150px;
    display: -webkit-box;
    line-height: 1.2;
    -webkit-line-clamp: 2;
    overflow:hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`
export default MoviePoster