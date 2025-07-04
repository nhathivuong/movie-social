//dependencies
import styled from "styled-components"
import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import DOMPurify from 'dompurify';

//context
import { AllUsersContext } from "../../contexts/AllUsersContext";
import { AllReviewsContext } from "../../contexts/AllReviewsContext"

// component
import SplashScreen from "../../utilities/SplashScreen";
import LikeInteractionReview from "./interactions/LikeInteractionReview";
import CommentReview from "./interactions/CommentReview";

const Reviews = ({movieReviews, movieId}) => {
    const {allReviews} = useContext(AllReviewsContext)
    const {allUsers} = useContext(AllUsersContext)
    const [reviewExpanded, setReviewExpanded] = useState({})

    if(!allUsers || !allReviews){
        return <SplashScreen/>
    }

    const userMovieReviews = allReviews.filter((review)=> review.movieId === movieId)
    const Reviews = [...movieReviews, ...userMovieReviews]

    const toggleReview = (id) =>{
        setReviewExpanded((reviewExpanded) => ({
            ...reviewExpanded, 
            [id]: !reviewExpanded[id],
        }))
    }
    return (
        <div>
            <h2>Reviews</h2>
            {Reviews.length > 0 
            ?<div>
                {userMovieReviews.length > 0 && userMovieReviews.map((review) => {
                    const reviewUser = allUsers.find(user => user.username === review.username)
                    const isExpanded = reviewExpanded[review._id];
                return (<div key={review._id}>
                    {reviewUser 
                    ?<><ReviewBox>
                    <div>
                        <ProfilePicture src={reviewUser.src} alt={`${review.username} profile picture`} />
                        {review.rating && <p>Rating: {review.rating}</p>}
                    </div>
                    <div>
                        <NavLink to={`/user/${review.username}`}><Username>{review.username}</Username></NavLink>
                        <ReviewText $expanded={isExpanded} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.content) }}/>
                        <ReadMoreButton onClick={() => toggleReview(review._id)}>{isExpanded ? 'Read less' : 'Read more'}</ReadMoreButton>
                        <LikeInteractionReview review={review}/>
                        <CommentReview review={review}/>
                    </div>
                </ReviewBox>
                    </>
                    : <ReviewBox key={review.id}>
                        <div>
                            <p>Loading user data...</p>
                        </div>
                    </ReviewBox>}</div>)
                })}
                {movieReviews.map((review) => {
                    const isExpanded = reviewExpanded[review.id];
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
                        <ReviewText $expanded={isExpanded} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.content) }}/>
                        <ReadMoreButton onClick={() => toggleReview(review.id)}>{isExpanded ? 'Read less' : 'Read more'}</ReadMoreButton>
                    </div>
                </ReviewBox>
            })}</div>
            :<p>No Reviews</p>}
        </div>
    )
}

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
const ReviewText = styled.div`
    margin-top: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    ${({ $expanded }) =>
    $expanded
        ? '-webkit-line-clamp: unset;'
        : '-webkit-line-clamp: 3;'
    }
    article, section{
        font-size: 1rem;
        h1{
            font-size: 1.5rem;
            padding: 0;
            padding-bottom: 0.5rem;
            text-shadow: none;
        }
        h2{
            font-size: 1.2rem;
            text-shadow: none;
            padding: 0.5rem 0;
        }
        p{
            font-size: 1rem;
        }
    }
`
const ReadMoreButton = styled.button`
    padding: 0;
    border: none;
    font-weight:bold;
    display: flex;
    text-align: top;
    line-height: 1.5;
    background-color: transparent;
    color: var(--color-accent);
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`
export default Reviews