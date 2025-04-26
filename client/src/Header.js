// dependencies
import { useContext, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"

//icons
import { IoSearchSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

// context
import { UserContext } from "./contexts/UserContext"

// this display the navigation bar
const Header = () => {
    const {loggedInUser, logOut} = useContext(UserContext)
    const [genresList, setGenresList] = useState()
    const [genreOpen, setGenreOpen] = useState(false)
    const navigate = useNavigate()
    
    //gets all the official movie genres
    useEffect(()=>{
        const getGenres = async() =>{
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/genres`);
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

    //Handles the search bar
    const handleSearch = (event) =>{
        event.preventDefault()
        setGenreOpen(false)
        const searchInput = document.getElementById("search").value
        navigate(`/browse?search=${searchInput}`)
    }
    //handle the toggle of the genres
    const genreToggle = (event) => {
        event.preventDefault()
        setGenreOpen(!genreOpen)
    }
    const closeGenre = () => {
        setGenreOpen(false)
    } 
    return (
        <nav>
            <NavSection>
                <NavLink to="/" onClick={closeGenre}><Logo src="/assets/logo.png"/></NavLink>
                <SearchBar>
                    <form onSubmit={handleSearch}>
                        <SearchGenre type="button" onClick={genreToggle}><IoMenu/></SearchGenre>
                        <SearchInput type="text" id="search" name="search" placeholder="Search ..." required/>
                        <SearchButton type="submit" onClick={closeGenre}><IoSearchSharp/></SearchButton>
                    </form>
                    {genreOpen && <NavGenreSection>
                        {genresList && genresList.map(genre =>{
                            return <NavLink key={genre.id} to={`/browse?genre=${genre.name.toLowerCase()}`} state={{genreId: genre.id}} onClick={closeGenre}>{genre.name}</NavLink>
                        })}
                    </NavGenreSection>}
                </SearchBar>
                <LogInLogOut> 
                    {loggedInUser
                    ?<>
                    <NavLink to="/" onClick={closeGenre}>Home</NavLink>
                    <NavLink to="/community" onClick={closeGenre}>Community</NavLink>
                    <NavLink to={`/user/${loggedInUser.username}`} onClick={closeGenre}>Hi {loggedInUser.username}</NavLink> {/* I would like this to be the user image with name */}
                    <SignUpLogOut to="/" onClick={()=> {logOut(); closeGenre()}}>Log out</SignUpLogOut></>
                    :<>
                    <LogInButton to="/login" onClick={closeGenre}>Log in</LogInButton>
                    <SignUpLogOut to="/signUp" onClick={closeGenre}>Sign up</SignUpLogOut>
                    </>}
                </LogInLogOut>
            </NavSection>
            
        </nav>
    );
}

const NavSection = styled.div`
    position: fixed;
    top:0;
    width:100%;
    background-color: black;
    margin:0;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    z-index:10;
`
const Logo = styled.img`
    height: 4rem;
    object-fit: cover;
    margin: 5px 1rem;
`
const SearchGenre = styled.button`
    position:relative;
    left: 31px;
    top: 5px;
    width: 30px;
    height: 30px;
    border-radius: 30px 0 0 30px;
    cursor: pointer;
    border: 2px solid transparent;
    background-color: transparent;
    color: var(--color-accent);
    font-size: 1.2rem;
    text-align: center;
    line-height: 30px;
`
const SearchBar = styled.div`
    position:absolute;
    left: 50%;
    transform: translateX(-50%);
    align-self:center;
`
const SearchInput = styled.input`
    width: 30dvw;
    padding: 0.3rem;
    padding-left: 2rem;
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
    right: 29px;
    top: 2.5px;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    cursor: pointer;
    border: 2px solid var(--color-accent);
    background-color: var(--color-accent);
    text-align: center;
    line-height: 30px;
`
const NavGenreSection = styled(NavSection)`
    position:absolute;
    top: 40px;
    padding: 1rem 2rem;
    gap: 0.5rem;
    width:fit-content;
    background-color: black;
    margin:0;
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
`
const LogInLogOut = styled.div`
    display: flex;
    gap: 0.7rem;
    margin: 0 1.5rem;
    align-items: center;
`
const LogInButton = styled(NavLink)`
    background-color: var(--color-accent);
    padding: 0.3rem 0.8rem;
    border-radius: 3px;
    color: var(--color-dark);
    &:hover{
        box-shadow: 0 0 5px var(--color-accent);
    }
    &:active{
        border: 1px solid var(--color-dark-accent);
        box-shadow: 0 0 2px var(--color-accent) inset, 0 0 5px var(--color-dark) inset;
        text-decoration: none;
    }
`
const SignUpLogOut = styled(NavLink)`
    background-color: var(--color-dark-accent);
    padding: 0.3rem 0.8rem;
    border-radius: 3px;
    box-shadow: 0 0 2px var(--color-accent);
    &:hover{
        box-shadow: 0 0 5px var(--color-dark-accent);
    }
    &:active{
        border: 1px solid var(--color-dark-accent);
        box-shadow: 0 0 2px var(--color-accent) inset, 0 0 5px var(--color-dark) inset;
        text-decoration: none;
    }
`
export default Header