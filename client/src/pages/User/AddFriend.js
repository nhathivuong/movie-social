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
    background-color: var(--color-accent);
    border: none;
    text-transform: uppercase;
    font-weight:bold;
    color: var(--color-dark);
    cursor: pointer;
    &:active{
        background: transparent;
        color: var(--color-accent);
        box-shadow: 0 0 2px var(--color-accent) inset;
        outline: 2px solid var(--color-accent);
    }
`

export default AddFriend