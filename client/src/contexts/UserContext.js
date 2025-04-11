import { createContext, useEffect } from "react";
import { useState } from "react";

export const UserContext = createContext()

// this is used to have the logged in user
const UserProvider = ({children}) =>{
    //this usestate will store all the user's key
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [updateUser, setUpdateUser] = useState(0)
    //will set the loggedInUser from the localstorage on mount
    useEffect(()=>{
        const loggedInUsername = localStorage.getItem("username")
        if(loggedInUsername){
            fetch(`https://movie-social.onrender.com/user/${loggedInUsername}`)
            .then(res => res.json())
            .then(data => {
                if(data.status === 200){setLoggedInUser(data.user)}
            })
            .catch((error) => console.error(error))
        }
    },[updateUser])
    
    //functions that handles the login and the logout of the user in localstorage and in the frontend
    const logIn = (user) => {
        setLoggedInUser(user)
        localStorage.setItem("username", user.username)
    }
    const logOut = () => {
        setLoggedInUser(null)
        localStorage.removeItem("username")
    }
    //handles the follow an unfollowing of users
    const follow = (username) =>{
        const newLoggedInUser = {
            ...loggedInUser,
            follows: [...loggedInUser.follows, username],
        }
        setLoggedInUser(newLoggedInUser)
    }
    const unfollow = (username) =>{
        const newLoggedInUser ={
            ...loggedInUser,
            follows: loggedInUser.follows.filter(follow => follow !== username),
        }
        setLoggedInUser(newLoggedInUser)
    }
    // const updateName = (name) =>{
    //     setLoggedInUser(name)
    // }
    return (
        <UserContext.Provider value={{loggedInUser,  setLoggedInUser, logIn, logOut, setUpdateUser, follow, unfollow}}>{children}</UserContext.Provider>
    )
}

export default UserProvider