// dependencies
import {useContext, useState} from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"
// context
import { UserContext} from "../../contexts/UserContext"

const SignUp = () => {
    const [src, setSrc] = useState()
    const [file, setFile] = useState()
    const {setLoggedInUser, logIn} = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignUp = (event) => {
        event.preventDefault()
        const body = JSON.stringify({
            name: document.getElementById("fullname").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            src: src
        })
        const options = {
            method:"POST",
            headers:{
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body,
        }
        fetch("/user", options)
        .then(res => {
            if(!res.ok){
                throw new Error("the user was not logged in")
            }
            return res.json()
        })
        .then(data => {
            if(data.status === 201){
                setLoggedInUser(data.user);
                logIn(data.user);
                navigate(`/user/${data.user.username}`)
            }
        })
    }
    return <SignUpBox>
        <h2>Sign Up</h2>
    <SignUpForm onSubmit={handleSignUp}>
        <label htmlFor="fullname">Full Name</label>
        <UserInput type="text" id="fullname" name="fullname" required/>
        <label htmlFor="username">Username</label>
        <UserInput type="text" id="username" name="username" required/>
        <label htmlFor="email">Email</label>
        <UserInput type="email" id="email" name="email" required/>
        <label htmlFor="image">
        <input
        id="image"
        type="file"
        accept="image/jpg"
        multiple={false}
        onChange={({ target: { files } }) => {
            const selectedFile = files[0];
            setFile(selectedFile);
            if (!selectedFile) return setSrc("/assets/default_picture.svg");
            const reader = new FileReader();
            reader.onloadend = () => {
                setSrc(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }}
        required></input>
        {src && <ProfilePicture src={src} alt="your face"/>}
        </label>
        <SignUpButton type="submit">SignUp</SignUpButton>
    </SignUpForm>
    <p>Already a user? <LogIn to="/logIn">Log In</LogIn></p>
    </SignUpBox>
}
const SignUpBox = styled.div`
    width:30svw;
    margin: 2rem auto;
    padding: 1rem;
    display:flex;
    flex-direction:column;
    border-radius: 10px;
    background-color: black;
    gap: 0.5rem;
`
const SignUpForm = styled.form`
    display:flex;
    flex-direction:column;
    gap: 0.5rem;
`
const UserInput = styled.input`
    height: 2rem;
    border-radius: 5px;
`
const SignUpButton = styled.button`
    height: 2rem;
    border-radius: 5px;
    background-color: var(--color-green);
    border: none;
    text-transform: uppercase;
    font-weight:bold;
    color: var(--color-light);
    text-shadow: 0 0 1px black;
    box-shadow: 1px 1px 2px white inset, -2px -2px 2px var(--color-dark-green) inset;
    cursor: pointer;
    &:active{
        background: transparent;
        outline: 2px solid var(--color-green);
    }
`
const LogIn = styled(NavLink)`
    color: var(--color-green);
`
const ProfilePicture = styled.img`
    width:50%;
    border-radius:50%;
`
export default SignUp