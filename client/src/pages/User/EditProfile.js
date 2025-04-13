import Modal from 'styled-react-modal'
import styled from 'styled-components'
import { useContext, useState } from 'react'

import { UserContext } from '../../contexts/UserContext'
const EditProfile = ({userInfos, username}) =>{
    const { loggedInUser, setUpdateUser} = useContext(UserContext)
    const [feedBackMessage, setFeedBackMessage] = useState()
    const [open, setOpen] = useState(false)
    
    const [editName, setEditName] = useState(userInfos.name)
    const [editPronoun, setEditPronoun] = useState(userInfos.pronouns|| "")
    const [text, setText] = useState(userInfos.bio || "")

    const handleEdit = (event) => {
        event.preventDefault()
        const body = JSON.stringify({
            name: editName,
            pronouns: editPronoun,
            bio: text
        })
        const options = {
            method: "PATCH",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body
        }
        fetch(`https://movie-social.onrender.com/user/${username}`, options)
        .then(res => res.json())
        .then(data => {
            setFeedBackMessage(data.message)
            if(data.status === 200){
                setUpdateUser(update => update+1)
            }
            setTimeout(() => {
                setOpen(false)
                setFeedBackMessage()
            }, 2500);
        })
        .catch(error => console.error(error.message))
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return <>
        {loggedInUser && userInfos.username === loggedInUser.username && <Edit onClick={handleOpen}>Edit profile</Edit>}
            <Modal isOpen={open} onClose={handleClose} aria-labelledby="child-modal-title">
                <ReviewForm>
                    <Title>
                        <h2 id="child-modal-title">Edit Profile</h2>
                        <ClosingButton type="button" onClick={handleClose}>x</ClosingButton>
                    </Title>
                    <ModifSection onSubmit={handleEdit}>
                        <EachEdit>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={editName} onChange={(event) => setEditName(event.target.value)}/>
                        </EachEdit>
                        <EachEdit>
                            <label htmlFor="pronoun">Pronouns</label>
                            <input id="pronoun" name="pronoun" type="text" value={editPronoun} onChange={(event) => setEditPronoun(event.target.value)}placeholder={"They/Them"}/>
                        </EachEdit>
                        <EachEdit>
                            <label htmlFor="bio">Write a bio</label>
                            <BioWritting id="bio" name="bio" type="bio"  placeholder="Write your new bio here" value={text} onChange={(event) => setText(event.target.value)} maxLength={150}/>
                            <MaxCharacter>{text.length} / 150</MaxCharacter>
                        </EachEdit>
                        <Button type="submit">Send</Button>
                        {feedBackMessage && <p>{feedBackMessage}</p>}
                    </ModifSection>
                </ReviewForm>
            </Modal>
    </>
}
const Edit = styled.button`
    margin: auto;
    padding: 5px;
    cursor: pointer;
    height: fit-content;
    background:none;
    color: var(--color-dark);
    font-weight:bold;
    border:none;
    border-radius: 5px;
    display:flex;
    justify-content:center;
    align-items:center;
    &:hover{
        text-decoration:underline;
    }
    &:active{
        outline: 1px solid var(--color-light);
        box-shadow: 0px 0px 2px var(--color-dark) inset;
    }
`
const ReviewForm = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-dark);
    width: 20vw;
    padding: 1rem;
    border-radius: 5px;
`
const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`
const ModifSection = styled.form`
    display:flex;
    flex-direction: column;
`
const EachEdit = styled.div`
    display:flex;
    flex-direction: column;
    margin: 5px 0;
`
const ClosingButton = styled.button`
    color: var(--color-accent);
    background-color: transparent;
    display:flex;
    justify-self: right;
    height:fit-content;
`
const BioWritting = styled.textarea`
    height: 5rem;
    text-align: top;
`
const MaxCharacter = styled.p`
    width: 100%;
    text-align:right;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
` 
const Button = styled.button`
    height: 2rem;
    border-radius: 5px;
    background-color: var(--color-accent);
    border: none;
    text-transform: uppercase;
    font-weight:bold;
    color: var(--color-dark);
    box-shadow: 1px 1px 2px white inset, -2px -2px 2px var(--color-dark-accent) inset;
    margin-bottom: 0.5rem;
    cursor: pointer;
    &:active{
        background: transparent;
        outline: 2px solid var(--color-accent);
    }
`
export default EditProfile