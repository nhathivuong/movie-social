import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
//context
import { UserContext } from "../../contexts/UserContext"

const ToWatchList = () => {
    const {loggedInUser} = useContext(UserContext)
    const [toWatchList, setToWatchList] = useState()
    const [toWatchMoviesInfos, setToWatchMoviesInfos] = useState()

    useEffect(()=>{
        const getMovieInfoToWatchList = async()=>{
            try{
                const toWatchList = loggedInUser.lists.find(list => list.name === "To Watch")
                setToWatchList(toWatchList)
                const watchMovieRequest = toWatchList.movies.map(movie =>
                    fetch(`https://movie-social.onrender.com/api/movie/${movie.id}`)
                    .then(res => res.json())
                    .then(data => data.movieDetails)
                )
                const watchMoviesInfos = await Promise.all(watchMovieRequest)
                setToWatchMoviesInfos(watchMoviesInfos)
            }
            catch(error){
                console.error(error.message)
            }
        }
        if (loggedInUser) {
            getMovieInfoToWatchList()
        }
    },[loggedInUser])
    
    if(!toWatchList|| !toWatchMoviesInfos){
        return <p>Loading watch list...</p>
    }

    return <WatchSection>
            {toWatchList.movies.length > 0 
            ? <>
            <h2>To Watch</h2>
            <MoviesToWatch>
            {toWatchList.movies.map((movie, index)=>{
                const movieInfo = toWatchMoviesInfos[index]
                return <NavLink to={`/movie/${movie.id}`}>
                        <MovieIcon  
                        src={movieInfo.poster_path 
                        ? `https://image.tmdb.org/t/p/original${movieInfo.poster_path}` 
                        : "/assets/no_poster.jpg"}/>
                    </NavLink>
            })}</MoviesToWatch>
            </>
            :<p>No movies in the To Watch list</p>}
        </WatchSection>
}

const WatchSection = styled.div`
    margin:0 1rem;
`
const MoviesToWatch = styled.div`
    margin: 2rem 0;
`
const MovieIcon = styled.img`
    width: 75px;
    margin: 0.2rem;
`
export default ToWatchList