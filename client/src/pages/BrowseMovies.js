import { useLocation } from "react-router-dom"
import SearchbyGenre from "./Search/SearchbyGenre"
import styled from "styled-components"
// here will house all the research components
const BrowseMovies = () => {
    const location = useLocation()

    const filters = new URLSearchParams(location.search)
    const genre = filters.get("genre")
    const genreId = location.state?.genre

    return (
    <div>
        <SearchFor>Search for : <span>{genre}</span></SearchFor>
        <MoviesGrid>
        {genre && genreId && <SearchbyGenre genreId={genreId}/>}
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