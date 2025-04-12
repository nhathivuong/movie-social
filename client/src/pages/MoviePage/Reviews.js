//dependencies
import styled from "styled-components"
import { useContext } from "react"
import { NavLink } from "react-router-dom"
import DOMPurify from 'dompurify';

//context
import { AllUsersContext } from "../../contexts/AllUsersContext"
import { AllReviewsContext } from "../../contexts/AllReviewsContext"

const Reviews = ({movieReviews, movieId}) => {
    const {allReviews} = useContext(AllReviewsContext)
    const {allUsers} = useContext(AllUsersContext)

    if(!allUsers || !allReviews){
        return <Loading>Loading...</Loading>
    }

    const userMovieReviews = allReviews.filter((review)=> review.movieId === movieId)
    const Reviews = [...movieReviews, ...userMovieReviews]

    return (
        <div>
            <h2>Reviews</h2>
            {Reviews.length > 0 
            ?<div>
                {userMovieReviews.length > 0 && userMovieReviews.map((review) => {
                    const reviewUser = allUsers.find(user => user.username === review.username)
                return (<>{reviewUser 
                    ?<ReviewBox key={review.id}>
                        <div>
                            <ProfilePicture src={reviewUser.src} alt={`${review.username} profile picture`} />
                            {review.rating && <p>Rating: {review.rating}</p>}
                        </div>
                        <div>
                            <NavLink to={`/user/${review.username}`}><Username>{review.username}</Username></NavLink>
                            <ReviewText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.content) }}/>
                        </div>
                    </ReviewBox>
                    : <ReviewBox key={review.id}>
                        <div>
                            <p>Loading user data...</p>
                        </div>
                    </ReviewBox>}</>)
                })}
                {movieReviews.map((review) => {
                return <ReviewBox key={review.id}>
                    <div>
                        <ProfilePicture src={review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}` 
                        : "/assets/default_picture.svg"} 
                        alt={`${review.author_details.username} profile picture`} />
                        {review.author_details.rating && <p>rating: {review.author_details.rating}</p>}
                    </div>
                    <div>
                        <Username>{review.author_details.username}</Username>
                        <ReviewText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.content) }}/>
                    </div>
                </ReviewBox>
            })}</div>
            :<p>No Reviews</p>}
        </div>
    )
}
const Loading = styled.h1`
    margin: 4rem auto;
    width: fit-content;
`
const ReviewBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2rem 0;
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 0 3px var(--color-light) inset, 0 0 10px var(--color-dark) inset;
    border-radius: 10px;
`
const ProfilePicture = styled.img`
    width:70px; 
    height:70px;
    border-radius: 50%;
    object-fit: cover;
    box-sizing: border-box;
`
const Username = styled.h2`
    font-size: 1.5rem;
`
const ReviewText = styled.p`
    margin-top: 1rem;
`
export default Reviews