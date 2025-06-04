import { useContext, useState } from "react"
import styled from "styled-components"
//context
import { UserContext } from "../../contexts/UserContext"

const AddFriend = ({currentUser, followUser}) => {
    const {follow} = useContext(UserContext)
    const [status, setStatus] = useState("idle")
    
    // handle the follow action
    const handleSubmit = (event) =>{
        event.preventDefault()
        setStatus("adding")
        const body = JSON.stringify({
            username: currentUser,
            newFollow: followUser
        })
        const options = {
            method : "PATCH",
            headers :{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/add-friend`, options)
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
                follow(data.username)
                setStatus("idle")
            }
            if(data.status !== 200){
                setStatus("idle")
            }
        })
        .catch(error => console.error(error))
    }
    return <form onSubmit={handleSubmit}><FollowButton type="submit" disabled={status !== "idle"}>{status === "idle"?"Follow":"following..."}</FollowButton></form>
}
const FollowButton = styled.button`
    margin: 0.5rem auto;
    padding: 0.3rem 1rem;
    border-radius: 5px;
    background-color: var(--color-dark);
    border: none;
    text-transform: uppercase;
    font-weight:bold;
    color: var(--color-light);
    text-shadow: 0 0 1px black;
    box-shadow: 1px 1px 2px white inset, -2px -2px 2px var(--color-dark) inset;
    cursor: pointer;
    &:active{
        background: transparent;
        box-shadow: 0 0 2px var(--color-dark) inset;
        outline: 2px solid var(--color-dark);
    }
`

export default AddFriend