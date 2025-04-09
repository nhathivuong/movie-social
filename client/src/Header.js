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
        const getGenres = async() =>{
            try {
                const response = await fetch("/api/genres");
                const data = await response.json();
                if (data.status === 200) {
                    setGenresList(data.genres);
                }
            }
            catch(error){
                console.error(error.message)
            }
        }
        getGenres()
    },[])

    //to complete handles the search bar
    const handleSearch = (event) =>{
        event.preventDefault()
        const searchInput = document.getElementById("search").value
        navigate(`/browse?search=${searchInput}`)
    }

    return (
        <nav>
            <NavSection>
                <Logo to="/"><h1>Film Media</h1></Logo>
                <SearchBar>
                    {/* <button><FaCaretDown/></button> */}
                    <form onSubmit={handleSearch}>
                        <SearchInput type="text" id="search" name="search" placeholder="Search ..." required/>
                        <SearchButton type="submit"><IoSearchSharp/></SearchButton>
                    </form>
                </SearchBar>
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
                    return <NavLink key={genre.id} to={`/browse?genre=${genre.name.toLowerCase()}`} state={{genreId: genre.id}}>{genre.name}</NavLink>
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
const Logo = styled(NavLink)`
    &:hover{
        text-decoration: none;
    }
`
const SearchBar = styled.div`
    justify-self:center;
    align-self:center;
`
const SearchInput = styled.input`
    width: 30dvw;
    padding: 0.3rem;
    border-radius: 30px;
    border: 3px solid var(--color-accent);
    box-shadow: 0 0 4px var(--color-accent);
    &:focus{
        border: 2px solid var(--color-dark-accent);
        outline: 2px solid var(--color-accent);
    }
`
const SearchButton = styled.button `
    position:relative;
    right: 28px;
    top: 0.5px;
    width: 27px;
    height: 27px;
    border-radius: 30px;
    cursor: pointer;
    border: 2px solid var(--color-accent);
    background-color: var(--color-accent);
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

export default Header