import { createContext, useEffect, useState } from "react";

export const AllUsersContext = createContext()

const AllUsersProvider = ({children}) => {
    const [allUsers, setAllUsers] = useState();

    //returns an array with all the users' username, name and src keys
    useEffect(() =>{
        const getAllUsers = () =>{
            fetch("/users")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json()})
            .then(data => {
                setAllUsers(data.allUsers)
            })
            .catch(error => console.error(error))
        }
        getAllUsers()
    }, [])

    return <AllUsersContext.Provider value={{allUsers, setAllUsers}}>{children}</AllUsersContext.Provider>
}

export default AllUsersProvider