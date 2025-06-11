//dependencies
import { useContext, useState } from "react"
import styled from "styled-components"

//icons
import { FaRegComment } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

//context
import { AllReviewsContext } from "../../../contexts/AllReviewsContext";
import { UserContext } from "../../../contexts/UserContext";
import LoginModal from "../../../utilities/LoginModal";

const CommentReview = ({review}) =>{
    const {setUpdateReview} = useContext(AllReviewsContext)
    const {loggedInUser} = useContext(UserContext)
    const [comments, setComments] = useState(review.comments)
    const [modalMessage, setModalMessage] = useState(false)
    const [text, setText] = useState("")
    // this allows the user to see the comments for a review
    const [commentOpen, setCommentOpen] = useState(false)
    // this allows the user to open the form to write their comment 
    const [writeCommentOpen, setWriteCommentOpen] = useState(false)

    const commentReview = (event) => {
        event.preventDefault()

        // directly updates the front-end
        if(text){
            setComments(prev => [...prev, { username: loggedInUser.username, text: text}]);
        }
        //updates the backend
        const body = JSON.stringify({
            comment: text, 
            username: loggedInUser.username,
            reviewId: review._id
        })
        const options = {
            method:"PATCH",
            headers:{
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body,
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/comment-review`, options)
        .then(res => {
            if(!res.ok){
                setComments(prev => prev.filter(comment => comment.username !== loggedInUser.username ));
                throw new Error("The comment was not posted")
            }
            return res.json()
        })
        .then(data => {
            if(data.status === 200){
            setUpdateReview((update) => update + 1)
            }
            if(data.status !== 200){
                setComments(prev => prev.filter(comment => comment.username !== loggedInUser.username ));
            }
        })
        .catch(error => console.error(error))
    }
    const commentVisible = () => {
        setCommentOpen(!commentOpen)
    }
    const WriteComment = () => {
        if(!loggedInUser){
            return setModalMessage(true)
        }
        setWriteCommentOpen(!writeCommentOpen)
    }
    return <>{commentOpen
        ?<>
            <ActiveCommentButton onClick={commentVisible}><FaComment/></ActiveCommentButton>
            <div>
                <WriteCommentAlignment>
                    <WriteCommentButton onClick={WriteComment}>Write a comment</WriteCommentButton>
                    {writeCommentOpen && 
                    <form onSubmit={commentReview}>
                        <WriteCommentLabel htmlFor="comment">your comment</WriteCommentLabel>
                        <WriteCommentInput id="comment" name="comment" placeholder="Comment here" value={text} onChange={(event) => setText(event.target.value)}/><br/>
                        <SubmitComment type="submit">Submit</SubmitComment>
                    </form>}
                </WriteCommentAlignment>
                {comments.length > 0 
                ?comments.map((comment) =>{
                    return <EachComment key={comment.createdAt}>
                        <p>{comment.username}</p>
                        <p>{comment.text}</p>
                    </EachComment>
                })
                : <NoComment>No comment be the first to comment</NoComment>}
            </div>
        </>
        :<CommentButton onClick={commentVisible}><FaRegComment /></CommentButton>}
        <LoginModal modalMessage={modalMessage} setModalMessage={setModalMessage}/>
        </>
}
const CommentButton = styled.button`
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
const ActiveCommentButton = styled(CommentButton)`
    border: none;
    background-color: transparent;
    color: var(--color-accent);
    text-align: center;
    font-size: 1rem;
    margin-top: 0.5rem;
`
const WriteCommentAlignment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: left;
`
const WriteCommentButton = styled.button`
    background-color: transparent;
    border:none;
    color: var(--color-accent);
    font-size: 0.90rem;
    padding: 0;
    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
`
const WriteCommentLabel = styled.label`
    display: none;
`
const WriteCommentInput = styled.textarea`
    height: fit-content;
    width: 30vw;
`
const SubmitComment = styled.button`
    height: 1.5rem;
    border-radius: 5px;
    background-color: var(--color-accent);
    border: none;
    text-transform: uppercase;
    font-weight:bold;
    color: var(--color-dark);
    margin-bottom: 0.5rem;
    cursor: pointer;
    &:active{
        background: transparent;
        outline: 2px solid var(--color-accent);
        color: var(--color-accent)
    }
`
const EachComment = styled.div`
    padding: 0.5rem 0;
`
const NoComment = styled.p`
    text-align: center;
    padding: 1rem;
`
export default CommentReview