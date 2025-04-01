// dependencies
import { useContext } from "react"
// context
import { UserContext } from "./contexts/UserContext"
import { NavLink } from "react-router-dom";
const Header = () => {
    const {loggedInUser, logOut} = useContext(UserContext)

    return (
        <nav>
            <NavLink to="/">Film Media</NavLink>
            <div>
            {loggedInUser
            ?<>
            <NavLink to={`/user/${loggedInUser.username}`}>Hi {loggedInUser.username}</NavLink> {/* I would like this to be the user image with maybe name */}
            <NavLink to="/" onClick={logOut}>Log out</NavLink></>
            :<>
            <NavLink to="/login" >Log in</NavLink>
            <NavLink to="/signUp" >Sign up</NavLink>
            </>}
            </div>
        </nav>
    );
}

export default Header