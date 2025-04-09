import styled from "styled-components"
import { NavLink } from "react-router-dom"
const Details = ({movieInfos, directors}) =>{
    return <DetailsWrapper>
        <TitleYear>
            <h2>{movieInfos.title}</h2>
            <p>({movieInfos.release_date.split("-")[0]})</p>
        </TitleYear>
        {(movieInfos.title !== movieInfos.original_title) && <h3>{movieInfos.original_title}</h3>}
        <p>{movieInfos.tagline}</p>
        <Genres>
            <h4>Genres:</h4>
            <List>{movieInfos.genres.map((genre)=>{
                return <li key={genre.id}><GenreLink to={`/browse?genre=${genre.name.toLowerCase()}`} state={{genreId: genre.id}}>{genre.name}</GenreLink></li>
            })}</List>
        </Genres>
        <Rating>
        <h4>Average Rating:</h4>
        <MovieAverage>{movieInfos.vote_average.toFixed(1)}/10</MovieAverage>
        <p>({movieInfos.vote_count} votes)</p>
        </Rating>
        <Directors>
        <h4>Directors:</h4>
        {directors && <List>{directors.map((director)=>{
            return <li key={director.id}>{director.name}</li>
        })}</List>}
        </Directors>
        <Overview>Overview:</Overview>
        <p>{movieInfos.overview}</p>
    </DetailsWrapper>
}
const DetailsWrapper = styled.div`
    margin-top: 20vh;
    padding-top: 1rem;
`
const TitleYear = styled.div`
    display:flex;
    flex-direction: row;
    align-items:baseline;
    gap: 1rem;
`
const Genres = styled.div`
    margin-top: 0.7rem;
    display:flex;
    flex-direction: row;
`
const List = styled.ul`
    display:flex;
    flex-direction: row;
    list-style: none;
    padding-left: 1rem;
    gap: 0.5rem;
`
const GenreLink = styled(NavLink)`
    color:var(--color-accent);
`
const Rating = styled(Genres)`
    margin-top: 0.3rem;
`
const MovieAverage = styled.p`
    margin-left: 1rem;
    margin-right: 0.5rem;
`
const Directors = styled(Rating)`
    margin-bottom: 0.7rem;
`
const Overview = styled.h4`
    margin-bottom: 0.3rem;
`
export default Details