import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import styled from "styled-components"
import MoviePoster from "./MoviePoster"
// this page gives all the informations for the selected movie
const MoviePage = () =>{
    const [movieInfos , setMovieInfos] = useState()
    const [movieRecommendation, setMovieRecommendation] = useState()
    const [recommendations, setRecommendations] = useState()// contains 8 random recommendations
    const [movieCast, setMovieCast] = useState()
    const [movieCrew, setMovieCrew] = useState()
    const [directors, setDirectors] = useState() // contains the directors
    const [movieReviews, setMovieReviews] = useState()
    const {movieId} = useParams()

    useEffect(()=>{
        setMovieInfos()
        setMovieRecommendation()
        setMovieCast()
        setMovieCrew()
        setMovieReviews()
        const fetchMoviePage = async() => {
            try {
                //getting movie detail, movie recommendations and 
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
                setMovieInfos(json1)
                setMovieCast(json2.cast)
                setMovieCrew(json2.crew)
                setMovieRecommendation(json3.results)
                setMovieReviews(json4.results)
                //only keeps the directors from the crew
                if(movieCrew){
                    setDirectors(movieCrew.filter((crew) => crew.job === "Director"))
                }
                //randomise 8 recommendations
                if(movieRecommendation){
                    setRecommendations([...movieRecommendation].sort(() => Math.random() - 0.5).slice(0, 8))
                }
            }
            catch(error){
                console.error(error.message)
            }
        }
        fetchMoviePage()
    }, [movieId])

    return <>{movieInfos && <>
    <Backdrop 
        src={movieInfos.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${movieInfos.backdrop_path}` 
        : "/assets/no_backdrop.jpg"} 
        alt={`${movieInfos.title} backdrop`}/>
    <img 
        src={movieInfos.poster_path 
        ? `https://image.tmdb.org/t/p/original${movieInfos.poster_path}` 
        : "/assets/no_poster.jpg"} 
        alt={`${movieInfos.title} poster`} width={300}/>
    <div>
        <h2>{movieInfos.title}</h2>
        <p>{movieInfos.release_date}</p>
        {(movieInfos.title !== movieInfos.original_title) && <h3>movieInfos.original_title</h3>}
        <p>{movieInfos.tagline}</p>
        <h4>Genres:</h4>
        <ul>{movieInfos.genres.map((genre)=>{
            return <li key={genre.id}><NavLink to={`/browse?genre=${genre.name.toLowerCase()}`} state={{genreId: genre.id}}>{genre.name}</NavLink></li>
        })}</ul>
        <h4>Rating:</h4>
        <p>{movieInfos.vote_average}</p>
        <p>{movieInfos.vote_count}</p>
        <h4>Directors:</h4>
        {directors && <ul>{directors.map((director)=>{
            return <li key={director.id}>{director.name}</li>
        })}</ul>}
        <h4>Overview:</h4>
        <p>{movieInfos.overview}</p>
    </div>
    <div>
        <h4>Cast</h4>
        {movieCast && <ul>{movieCast.map((cast)=>{
            return <li>
                <img src={cast.profile_path 
                ? `https://image.tmdb.org/t/p/original${cast.profile_path}` 
                : "/assets/no_profile.jpg"} 
                alt={`${cast.name} profile picture`} width={100}/>
                <h5>{cast.character}</h5>
                <p>{cast.name}</p>
            </li>
        })}</ul>}
    </div>
    <div>
        <h4>Recommendations</h4>
        {recommendations 
        ?<div>{recommendations.map((movie) => {
            return <MoviePoster key={movie.id} movie={movie}/>
        })}</div>
        :<p>recommendations</p>}
    </div>
    <div>
        <h4>Reviews</h4>
        {movieReviews 
        ?<div>{movieReviews.map((review) => {
            return <div>
                <img src={review.author_details.avatar_path
                ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}` 
                : "/assets/default_picture.svg"} 
                alt={`${review.author_details.username} profile picture`} width={100}/>
                <h5>{review.author_details.username}</h5>
                <p>{review.author_details.rating}</p>
                <p>{review.content}</p>
            </div>
        })}</div>
        :<p>No Reviews</p>}
    </div>
    </>
    }</>
    
}
const Backdrop = styled.img`
    width:100%;
    height: 30vh;
    object-fit: cover;
`
export default MoviePage