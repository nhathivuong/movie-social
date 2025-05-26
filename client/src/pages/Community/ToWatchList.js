import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
//context
import { UserContext } from "../../contexts/UserContext"
// component
import SplashScreen from "../../utilities/SplashScreen"
const ToWatchList = () => {
    const {loggedInUser} = useContext(UserContext)

    const toWatchList = loggedInUser?.lists.find(list => list.name === "To Watch")

    if(!toWatchList){
        return <SplashScreen/>
    }

    return <WatchSection>
            <h2>To Watch</h2>
            {toWatchList.movies.length > 0 
            ?<MoviesToWatch>
            {toWatchList.movies.map((movie)=>{
                return <NavLink key={movie.id} to={`/movie/${movie.id}`}>
                        <MovieIcon  
                        src={movie.poster_path 
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}` 
                        : "/assets/no_poster.jpg"}/>
                    </NavLink>
            })}</MoviesToWatch>
            :<p>No movies in the list</p>}
        </WatchSection>
}

const WatchSection = styled.div`
    margin:0 1rem;

`
const MoviesToWatch = styled.div`
    margin: 2rem 0;
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 0.75rem;
    height: fit-content;
`
const MovieIcon = styled.img`
    width: 75px;
`
export default ToWatchList