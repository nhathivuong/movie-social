import { createContext, useEffect, useState } from "react";

export const AllReviewsContext = createContext()

const AllReviewsProvider = ({children}) => {
    const [allReviews, setAllReviews] = useState();

    //returns an array with all the users' username, name and src keys
    useEffect(() =>{
        const getAllReviews = () =>{
            fetch("/reviews")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json()})
            .then(data => {
                console.log(data.data)
                setAllReviews(data.data)
            })
            .catch(error => console.error(error))
        }
        getAllReviews()
    }, [])

    return <AllReviewsContext.Provider value={{allReviews, setAllReviews}}>{children}</AllReviewsContext.Provider>
}

export default AllReviewsProvider