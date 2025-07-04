//dependencies
import styled from "styled-components";
import { createRef, useRef} from "react"
//icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

//component
import MoviePoster from "../MoviePoster";

const UserList = ({userInfos}) =>{
    const movieScrollRefs = useRef({})
    
    // manages the list scroll
    const arrowRightClick = (ref) => {
        ref.current.style.scrollBehavior = "smooth";
        ref.current.scrollLeft += 495;
    }
    const arrowLeftClick = (ref) => {
        ref.current.style.scrollBehavior = "smooth";
        ref.current.scrollLeft -= 495;
    }
    return <MovieListElement>
    <h1>Lists</h1>
    {userInfos.lists.length > 0 
    ?userInfos.lists.map(list=> {
        if (!movieScrollRefs.current[list.name]) {
            movieScrollRefs.current[list.name] = createRef();
        }
        const movieScrollRef = movieScrollRefs.current[list.name];
        return<div key={list.name}>
            {list.movies.length > 0 && <>
            <ListName>{list.name}</ListName>
            <MoviesWrapper>
                {list.movies.length > 6 
                ?<><Arrows onClick={() => arrowLeftClick(movieScrollRef)}><LeftArrow/></Arrows>
                <MovieScroll ref={movieScrollRef}>
                {list.movies.map((movie) =>{
                    return <MoviePoster key={movie.id} movie={movie}/>
                })}
                </MovieScroll>
                <Arrows onClick={() => arrowRightClick(movieScrollRef)}><RightArrow/></Arrows></>
                :<MovieList>
                {list.movies.map((movie) =>{
                    return <MoviePoster key={movie.id} movie={movie}/>
                })}
                </MovieList>}
            </MoviesWrapper>
            </>}
        </div>
    })
    :<p>no list</p>}
    </MovieListElement>
}
const MovieListElement = styled.div`
    max-width:100%;    
`
const ListName = styled.h2`
    margin: 1rem 0 0.3rem 0;
`
const MoviesWrapper = styled.div`
    display:flex;
    flex-direction:row;
    width: fit-content;
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
const MovieList = styled.div`
    display: flex;
    flex-direction:row;
    font-size: 1rem;
    width: 60vw;
    gap: 15px;
`
const Arrows = styled.button`
    padding: 5px 8px;
    cursor: pointer;
    height: 150px;
    background:none;
    margin: 4rem 0.5rem;
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
export default UserList