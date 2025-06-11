//dependencies
import { useEffect, useState, useRef } from "react"
import styled from "styled-components"

//icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

//component
import MoviePoster from "./MoviePoster"
import BackToTop from "../utilities/BackToTop";

const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState()
    const [popularMovies, setPopularMovies] = useState()
    const [topMovies, setTopMovies] = useState()
    const upcomingRef = useRef()
    const popularRef = useRef()
    const topRef = useRef()

    useEffect(()=>{
        const homeMovies = async() =>{
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/home`);
                const data = await response.json();
                if (data.status === 200) {
                    setUpcomingMovies(data.upcomingMovies)
                    setPopularMovies(data.popularMovies)
                    setTopMovies(data.topRatedMovies)
                }
            }
            catch(error){
                console.error(error.message)
            }
        }
        homeMovies()
    },[])

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
    <BackToTop/>  
    <h1>discover your next movie</h1>
    <LandingText>Explore upcoming, top-rated, and popular movies. Filter by genre or search on your own to build personalized watchlists. Engage with the community by liking and commenting on reviews.</LandingText>
    <ExploreButton>explore</ExploreButton>
    <HomeImage src="/assets/myke-simon-atsUqIm3wxo-unsplash.jpg" alt="Pink cinema"/>
    <CategoryWrapper>
        <CategoryTitle>upcoming</CategoryTitle>
        <MoviesWrapper>
            <Arrows onClick={() => arrowLeftClick(upcomingRef)}><LeftArrow/></Arrows>
            <MovieScroll ref={upcomingRef}>
            {upcomingMovies && upcomingMovies.map((movie) =>{
                return <MoviePoster key={movie.id} movie={movie}/>
            })}
            </MovieScroll>
            <Arrows onClick={() => arrowRightClick(upcomingRef)}><RightArrow/></Arrows>
        </MoviesWrapper>
    </CategoryWrapper>
    <CategoryWrapper>
        <CategoryTitle>popular</CategoryTitle>
        <MoviesWrapper>
            <Arrows onClick={()=>arrowLeftClick(popularRef)}><LeftArrow/></Arrows>
            <MovieScroll ref={popularRef}>
            {popularMovies && popularMovies.map((movie) =>{
                return <MoviePoster key={movie.id} movie={movie}/>
            })}
            </MovieScroll>
            <Arrows onClick={() => arrowRightClick(popularRef)}><RightArrow/></Arrows>
        </MoviesWrapper>
    </CategoryWrapper>
    <CategoryWrapper>
        <CategoryTitle>top rated</CategoryTitle>
        <MoviesWrapper>
            <Arrows onClick={()=>arrowLeftClick(topRef)} ><LeftArrow/></Arrows>
            <MovieScroll ref={topRef}>
            {topMovies && topMovies.map((movie) =>{
                return <MoviePoster key={movie.id} movie={movie}/>
            })}
            </MovieScroll>
            <Arrows onClick={() => arrowRightClick(topRef)}><RightArrow/></Arrows>
        </MoviesWrapper>
    </CategoryWrapper>
    </>
}

const LandingText = styled.p`
    width: 40%;
    line-height: 1.5;
`
const ExploreButton = styled.button`
    background-color: var(--color-accent);
    padding: 0.5rem 0.8rem;
    border-radius: 5px;
    border: 3px solid var(--color-accent);
    color: var(--color-dark);
    text-transform: capitalize;
    margin: 1rem 0 ;
    font-weight: bold;
    &:hover{
        cursor: pointer;
        box-shadow: 0 0 7px var(--color-accent);
    }
    &:active{
        background-color: transparent;
        border: 3px solid var(--color-accent);
        color: var(--color-accent);
    }
`
const HomeImage = styled.img`
    width: 100%;
    border-radius: 5px;
`
const CategoryWrapper = styled.div`
    margin: 1rem 0 0.5rem 0;
`
const CategoryTitle = styled.h2`
    text-transform:uppercase;
    padding-top: 1rem;
    margin: auto;
    margin-bottom: 1rem;
    width: 95%;
    color: var(--color-accent);
`
const MoviesWrapper = styled.div`
    display:flex;
    flex-direction:row;
`
const MovieScroll = styled.div`
    display: flex;
    flex-direction:row;
    font-size: 1rem;
    overflow-x: scroll;
    gap: 15px;
    &::-webkit-scrollbar{
        display: none;
    }
`
const Arrows = styled.button`
    padding: 5px 8px;
    cursor: pointer;
    height: 150px;
    background:none;
    margin:35px 0.5rem;
    color: var(--color-light);
    border:none;
    border-radius: 5px;
    &:hover{
        background-color: var(--color-accent);
        color: var(--color-dark);
    }
    &:active{
        background: transparent;
        color: var(--color-accent);
        outline: 2px solid var(--color-accent);
    }
`
const LeftArrow = styled(IoIosArrowBack)`
    font-size: 2rem;
`
const RightArrow = styled(IoIosArrowForward)`
    font-size: 2rem;
`
export default Home
