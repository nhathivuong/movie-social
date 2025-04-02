// dependencies
import { useContext, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"

//icons
import { IoSearchSharp } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa6";
// context
import { UserContext } from "./contexts/UserContext"

// this display the navigation bar
const Header = () => {
    const {loggedInUser, logOut} = useContext(UserContext)
    const [genresList, setGenresList] = useState()
    const navigate = useNavigate()

    //gets all the official movie genres
    useEffect(()=>{
        const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Yzc1OTMwMjU1YWVjYzI2ZWU5MDIxYjliNjkwNzczZiIsIm5iZiI6MTc0MzA0NTg1OS40LCJzdWIiOiI2N2U0YzRlM2Y4NDY3OTRlOTkxMDk5NGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rm5e7ovYbkMaOkH0I5hy-CjAPUSSUYyR1ov3TEgRWjY'
        }
        };

        fetch(url, options)
        .then(res => res.json())
        .then(json => setGenresList(json.genres))
        .catch(err => console.error(err));
    },[])

    //to complete handles the search bar
    const handleSearch = () =>{
        navigate("/")
    }

    return (
        <nav>
            <NavSection>
                <Logo to="/"><h1>Film Media</h1></Logo>
                <div>
                    <button><FaCaretDown/></button>
                    <form onSubmit={handleSearch}>
                        <input type="text" id="search" name="search" placeholder="Search ..." required/>
                        <button type="submit"><IoSearchSharp/></button>
                    </form>
                </div>
                <LogInLogOut> 
                    {loggedInUser
                    ?<>
                    <NavLink to={`/user/${loggedInUser.username}`}>Hi {loggedInUser.username}</NavLink> {/* I would like this to be the user image with maybe name */}
                    <NavLink to="/" onClick={logOut}>Log out</NavLink></>
                    :<>
                    <NavLink to="/login" >Log in</NavLink>
                    <NavLink to="/signUp" >Sign up</NavLink>
                    </>}
                </LogInLogOut>
            </NavSection>
            <NavGenreSection>
                {genresList && genresList.map(genre =>{
                    return <NavLink key={genre.id} to={`/browse?genre=${genre.name.toLowerCase()}`} state={{genre: genre.id}}>{genre.name}</NavLink>
                })}
            </NavGenreSection>
        </nav>
    );
}

const NavSection = styled.div`
    width:100%;
    background-color: black;
    margin:0;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
`
const NavGenreSection = styled(NavSection)`
    width:100%;
    background-color: black;
    margin:0;
    display:flex;
    flex-direction: row;
    justify-content: space-evenly;
`
const LogInLogOut = styled.div`
    display: flex;
    gap: 0.7rem;
`
const Logo = styled(NavLink)`
    &:hover{
        text-decoration: none;
    }
`
export default Header