//dependencies
import { useContext } from "react"
//context
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const LogIn = () =>{
    const {logIn, setLoggedInUser} = useContext( UserContext )
    const navigate = useNavigate()
    const handleLogIn = () =>{
        const options = {
            method: "POST",
            headers:{
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({username: document.getElementById("username").value})
        }
        fetch("/login", options)
        .then(res => {
            if(!res.ok){
                throw new Error("the user was not logged in")
            }
            return res.json()
        })
        .then(data => {
            if(data.status === 200){
                setLoggedInUser(data.user)
                logIn(data.user)
                navigate(`/user/${data.user.username}`)
            }
        })
        .catch(error => console.error(error.message))
    }
    return <form onSubmit={handleLogIn}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" placeholder="your username" required/>
            <button >Log in</button>
        </form>
}
// remember me to auto login
export default LogIn