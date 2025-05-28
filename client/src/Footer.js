import { useNavigate, useLocation } from "react-router-dom"
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
    
    const homeClick = () =>{
        window.scrollTo(0,0)
        navigate("/") 
    }
    const aboutClick = () =>{
        window.scrollTo(0,0)
        navigate("/about") 
    }
    const communityClick = () =>{
        window.scrollTo(0,0)
        navigate("/community") 
    }
    const blogClick = () =>{
        window.scrollTo(0,0)
        navigate("/blog") 
    }
    return !isLoginPage && !isSignUpPage && <FooterSection>
        <PageNavigation>
            <ButtonFooter onClick={homeClick}>Home</ButtonFooter>
            {loggedInUser && <ButtonFooter onClick={communityClick}>Community</ButtonFooter>}
            <ButtonFooter onClick={aboutClick}>About</ButtonFooter>
            <ButtonFooter onClick={blogClick}>Blog</ButtonFooter>
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
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
    
    align-items: start;
    line-height: 1.5;
    padding: 1rem 2rem;
`
const ButtonFooter = styled.button`
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