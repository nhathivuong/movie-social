// dependencies
import {useContext, useState} from "react"
// context
import { UserContext } from "../contexts/UserContext"

const SignUp = () => {
    const [src, setSrc] = useState()
    const [file, setFile] = useState()
    const {setLoggedInUser} = useContext(UserContext)

    const handleSignUp = () => {
        const body = JSON.stringify({
            fullname: document.getElementById("fullname").value,
            usersame: document.getElementById("username").value,
            email: document.getElementById("email").value,
            picture: document.getElementById("image").value,
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
        .then(res => res.json())
        .then(data => {
            if(data.status === 201){
                setLoggedInUser(data.data.username)
            }
        })
    }
    return <>
    <form onSubmit={handleSignUp}>
        <label htmlFor="fullname">Full Name</label>
        <input type="text" id="fullname" name="fullname"/>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username"/>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email"/>
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
        ></input>
        <p>Selected File: {file ? file.name : 'None'}</p>
        {src && <img src={src} alt="your face"/>}
        </label>
        <button type="submit">SignUp</button>
    </form>
    </>
}

export default SignUp