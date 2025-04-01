// dependencies
import { useContext } from "react"
import styled from "styled-components"

// context
import { UserContext } from "./contexts/UserContext"
import { NavLink } from "react-router-dom"

const Header = () => {
    const {loggedInUser, logOut} = useContext(UserContext)

    return (
        <NavBar>
            <Logo to="/"><h1>Film Media</h1></Logo>
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
        </NavBar>
    );
}

const NavBar = styled.nav`
    width:100%;
    background-color: black;
    margin:0;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
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