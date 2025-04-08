//dependencies
import { useEffect, useState, useRef } from "react"
import styled from "styled-components"

//icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

//component
import MoviePoster from "./MoviePoster"

const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState()
    const [popularMovies, setPopularMovies] = useState()
    const [topMovies, setTopMovies] = useState()
    const upcomingRef = useRef()
    const popularRef = useRef()
    const topRef = useRef()

    useEffect(()=>{
        // //this gets the upcoming movies
        // const upcomingMovies = async() => {
        //     try {
        //         const response = await fetch("/api/upcoming");
        //         const data = await response.json();
        //         if (data.status === 200) {
        //             setUpcomingMovies(data.upcomingMovies);
        //         }
        //     }
        //     catch(error){
        //         console.error(error.message)
        //     }
        // }
        
        // //this gets the popular movies
        // const popularMovies = async() =>{
        //     try {
        //         const response = await fetch("/api/popular");
        //         const data = await response.json();
        //         if (data.status === 200) {
        //             setPopularMovies(data.popularMovies);
        //         }
        //     }
        //     catch(error){
        //         console.error(error.message)
        //     }
        // }
        // //this gives you the top rated movies
        // const topMovies = async() =>{
        //     try {
        //         const response = await fetch("/api/top-rated");
        //         const data = await response.json();
        //         if (data.status === 200) {
        //             setTopMovies(data.topMovies);
        //         }
        //     }
        //     catch(error){
        //         console.error(error.message)
        //     }
        // }
        // upcomingMovies()
        // popularMovies()
        // topMovies()
        const homeMovies = async() =>{
            try {
                const response = await fetch("/api/home");
                const data = await response.json();
                if (data.status === 200) {
                    console.log(data.upcomingMovies)
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
const CategoryWrapper = styled.div`
    margin-top: 1rem 0 0.5rem 0;
`
const CategoryTitle = styled.h2`
    text-transform:uppercase;
    padding: 1rem 1rem 0 1rem;
    margin: auto;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--color-light);
    width: 95%;
    
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
    margin:35px 1rem;
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
export default Home
