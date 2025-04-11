import { useContext, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import styled from "styled-components"

const RemoveFriend = ({name, exFriend}) => {
    const {removeFriend} = useContext(UserContext)

    const [status, setStatus] = useState("idle")
    const handleSubmit = (event) =>{
        event.preventDefault()
        setStatus("removing")
        const body = JSON.stringify({
            name: name,
            exFriend: exFriend
        })
        const options = {
            method : "PATCH",
            headers :{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body
        }
        fetch("https://movie-social.onrender.com/removeFriend", options)
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
                removeFriend(data.name)
                setStatus("idle")
            }
            if(data.status !== 200){
                setStatus("idle")
            }
        })
        .catch(error => console.error(error))
    }
    return <form onSubmit={handleSubmit}><FollowButton type="submit" disabled={status !== "idle"}>{status === "idle"?"Unfollow":"unfollowing..."}</FollowButton></form>
}
const FollowButton = styled.button`
    margin: 0.5rem auto;
    padding: 0.3rem 1rem;
    border-radius: 5px;
    background-color: var(--color-dark-accent);
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
        outline: 2px solid var(--color-dark-accent);
    }
`

export default RemoveFriend