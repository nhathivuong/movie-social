// dependencies
import {useContext, useState} from "react"
import { useNavigate } from "react-router-dom"
// context
import { UserContext} from "../contexts/UserContext"

const SignUp = () => {
    const [src, setSrc] = useState()
    const [file, setFile] = useState()
    const {setLoggedInUser, logIn} = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignUp = () => {
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
    return <>
    <form onSubmit={handleSignUp}>
        <label htmlFor="fullname">Full Name</label>
        <input type="text" id="fullname" name="fullname" required/>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required/>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required/>
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
        <p>Selected File: {file ? file.name : 'None'}</p>
        {src && <img src={src} alt="your face"/>}
        </label>
        <button type="submit">SignUp</button>
    </form>
    </>
}

export default SignUp