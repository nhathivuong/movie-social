import { useContext, useEffect, useRef, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import styled from "styled-components"

//icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

//context
import { UserContext } from "../../contexts/UserContext";

// component
import Recommendations from "./Recommendations"
import Reviews from "./Reviews"

// this page gives all the informations for the selected movie
const MoviePage = () =>{
    const {loggedInUser,  setLoggedInUser}= useContext(UserContext)
    const [movieInfos , setMovieInfos] = useState()
    const [movieRecommendation, setMovieRecommendation] = useState()
    const [movieCast, setMovieCast] = useState()
    const [directors, setDirectors] = useState()
    const [movieReviews, setMovieReviews] = useState()
    const [listName, setListName] = useState()
    const [createVisible, setCreateVisible] = useState(false)
    const [listVisible, setListVisible] = useState(false)
    const {movieId} = useParams()
    const castRef = useRef()

    useEffect(()=>{
        setMovieInfos()
        setMovieRecommendation()
        setMovieCast()
        setDirectors()
        setMovieReviews()
        const fetchMoviePage = async() => {
            try {
                const response = await fetch(`/api/movie/${movieId}`);
                const data = await response.json();
        
                if (data.status === 200) {
                    setMovieInfos(data.movieDetails);
                    setMovieCast(data.credits); 
                    setDirectors(data.directors);
                    setMovieRecommendation(data.recommendations);
                    setMovieReviews(data.reviews);
                }
            }
            catch(error){
                console.error(error.message)
            }
        }
        fetchMoviePage()
    }, [movieId])

    // loads the initial information
    if(!movieInfos || !movieCast?.length || !directors?.length){
        return <Loading>Loading...</Loading>
    }

    // Arrow buttons click/scroll functions
    const arrowRightClick = (ref) => {
        ref.current.style.scrollBehavior = "smooth";
        ref.current.scrollLeft += 495;
    }
    const arrowLeftClick = (ref) => {
        ref.current.style.scrollBehavior = "smooth";
        ref.current.scrollLeft -= 495;
    }

    // makes the lists appear
    const listVisibility = () => {
        setListVisible(true)
    }
    //makes ths create list visible
    const createListVisibility = () => {
        setListVisible(false)
        setCreateVisible(true)
    }
    // make lists not visibles 
    const removeVisibility = () =>{
        setListVisible(false)
        setCreateVisible(false)
    }
    const updateList = (event) => {
        event.preventDefault()
        
        const options = {
            method: "POST",
            headers:{
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({username: loggedInUser.username, movieTitle: movieInfos.title, movieSrc: movieInfos.poster_path, listName: listName })
        }
        fetch(`/movie/${movieId}`, options)
        .then(res => {
            if(!res.ok){
                throw new Error("the movie was not added")
            }
            return res.json()
        })
        .then(data => {
            if(data.status === 200){
                setCreateVisible(false)
            }
        })
        .catch(error => console.error(error.message))
    }
    return <>
    <Backdrop 
        src={movieInfos.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${movieInfos.backdrop_path}` 
        : "/assets/no_backdrop.jpg"} 
        alt={`${movieInfos.title} backdrop`}/>
    <MovieInfos>
        <Synopsis>
            <div>
                <img 
                    src={movieInfos.poster_path 
                    ? `https://image.tmdb.org/t/p/original${movieInfos.poster_path}` 
                    : "/assets/no_poster.jpg"} 
                    alt={`${movieInfos.title} poster`} width={300}/>
                <NavLink>Write a Review</NavLink>
                <button type="button" onClick={listVisibility}>Save to List</button>
                
                {listVisible && <form onSubmit={updateList}>{loggedInUser && loggedInUser.lists.map((list)=>{
                    return <div key={list.name}>
                    <input type="checkbox" id={list.name} name={list.name} value={list.name} onChange={() => setListName(list.name)}/>
                    <label htmlFor={list.name}>{list.name}</label>
                    </div>
                })}
                    <button type="button" onClick={createListVisibility}>Create List</button>
                    {createVisible && <><label htmlFor="new-list">New List</label>
                    <input type="text" id="new-list" name="new-list" onChange={(event) => setListName(event.target.value)}/></>}
                    <button type="submit" onClick={removeVisibility}>Confirm</button>
                </form>}
            </div>
            <Details>
                <TitleYear>
                    <h2>{movieInfos.title}</h2>
                    <p>({movieInfos.release_date.split("-")[0]})</p>
                </TitleYear>
                {(movieInfos.title !== movieInfos.original_title) && <h3>{movieInfos.original_title}</h3>}
                <p>{movieInfos.tagline}</p>
                <Genres>
                    <h4>Genres:</h4>
                    <List>{movieInfos.genres.map((genre)=>{
                        return <li key={genre.id}><GenreLink to={`/browse?genre=${genre.name.toLowerCase()}`} state={{genreId: genre.id}}>{genre.name}</GenreLink></li>
                    })}</List>
                </Genres>
                <Rating>
                <h4>Average Rating:</h4>
                <MovieAverage>{movieInfos.vote_average.toFixed(1)}/10</MovieAverage>
                <p>({movieInfos.vote_count} votes)</p>
                </Rating>
                <Directors>
                <h4>Directors:</h4>
                {directors && <List>{directors.map((director)=>{
                    return <li key={director.id}>{director.name}</li>
                })}</List>}
                </Directors>
                <Overview>Overview:</Overview>
                <p>{movieInfos.overview}</p>
            </Details>
        </Synopsis>
        <div>
            <h2>Cast</h2>
            <ScrollWrapper>
            <Arrows onClick={() => arrowLeftClick(castRef)}><LeftArrow/></Arrows>
            {movieCast && <CastGrid ref={castRef}>{movieCast.map((cast)=>{
                return <li key={cast.id}>
                    <img src={cast.profile_path 
                    ? `https://image.tmdb.org/t/p/original${cast.profile_path}` 
                    : "/assets/no_profile.jpg"} 
                    alt={`${cast.name} profile picture`} width={150}/>
                    <Character>{cast.character}</Character>
                    <p>{cast.name}</p>
                </li>
            })}</CastGrid>}
            <Arrows onClick={() => arrowRightClick(castRef)}><RightArrow/></Arrows>
            </ScrollWrapper>
        </div>
        <Recommendations movieId={movieId} movieRecommendation={movieRecommendation}/>
        <Reviews movieReviews={movieReviews}/>
    </MovieInfos>
    </>    
}

//these are organise by order of appearance
const Loading = styled.h1`
    margin: 4rem auto;
    width: fit-content;
`
const Backdrop = styled.img`
    width:100%;
    height: 30vh;
    object-fit: cover;
    filter: brightness(30%);
`
const MovieInfos = styled.div`
    position:relative;
    top: -20vh;
    margin: 0 4em;
`
const Synopsis = styled.div`
    display:flex;
    flex-direction:row;
    gap: 2rem;
`
const Details = styled.div`
    margin-top: 20vh;
    padding-top: 1rem;
`
const TitleYear = styled.div`
    display:flex;
    flex-direction: row;
    align-items:baseline;
    gap: 1rem;
`
const Genres = styled.div`
    margin-top: 0.7rem;
    display:flex;
    flex-direction: row;
`
const List = styled.ul`
    display:flex;
    flex-direction: row;
    list-style: none;
    padding-left: 1rem;
    gap: 0.5rem;
`
const GenreLink = styled(NavLink)`
    color:var(--color-accent);
`
const Rating = styled(Genres)`
    margin-top: 0.3rem;
`
const MovieAverage = styled.p`
    margin-left: 1rem;
    margin-right: 0.5rem;
`
const Directors = styled(Rating)`
    margin-bottom: 0.7rem;
`
const Overview = styled.h4`
    margin-bottom: 0.3rem;
`
const ScrollWrapper = styled.div`
    display:flex;
    flex-direction:row;
`
const Arrows = styled.button`
    padding: 5px 8px;
    cursor: pointer;
    height: 150px;
    background:none;
    margin: 4rem 1rem;
    color: var(--color-light);
    border:none;
    &:hover{
        background-color: var(--color-accent)
    }
`
const LeftArrow = styled(IoIosArrowBack)`
    font-size: 2rem;
`
const RightArrow = styled(IoIosArrowForward)`
    font-size: 2rem;
`
const CastGrid = styled.ul`
    display: flex;
    flex-direction:row;
    gap: 15px;
    margin: 1rem auto;
    list-style: none;
    overflow-x: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
`

const Character = styled.h3`
    color: var(--color-accent);
`

export default MoviePage