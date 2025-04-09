import { useState } from "react"
import styled from "styled-components"

const WriteReview = ({loggedInUser, movieId, setListVisible, reviewVisible, setReviewVisible}) => {
    const [rating, setRating] = useState()

    // post the review in the database
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
    //changes the visibility of the form 
    const toggleVisibility = () =>{
        setReviewVisible(!reviewVisible)
        setListVisible(false)
    }
    const handleRating = (event) =>{
        setRating(Number(event.target.value))
    }
    return <>
        <Button onClick={toggleVisibility}>Write a Review</Button>
        {reviewVisible && 
        <ReviewForm>
            <Title>
                <h2>Review</h2>
                <ClosingButton type="button" onClick={toggleVisibility}>x</ClosingButton>
            </Title>
            <form onSubmit={handleReview}>
                <label htmlFor="rating">Rate this movie * </label>
                <select id="rating" name="rating" value={rating} onChange={handleRating} required>
                    <option value="" disabled selected>rating out of 10</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                </select><br/>
                <label htmlFor="review">Write a review * </label><br/>
                <ReviewWritting id="review" name="review" type="text"  placeholder="Write your review here"  required/><br/>
                <Button type="submit">Send</Button>
            </form>
        </ReviewForm>}
    </>
}
const Button = styled.button`
    height: 2rem;
    border-radius: 5px;
    background-color: var(--color-accent);
    border: none;
    text-transform: uppercase;
    font-weight:bold;
    color: var(--color-dark);
    box-shadow: 1px 1px 2px white inset, -2px -2px 2px var(--color-dark-accent) inset;
    cursor: pointer;
    &:active{
        background: transparent;
        outline: 2px solid var(--color-accent);
    }
`
const ReviewForm = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-dark);
    width: 40vw;
    padding: 1rem;
    border-radius: 5px;
`
const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`
const ClosingButton = styled.button`
    color: var(--color-accent);
    background-color: transparent;
    display:flex;
    justify-self: right;
    height:fit-content;
`
const ReviewWritting = styled.textarea`
    width: 100%;
    height: 5rem;
    text-align: top;
    margin-bottom: 0.5rem;
`
export default WriteReview