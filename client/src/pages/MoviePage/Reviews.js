//dependencies
import styled from "styled-components"
import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import DOMPurify from 'dompurify';
import Modal from 'styled-react-modal'

//icons
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

//context
import { AllUsersContext } from "../../contexts/AllUsersContext";
import { AllReviewsContext } from "../../contexts/AllReviewsContext";
import { UserContext } from "../../contexts/UserContext";

// component
import SplashScreen from "../../SplashScreen";

const Reviews = ({movieReviews, movieId}) => {
    const {allReviews, setUpdateReview} = useContext(AllReviewsContext)
    const {allUsers} = useContext(AllUsersContext)
    const {loggedInUser} = useContext(UserContext)
    const [commentOpen, setCommentOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState(false)

    if(!allUsers || !allReviews){
        return <SplashScreen/>
    }

    const userMovieReviews = allReviews.filter((review)=> review.movieId === movieId)
    const Reviews = [...movieReviews, ...userMovieReviews]

    const commentVisible = () => {
        setCommentOpen(!commentOpen)
    }
    const likeReview = (reviewId) => {
        if(!loggedInUser){
            return setModalMessage(true)
        }
        const body = JSON.stringify({
            name: loggedInUser.name, 
            username: loggedInUser.username,
            reviewId: reviewId
        })
        const options = {
            method:"PATCH",
            headers:{
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body,
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/like-review`, options)
        .then(res => {
            if(!res.ok){
                throw new Error("The review was not liked")
            }
            return res.json()
        })
        .then(data => {
            if(data.status === 200){
            setUpdateReview((update) => update + 1)
            }
        })
        .catch(error => console.error(error))
    }
    return (
        <div>
            <h2>Reviews</h2>
            {Reviews.length > 0 
            ?<div>
                {userMovieReviews.length > 0 && userMovieReviews.map((review) => {
                    const reviewUser = allUsers.find(user => user.username === review.username)
                return (<div key={review._id}>{reviewUser 
                    ?<><ReviewBox >
                        <div>
                            <ProfilePicture src={reviewUser.src} alt={`${review.username} profile picture`} />
                            {review.rating && <p>Rating: {review.rating}</p>}
                        </div>
                        <div>
                            <NavLink to={`/user/${review.username}`}><Username>{review.username}</Username></NavLink>
                            <ReviewText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.content) }}/>
                            {review.likes.some(user => user.username === loggedInUser.username)
                            ?<button><FaHeart /></button>
                            :<button onClick={() => likeReview(review._id)}><FaRegHeart /></button>} {/*empty heart*/}
                            {commentOpen
                            ?<button onClick={commentVisible}><FaComment/> </button>
                            :<button onClick={commentVisible}><FaRegComment /></button>} {/*empty*/}
                        </div>
                    </ReviewBox>
                    <Modal isOpen={modalMessage}>
                        <AlertSection>
                            <Title>
                                <h2>Oops!</h2>
                                <ClosingButton type="button" onClick={()=>setModalMessage(false)}>x</ClosingButton>
                            </Title>
                            <p>You need to be logged in to access this feature</p>
                            <NavLink to="/login"><LogInButton type="button" onClick={()=>setModalMessage(false)}>Log in</LogInButton></NavLink>
                        </AlertSection>
                    </Modal>
                    </>
                    : <ReviewBox key={review.id}>
                        <div>
                            <p>Loading user data...</p>
                        </div>
                    </ReviewBox>}</div>)
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
const AlertSection = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-dark);
    width: 25vw;
    padding: 1rem;
    border-radius: 5px;
`
const ClosingButton = styled.button`
    color: var(--color-accent);
    background-color: transparent;
    display:flex;
    justify-self: right;
    height:fit-content;
`
const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`
const LogInButton = styled.button`
    margin-top: 1rem;
    width:100%;
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
export default Reviews