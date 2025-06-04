// dependencies
import {useContext, useState} from "react"
import { NavLink, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Resizer from "react-image-file-resizer";

// context
import { UserContext} from "../../contexts/UserContext"

const SignUp = () => {
    const [src, setSrc] = useState()
    const {logIn, setUpdateUser} = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignUp = (event) => {
        event.preventDefault()
        const body = JSON.stringify({
            name: document.getElementById("fullname").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            src: src
        })
        const options = {
            method:"POST",
            credentials: 'include',
            headers:{
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body,
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, options)
        .then(res => {
            if(!res.ok){
                throw new Error("the user was not logged in")
            }
            return res.json()
        })
        .then(data => {
            if(data.status === 201){
                logIn(data.token);
                setUpdateUser(update => update + 1);
                navigate(`/user/${data.username}`)
            }
        })
    }

    const resize = (file) => {
        return new Promise((res, rej) => {
            try {
                // settings to resize the images
                Resizer.imageFileResizer(
                file,
                2500,
                2500,
                "JPEG",
                75,
                0,
                (base64) => res(base64),
                "base64"
                )
            } 
            catch (err) {
                rej(err)
            }
            })
        };
    // set Preview Image and image src
    const previewImage = async ({ target: { files } }) => {
        const selectedFile = files[0]
        if (!selectedFile) return setSrc("/assets/default_picture.svg")
        try {
            const base64 = await resize(selectedFile)
            setSrc(base64)
        } 
        catch (err) {
            console.error("Image resize failed:", err)
        }
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
        <label htmlFor="password">Password</label>
        <UserInput type="password" id="password" name="password" required/>
        <label htmlFor="image">
        <input id="image" type="file" accept="image/jpg" multiple={false} onChange={previewImage}/>
        {src && <ProfilePicture src={src} alt="profile picture"/>}
        </label>
        <SignUpButton type="submit">SignUp</SignUpButton>
    </SignUpForm>
    <p>Already a user? <LogIn to="/login">Log In</LogIn></p>
    </SignUpBox>
}
const SignUpBox = styled.div`
    width:30svw;
    position:absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    background-color: var(--color-accent);
    border: none;
    text-transform: uppercase;
    font-weight:bold;
    color: var(--color-dark);
    box-shadow: 1px 1px 2px white inset, -2px -2px 2px var(--color-dark) inset;
    cursor: pointer;
    &:active{
        background: transparent;
        outline: 2px solid var(--color-accent);
    }
`
const LogIn = styled(NavLink)`
    color: var(--color-accent);
`
const ProfilePicture = styled.img`
    width:50%;
    border-radius:50%;
`
export default SignUp
