import { useEffect, useState } from "react"
import styled from "styled-components";

//icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

//component
import MoviePoster from "../MoviePoster";
import SplashScreen from "../../SplashScreen";
// this gets the movies sorted by popularity based on genre
const SearchbyGenre = ({genreId}) => {
    const [moviesbyGenre , setMoviesbyGenre] = useState()
    //this page number will be the one used in the backend
    const [pageNumber, setPageNumber] = useState(1)
    //this takes the maximum number of page or the results
    const [maxPage, setMaxPage] = useState()

    useEffect(()=>{
        //this ensure the moviesbyGenre is empty each time we switch
        setMoviesbyGenre()
        const fetchMovies = async() => {
            try {
                //this ensure the moviesbyGenre is empty each time we switch genre or pageNumber
                setMoviesbyGenre()
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/genre/${genreId}?page=${pageNumber}`);
                const data = await response.json();
                if (data.status === 200) {
                    setMoviesbyGenre(data.moviesByGenre);
                    setMaxPage(data.maxPages)
                }
            }
            catch(error){
                console.error(error.message)
            }
        }
        fetchMovies()
    },[genreId, pageNumber])

    const increasePage = (event) =>{
        event.preventDefault()
        if(pageNumber < maxPage){
            setPageNumber((num) => num + 2)
        }
    }
    const decreasePage = (event) =>{
        event.preventDefault()
        if(pageNumber > 1){
            setPageNumber((num) => num - 2)
        }
    }
    const handleToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    return <>
        <PageSection>
            <Arrows onClick={decreasePage}><IoIosArrowBack/></Arrows>
            <PageNumber>Page {(pageNumber + 1) / 2} out of {Math.floor((maxPage)/2)}</PageNumber>
            <Arrows onClick={increasePage}><IoIosArrowForward/></Arrows>
        </PageSection>
        <MoviesGrid>
        {moviesbyGenre 
        ? moviesbyGenre.map((movie)=>{
            return <MoviePoster key={movie.id} movie={movie}/>
        })
        :<SplashScreen/>}
        </MoviesGrid>
        <BottomPageNumber>
            <PageSectionBottom>
                <Arrows onClick={decreasePage}><IoIosArrowBack/></Arrows>
                <PageNumber>Page {(pageNumber + 1) / 2} out of {Math.floor((maxPage)/2)}</PageNumber>
                <Arrows onClick={increasePage}><IoIosArrowForward/></Arrows>
            </PageSectionBottom>
            <BackToTop onClick={handleToTop}>Back to top</BackToTop>    
        </BottomPageNumber>
    </>
}
const PageSection = styled.div`
    width:fit-content;
    margin: auto;
    display:flex;
    flex-direction: row;
`
const Arrows = styled.button`
    margin: 0 8px;
    padding: 5px;
    cursor: pointer;
    height: fit-content;
    background:none;
    color: var(--color-accent);
    border:none;
    border-radius: 5px;
    display:flex;
    justify-content:center;
    align-items:center;
    &:hover{
        outline: 2px solid var(--color-accent);
    }
    &:active{
        outline: 1px solid var(--color-accent);
        box-shadow: 0px 0px 2px var(--color-accent) inset;
    }
`
const PageNumber = styled.p`
    color:var(--color-light);
`
const MoviesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 155px);
    gap: 15px;
    height:fit-content;
    width: fit-content;
    margin: 1rem auto;
    justify-content: center;
`
const BottomPageNumber = styled.div`
    width:fit-content;
    margin: auto;
    display:flex;
    flex-direction:column;
    justify-content:center;
`
const BackToTop = styled.button`
    background-color: transparent;
    border: none;
    color:var(--color-accent);
    margin-bottom:1rem;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`
const PageSectionBottom = styled(PageSection)`
    padding: 1rem;
`
export default SearchbyGenre