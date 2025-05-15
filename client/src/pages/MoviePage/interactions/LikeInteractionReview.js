//dependencies
import { useContext, useState } from "react"
import styled from "styled-components"

//icons
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

//context
import { AllReviewsContext } from "../../../contexts/AllReviewsContext";
import { UserContext } from "../../../contexts/UserContext";

//component
import LoginModal from "../../../LoginModal";

const LikeInteractionReview = ({review}) =>{
    const {setUpdateReview} = useContext(AllReviewsContext)
    const {loggedInUser} = useContext(UserContext)
    const [likes, setLikes] = useState(review.likes)
    const [modalMessage, setModalMessage] = useState(false)

    const likeReview = (reviewId) => {
        if(!loggedInUser){
            return setModalMessage(true)
        }
        setLikes(prev => [...prev, { username: loggedInUser.username }]);

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
            if(data.status !== 200){
                setLikes(prev => prev.filter(likes => likes.username !== loggedInUser.username ));
            }
        })
        .catch(error => console.error(error))
    }

    const unlikeReview = (reviewId) => {
        if(!loggedInUser){
            return setModalMessage(true)
        }
        setLikes(prev => prev.filter(likes => likes.username !== loggedInUser.username ));
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
        fetch(`${process.env.REACT_APP_BACKEND_URL}/unlike-review`, options)
        .then(res => {
            if(!res.ok){
                throw new Error("The review was like was not removed")
            }
            return res.json()
        })
        .then(data => {
            if(data.status === 200){
            setUpdateReview((update) => update + 1)
            }
            if(data.status !== 200){
                setLikes(prev => [...prev, { username: loggedInUser.username }]);
            }
        })
        .catch(error => console.error(error))
    }
    return <> {loggedInUser && likes.some(user => user.username === loggedInUser.username) 
        ?<FilledLikeButton onClick={() => unlikeReview(review._id)}><FaHeart /></FilledLikeButton>
        :<LikeButton onClick={() => likeReview(review._id)}><FaRegHeart /></LikeButton>}
        <LoginModal modalMessage={modalMessage} setModalMessage={setModalMessage}/></>
}
const LikeButton = styled.button`
    border: none;
    background-color: transparent;
    color: white;
    text-align: center;
    font-size: 1rem;
    margin-top: 0.5rem;
    &:hover{
        cursor: pointer
    }
`
const FilledLikeButton = styled(LikeButton)`
    border: none;
    background-color: transparent;
    color: var(--color-accent);
    text-align: center;
    font-size: 1rem;
    margin-top: 0.5rem;
`
export default LikeInteractionReview