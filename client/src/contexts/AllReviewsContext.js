import { createContext, useEffect, useState } from "react";

export const AllReviewsContext = createContext()

const AllReviewsProvider = ({children}) => {
    const [allReviews, setAllReviews] = useState();
    const [updateReview, setUpdateReview] = useState(0)
    //returns an array with all the users' username, name and src keys
    useEffect(() =>{
        const getAllReviews = () =>{
            fetch("https://movie-social.onrender.com/reviews")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json()})
            .then(data => {
                setAllReviews(data.data)
            })
            .catch(error => console.error(error))
        }
        getAllReviews()
    }, [updateReview])

    return <AllReviewsContext.Provider value={{allReviews, setAllReviews, setUpdateReview}}>{children}</AllReviewsContext.Provider>
}

export default AllReviewsProvider