import { createContext, useEffect, useState } from "react";

export const AllUsersContext = createContext()

const AllUsersProvider = ({children}) => {
    const [allUsers, setAllUsers] = useState();

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