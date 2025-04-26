//dependencies
import { useLocation } from "react-router-dom"
import styled from "styled-components"

//components
import SearchbyGenre from "./SearchbyGenre"
import SearchedMovies from "./SearchedMovies"

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
        {genre && genreId && <SearchbyGenre genreId={genreId}/>}
        {search && <SearchedMovies search={search}/>}
    </div>)

}
const SearchFor = styled.h2`
    width:fit-content;
    margin: 6rem auto 1rem auto;
    span{
        text-transform:capitalize;
    }
`
export default BrowseMovies