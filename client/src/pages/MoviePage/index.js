import { useEffect, useRef, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import styled from "styled-components"

//icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

// component
import Recommendations from "./Recommendations"
import Reviews from "./Review"

// this page gives all the informations for the selected movie
const MoviePage = () =>{
    const [movieInfos , setMovieInfos] = useState()
    const [movieRecommendation, setMovieRecommendation] = useState()
    const [movieCast, setMovieCast] = useState()
    const [directors, setDirectors] = useState() // contains the directors
    const [movieReviews, setMovieReviews] = useState()
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
                //getting movie details, credits and reviews
                const movieDetails = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
                const credits = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
                const recommendations = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`;
                const reviews = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc1OTMwMjU1YWVjYzI2ZWU5MDIxYjliNjkwNzczZiIsIm5iZiI6MTc0MzA0NTg1OS40LCJzdWIiOiI2N2U0YzRlM2Y4NDY3OTRlOTkxMDk5NGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rm5e7ovYbkMaOkH0I5hy-CjAPUSSUYyR1ov3TEgRWjY'
                    }
                };
                
                const [json1, json2, json3, json4] = await Promise.all([
                    fetch(movieDetails, options).then(res => res.json()),
                    fetch(credits, options).then(res => res.json()),
                    fetch(recommendations, options).then(res => res.json()),
                    fetch(reviews, options).then(res => res.json())
                    ])
                //sets all the info needed for the page
                setMovieInfos(json1)
                setMovieCast(json2.cast) //limited to 20 for performance
                setDirectors(json2.crew.filter((crew) => crew.job === "Director"))
                setMovieRecommendation(json3.results)
                setMovieReviews(json4.results)
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
    return <>
    <Backdrop 
        src={movieInfos.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${movieInfos.backdrop_path}` 
        : "/assets/no_backdrop.jpg"} 
        alt={`${movieInfos.title} backdrop`}/>
    <MovieInfos>
        <Synopsis>
            <img 
                src={movieInfos.poster_path 
                ? `https://image.tmdb.org/t/p/original${movieInfos.poster_path}` 
                : "/assets/no_poster.jpg"} 
                alt={`${movieInfos.title} poster`} width={300}/>
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