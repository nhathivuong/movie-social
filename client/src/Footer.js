import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useContext} from "react"
import styled from "styled-components"
//context
import { UserContext } from "./contexts/UserContext"

const Footer = () => {
    const {loggedInUser} = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation()
    const isLoginPage = location.pathname === "/login"
    const isSignUpPage = location.pathname === "/signup"
    
    const communityClick = () =>{
        if(!loggedInUser){
                navigate("/login")
        }
        else navigate("/community")
    }
    

    return !isLoginPage && !isSignUpPage && <FooterSection>
        <PageNavigation>
            <NavLink to="/">Home</NavLink>
            <CommunityFooter onClick={communityClick}>Community</CommunityFooter>
            <NavLink to="/blog">Blog</NavLink>
        </PageNavigation>
    </FooterSection>
}
const FooterSection = styled.footer`
    display: sticky;
    bottom: 0;
    left: 0;
    height: fit-content;
    background-color: var(--color-dark);
    box-shadow: 0 4px 10px var(--color-accent), 0 0 2px var(--color-dark);
`
const PageNavigation = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: start;
    line-height: 1.5;
    padding: 1rem 2rem;
`
const CommunityFooter = styled.button`
    background-color: transparent;
    color: var(--color-light);
    border:none;
    font-family: "Noto Sans", sans-serif; 
    font-size: 1rem;
    padding: 0; 
    &:hover{
        text-decoration: underline;
        cursor: pointer;
    }  
`
export default Footer