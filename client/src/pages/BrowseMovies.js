//dependencies
import { useLocation } from "react-router-dom"
import styled from "styled-components"

//components
import SearchbyGenre from "./Search/SearchbyGenre"
import SearchedMovies from "./Search/SearchedMovies"

// here will house all the research components
const BrowseMovies = () => {
    const location = useLocation()

    //gets the information from the query
    const filters = new URLSearchParams(location.search)
    const genre = filters.get("genre")
    const search = filters.get("search")

    const genreId = location.state?.genreId

    return (
    <div>
        <SearchFor>Search for : <span>{genre? genre : search}</span></SearchFor>
        <MoviesGrid>
        {genre && genreId && <SearchbyGenre genreId={genreId}/>}
        {search && <SearchedMovies search={search}/>}
        </MoviesGrid>
    </div>)

}
const MoviesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 155px);
    gap: 15px;
    height:fit-content;
    width: fit-content;
    margin: 1rem auto;
    justify-content: center;
`
const SearchFor = styled.h2`
    width:fit-content;
    margin: 2rem auto 1rem auto;
    span{
        text-transform:capitalize;
    }
`
export default BrowseMovies