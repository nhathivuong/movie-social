import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"

//icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

//context
import { UserContext } from "../../contexts/UserContext";
import { AllReviewsContext } from "../../contexts/AllReviewsContext"

// component
import Recommendations from "./Recommendations"
import Reviews from "./Reviews"
import Details from "./Details"
import SaveList from "./interactions/SaveList";
import WriteReview from "./interactions/WriteReview";
import SplashScreen from "../../utilities/SplashScreen";

// this page gives all the informations for the selected movie
const MoviePage = () =>{
    const {loggedInUser}= useContext(UserContext)
    //reviews from the user database
    const {allReviews} = useContext(AllReviewsContext)
    //state for all the movie info on the page
    const [movieInfos , setMovieInfos] = useState()
    const [movieRecommendation, setMovieRecommendation] = useState()
    const [movieCast, setMovieCast] = useState()
    const [directors, setDirectors] = useState()
    const [movieReviews, setMovieReviews] = useState()
    //this gets movieId needed for the fetch
    const {movieId} = useParams()
    //used the cast scroll
    const castRef = useRef()
    // used to toggle the review section
    const [reviewVisible, setReviewVisible] = useState(null)
    // used to toggle the review section
    const [listVisible, setListVisible] = useState(null)
    
    useEffect(()=>{
        setMovieInfos()
        setMovieRecommendation()
        setMovieCast()
        setDirectors()
        setMovieReviews()
        const fetchMoviePage = async() => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/movie/${movieId}`);
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
    if(!allReviews ||!movieInfos || !movieCast?.length || !directors?.length){
        return <SplashScreen/>
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
            <div>
                <img 
                    src={movieInfos.poster_path 
                    ? `https://image.tmdb.org/t/p/original${movieInfos.poster_path}` 
                    : "/assets/no_poster.jpg"} 
                    alt={`${movieInfos.title} poster`} width={300}/>
                <div>
                    <SaveList movieInfos={movieInfos} movieId={movieId} listVisible={listVisible} setListVisible={setListVisible} setReviewVisible={setReviewVisible}/>
                    <WriteReview movieId={movieId} reviewVisible={reviewVisible} setListVisible={setListVisible} setReviewVisible={setReviewVisible} />
                </div>
            </div>
            <Details movieInfos={movieInfos} directors={directors}/>
        </Synopsis>
        <div>
            <h2>Cast</h2>
            {movieCast.length > 9 && movieCast
            ?<ScrollWrapper>
            <Arrows onClick={() => arrowLeftClick(castRef)}><LeftArrow/></Arrows>
            <CastGrid ref={castRef}>{movieCast.map((cast)=>{
                return <li key={cast.id}>
                    <img src={cast.profile_path 
                    ? `https://image.tmdb.org/t/p/original${cast.profile_path}` 
                    : "/assets/no_profile.jpg"} 
                    alt={`${cast.name} profile picture`} width={150}/>
                    <Character>{cast.character}</Character>
                    <p>{cast.name}</p>
                </li>
            })}</CastGrid>
            <Arrows onClick={() => arrowRightClick(castRef)}><RightArrow/></Arrows>
            </ScrollWrapper>
            :<CastLessThanEight ref={castRef}>{movieCast.map((cast)=>{
                return <li key={cast.id}>
                    <img src={cast.profile_path 
                    ? `https://image.tmdb.org/t/p/original${cast.profile_path}` 
                    : "/assets/no_profile.jpg"} 
                    alt={`${cast.name} profile picture`} width={150}/>
                    <Character>{cast.character}</Character>
                    <p>{cast.name}</p>
                </li>
            })}</CastLessThanEight>}
        </div>
        <Recommendations movieId={movieId} movieRecommendation={movieRecommendation}/>
        <Reviews movieReviews={movieReviews} movieId={movieId}/>
    </MovieInfos>
    </>    
}

//these are organise by order of appearance

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
    border-radius: 5px;
    &:hover{
        background-color: var(--color-accent);
        box-shadow: 1px 1px 2px white inset, -2px -2px 2px var(--color-dark-accent) inset;
    }
    &:active{
        background: transparent;
        outline: 2px solid var(--color-accent);
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
const CastLessThanEight = styled.ul`
    display: grid;
    grid-template-columns: repeat(8, 155px);
    gap: 15px;
    height:fit-content;
    width: fit-content;
    margin: 1rem auto;
    justify-content: center;
`
const Character = styled.h3`
    color: var(--color-accent);
`

export default MoviePage