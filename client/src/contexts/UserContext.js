import { createContext, useEffect } from "react";
import { useState } from "react";

export const UserContext = createContext()

// this is used to have the logged in user
const UserProvider = ({children}) =>{
    //this usestate will store the name , username and src
    const [loggedInUser, setLoggedInUser] = useState(null);
    
    //will set the loggedInUser from the localstorage on mount
    useEffect(()=>{
        const loggedInUsername = localStorage.getItem("username")
        if(loggedInUsername){
            fetch(`/user/${loggedInUsername}`)
            .then(res => res.json())
            .then(data => {
                if(data.status === 200){setLoggedInUser(data.user)}
            })
            .catch((error) => console.error(error))
        }
    },[])
    
    //functions that handles the login and the logout of the user in localstorage and in the frontend
    const logIn = (user) => {
        setLoggedInUser(user)
        localStorage.setItem("username", user.username)
    }
    const logOut = () => {
        setLoggedInUser(null)
        localStorage.removeItem("username")
    }
    // const addFriend = (username) =>{
    //     const newLoggedInUser = {
    //         ...loggedInUser,
    //         friends: [...loggedInUser.friends, name],
    //     }
    //     setLoggedInUser(newLoggedInUser)
    // }
    // const removeFriend = (name) =>{
    //     const newLoggedInUser ={
    //         ...loggedInUser,
    //         friends: loggedInUser.friends.filter(friend => friend !== name),
    //     }
    //     setLoggedInUser(newLoggedInUser)
    // }
    // const updateName = (name) =>{
    //     setLoggedInUser(name)
    // }
    return (
        <UserContext.Provider value={{loggedInUser,  setLoggedInUser, logIn, logOut}}>{children}</UserContext.Provider>
    )
}

export default UserProvider