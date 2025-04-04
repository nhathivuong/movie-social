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
        //this gets the upcoming movies
        const upcomingMovies = () =>{
            const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc1OTMwMjU1YWVjYzI2ZWU5MDIxYjliNjkwNzczZiIsIm5iZiI6MTc0MzA0NTg1OS40LCJzdWIiOiI2N2U0YzRlM2Y4NDY3OTRlOTkxMDk5NGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rm5e7ovYbkMaOkH0I5hy-CjAPUSSUYyR1ov3TEgRWjY'
                }
            };
            
            fetch(url, options)
            .then(res => res.json())
            .then(json => setUpcomingMovies(json.results))
            .catch(err => console.error(err));
        }
        //this gets the popular movies
        const popularMovies = () =>{
            const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc1OTMwMjU1YWVjYzI2ZWU5MDIxYjliNjkwNzczZiIsIm5iZiI6MTc0MzA0NTg1OS40LCJzdWIiOiI2N2U0YzRlM2Y4NDY3OTRlOTkxMDk5NGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rm5e7ovYbkMaOkH0I5hy-CjAPUSSUYyR1ov3TEgRWjY'
            }
            };
            
            fetch(url, options)
            .then(res => res.json())
            .then(json => setPopularMovies(json.results))
            .catch(err => console.error(err));
        }
        //this gives you the top rated movies
        const topMovies = () =>{
            const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
            const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc1OTMwMjU1YWVjYzI2ZWU5MDIxYjliNjkwNzczZiIsIm5iZiI6MTc0MzA0NTg1OS40LCJzdWIiOiI2N2U0YzRlM2Y4NDY3OTRlOTkxMDk5NGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rm5e7ovYbkMaOkH0I5hy-CjAPUSSUYyR1ov3TEgRWjY'
            }
            };

            fetch(url, options)
            .then(res => res.json())
            .then(json => setTopMovies(json.results))
            .catch(err => console.error(err));
        }
        upcomingMovies()
        popularMovies()
        topMovies()
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
