import { useState } from "react"

const WriteReview = ({loggedInUser}) => {
    const [reviewVisible, setReviewVisible] = useState(false)
    const toggleVisibility = () =>{
        setReviewVisible(!reviewVisible)
    }
    return <>
        <button onClick={toggleVisibility}>Write a Review</button>
        {reviewVisible && 
        <form>
            <label>Rate this movie *</label>
            <input type="number" max={10} placeholder="out of 10"/><br/>
            <label>Write a review *</label><br/>
            <input type="text"/><br/>
            <button type="submit">Send</button>
        </form>}
    </>
}
export default WriteReview