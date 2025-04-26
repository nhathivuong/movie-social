//dependencies
import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"

//context
import { UserContext } from "../../contexts/UserContext"

const LogIn = () =>{
    const {logIn, setUpdateUser} = useContext( UserContext )
    const navigate = useNavigate()
    const handleLogIn = (event) =>{
        event.preventDefault()
        const body = JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
        const options = {
            method: "POST",
            credentials: 'include',
            headers:{
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body,
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, options)
        .then(res => {
            if(!res.ok){
                throw new Error("the user was not logged in")
            }
            return res.json()
        })
        .then(data => {
            if(data.status === 200){
                logIn(data.token)
                setUpdateUser((update) => update + 1)
                navigate("/community")
            }
        })
        .catch(error => console.error(error.message))
    }
    return <LogInBox>
        <h2>Log In</h2>
        <LogInForm onSubmit={handleLogIn}>
            <label htmlFor="username">Username</label>
            <UserInput type="text" id="username" name="username" required/>
            <label htmlFor="password">Password</label>
            <UserInput type="password" id="password" name="password" required/>
            <LogInButton type="submit">Log in</LogInButton>
        </LogInForm>
        <p>New here? <SignUp to="/signUp">Sign Up</SignUp></p>
        </LogInBox>
}

const LogInBox = styled.div`
    width:30svw;
    margin: 2rem auto;
    padding: 1rem;
    display:flex;
    flex-direction:column;
    border-radius: 10px;
    background-color: black;
    gap: 0.5rem;
`
const LogInForm = styled.form`
    display:flex;
    flex-direction:column;
    gap: 0.5rem;
`
const UserInput = styled.input`
    height: 2rem;
    border-radius: 5px;
`
const LogInButton = styled.button`
    height: 2rem;
    border-radius: 5px;
    background-color: var(--color-accent);
    border: none;
    text-transform: uppercase;
    font-weight:bold;
    color: var(--color-dark);
    box-shadow: 1px 1px 2px white inset, -2px -2px 2px var(--color-dark-accent) inset;
    cursor: pointer;
    &:active{
        background: transparent;
        outline: 2px solid var(--color-accent);
    }
`
const SignUp = styled(NavLink)`
    color: var(--color-accent);
`

export default LogIn
