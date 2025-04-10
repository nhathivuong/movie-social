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
import SaveList from "./SaveList";
import WriteReview from "./WriteReview";

// this page gives all the informations for the selected movie
const MoviePage = () =>{
    const {loggedInUser,  setLoggedInUser}= useContext(UserContext)
    const [movieInfos , setMovieInfos] = useState()
    const [movieRecommendation, setMovieRecommendation] = useState()
    const [movieCast, setMovieCast] = useState()
    const [directors, setDirectors] = useState()
    const {allReviews, setAllReviews} = useContext(AllReviewsContext)
    const [movieReviews, setMovieReviews] = useState()
    const {movieId} = useParams()
    //used the cast scroll
    const castRef = useRef()
    // used to toggle the review section
    const [reviewVisible, setReviewVisible] = useState(false)
    // used to toggle the review section
    const [listVisible, setListVisible] = useState(false)
    
    useEffect(()=>{
        setMovieInfos()
        setMovieRecommendation()
        setMovieCast()
        setDirectors()
        setMovieReviews()
        const fetchMoviePage = async() => {
            try {
                const response = await fetch(`https://movie-social.onrender.com/api/movie/${movieId}`);
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
            <div>
                <img 
                    src={movieInfos.poster_path 
                    ? `https://image.tmdb.org/t/p/original${movieInfos.poster_path}` 
                    : "/assets/no_poster.jpg"} 
                    alt={`${movieInfos.title} poster`} width={300}/>
                <div>
                <WriteReview loggedInUser={loggedInUser} movieId={movieId} reviewVisible={reviewVisible} setListVisible={setListVisible} setReviewVisible={setReviewVisible} />
                <SaveList loggedInUser={loggedInUser} movieInfos={movieInfos} movieId={movieId} listVisible={listVisible} setListVisible={setListVisible} setReviewVisible={setReviewVisible}/>
                </div>
            </div>
            <Details movieInfos={movieInfos} directors={directors}/>
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
        <Reviews movieReviews={movieReviews} movieId={movieId}/>
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