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

    // home logo navigation
    const homeClick = () =>{
        window.scrollTo(0,0)
        navigate("/") 
    }
    return (
        <header>
        <nav>
            <NavSection>
                <HomeLogoButton onClick={() => {closeGenre(); homeClick()}}><Logo src="/assets/logo.png"/></HomeLogoButton>
                <SearchBar>
                    <form onSubmit={handleSearch}>
                        <SearchGenre type="button" onClick={genreToggle}><IoMenu/></SearchGenre>
                        <SearchInput type="text" id="search" name="search" placeholder="Search ..." required/>
                        <SearchButton type="submit" onClick={closeGenre}><IoSearchSharp/></SearchButton>
                    </form>
                    {genreOpen && <NavGenreSection>
                        {genresList && genresList.map(genre =>{
                            return <Navigation key={genre.id} to={`/browse?genre=${genre.name.toLowerCase()}`} state={{genreId: genre.id}} onClick={closeGenre}>{genre.name}</Navigation>
                        })}
                    </NavGenreSection>}
                </SearchBar>
                <LogInLogOut> 
                    {loggedInUser
                    ?<>
                    <Navigation to="/" onClick={closeGenre}>Home</Navigation>
                    <Navigation to="/community" onClick={closeGenre}>Community</Navigation>
                    <ProfileNavLink to={`/user/${loggedInUser.username}`} onClick={closeGenre}><ProfilePicture src={loggedInUser.src} alt="profile picture"/></ProfileNavLink>
                    <SignUpLogOut to="/" onClick={()=> {logOut(); closeGenre()}}>Log out</SignUpLogOut></>
                    :<>
                    <LogInButton to="/login" onClick={closeGenre}>Log in</LogInButton>
                    <SignUpLogOut to="/signup" onClick={closeGenre}>Sign up</SignUpLogOut>
                    </>}
                </LogInLogOut>
            </NavSection>
            
        </nav>
        </header>
    );
}

const NavSection = styled.div`
    position: fixed;
    top:0;
    width:100%;
    margin: 0 3rem 0 1rem;
    background-color: var(--color-dark);
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    z-index:10;
`
const HomeLogoButton = styled.button`
    background-color: var(--color-dark);
    border: none;
    &:hover{
        cursor: pointer;
    }
`
const Logo = styled.img`
    height: 4.5rem;
    object-fit: cover;
    margin: 0 1rem;
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
        border: 2px solid var(--color-dark);
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
const Navigation = styled(NavLink)`
    &:hover{
        text-decoration-color: var(--color-accent);
    }
`
const LogInLogOut = styled.div`
    display: flex;
    gap: 0.7rem;
    margin-right: 3rem;
    align-items: center;
`
const LogInButton = styled(NavLink)`
    background-color: var(--color-accent);
    padding: 0.5rem 0.8rem;
    border-radius: 5px;
    border: 3px solid var(--color-accent);
    color: var(--color-dark);
    &:hover{
        cursor: pointer;
        box-shadow: 0 0 7px var(--color-accent);
    }
    &:active{
        background-color: transparent;
        border: 3px solid var(--color-accent);
        color: var(--color-accent);
    }
`
const ProfileNavLink = styled(NavLink)`
    display:flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;   
    border-radius:15px;
    padding-right: 0.5rem;
    &:hover{
        background-color: var(--color-dark);
    }
`
const ProfilePicture = styled.img`
    width: 2rem;
    border-radius: 50%;
    border: 2px solid var(--color-dark);
    &:hover{
        border: 2px solid var(--color-accent);
        box-shadow: 0 0 5px var(--color-accent);
        
    }
`
const SignUpLogOut = styled(NavLink)`
    background-color: var(--color-dark);
    padding: 0.5rem 0.8rem;
    border-radius: 5px;
    background-color: transparent;
    border: 3px solid var(--color-accent);
    text-decoration: none;
    color: var(--color-accent);
    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
    &:active{
        box-shadow: 0 0 5px var(--color-accent) inset, 0 0 5px var(--color-accent);
    }
`
export default Header