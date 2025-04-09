import { useState } from "react"

const WriteReview = ({loggedInUser, movieId}) => {
    const [reviewVisible, setReviewVisible] = useState(false)
    const toggleVisibility = () =>{
        setReviewVisible(!reviewVisible)
    }
    const handleReview = () =>{
        const body = JSON.stringify({
            username: loggedInUser.username,
            rating : document.getElementById("rating").value,
            content: document.getElementById("review").value
        })
        const options = {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body
        }
        fetch(`/movie/${movieId}/review`, options)
        .then(res => {
            if(!res.ok){
                throw new Error("The review was not created")
            }
            return res.json()
        })
        .then(data => {
            if(data.status === 201){
                setReviewVisible(false)
            }
        })
        .catch(error => console.error(error.message))

    }
    return <>
        <button onClick={toggleVisibility}>Write a Review</button>
        {reviewVisible && 
        <form onSubmit={handleReview}>
            <label htmlFor="rating">Rate this movie *</label>
            <input id="rating" name="rating" type="number" max={10} placeholder="out of 10"/><br/>
            <label htmlFor="review">Write a review *</label><br/>
            <input id="review" name="review" type="text"/><br/>
            <button type="submit">Send</button>
        </form>}
    </>
}
export default WriteReview