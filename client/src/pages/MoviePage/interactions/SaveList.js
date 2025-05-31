//dependencies
import { useContext, useState } from "react"
import styled from "styled-components"
import Modal from 'styled-react-modal'
//context
import { UserContext } from "../../../contexts/UserContext"
// component
import LoginModal from "../../../utilities/LoginModal"

const SaveList = ({movieInfos, movieId, listVisible, setListVisible, setReviewVisible}) =>{
    const [listName, setListName] = useState()
    const [createVisible, setCreateVisible] = useState(false)
    const [feedBackMessage, setFeedBackMessage] = useState()
    const {setUpdateUser, loggedInUser } = useContext(UserContext)
    const [modalMessage, setModalMessage] = useState(false)

    // makes the lists appear
    const listVisibility = () => {
        if(!loggedInUser){
            return setModalMessage(true)
        }
        // This ensures that only the correct Save to List is opened in the community page
        if(listVisible === movieId){
            setListVisible(null)
        }
        else{
            setListVisible(movieId) 
            setReviewVisible(null)
        }
    }
    //makes ths create list visible
    const createListVisibility = () => {
        setCreateVisible(true)
    }
    // make lists not visibles 
    const removeVisibility = () =>{
        setTimeout(()=>{
            setListVisible(false)
            setCreateVisible(false)
            setFeedBackMessage()
        },2500)
    }
    const updateList = (event, movieId) => {
        event.preventDefault()
        
        const options = {
            method: "POST",
            headers:{
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({username: loggedInUser.username, movieTitle: movieInfos.title, movieSrc: movieInfos.poster_path, listName: listName })
        }
        fetch(`${process.env.REACT_APP_BACKEND_URL}/movie/${movieId}/list`, options)
        .then(res => {
            if(!res.ok){
                throw new Error("the movie was not added")
            }
            return res.json()
        })
        .then(data => {
            setFeedBackMessage(data.message)
            if(data.status === 201){
                setUpdateUser((update) => update + 1)
            }
        })
        .catch(error => console.error(error.message))
    }
    return <>
        <Button type="button" onClick={listVisibility}>Save to List</Button>
        {listVisible === movieId && <Modal isOpen={listVisible === movieId}>
            <ListSection>
                <Title>
                    <h2>Add to your list</h2>
                    <ClosingButton type="button" onClick={listVisibility}>x</ClosingButton>
                </Title>
                <form onSubmit={event => updateList(event, movieId)}>{loggedInUser && loggedInUser.lists.map((list)=>{
                    return <div key={list.name}>
                    <input type="checkbox" id={list.name} name={list.name} value={list.name} onChange={() => setListName(list.name)}/>
                    <label htmlFor={list.name}>{list.name}</label>
                    </div>
                })}
                    <OtherButton type="button" onClick={createListVisibility}>Create List</OtherButton><br/>
                    {createVisible && <NewListSection>
                        <label htmlFor="new-list">New List Name</label>
                        <ListNameInput type="text" id="new-list" name="new-list" onChange={(event) => setListName(event.target.value)}/>
                    </NewListSection>}
                    <OtherButton type="submit" onClick={removeVisibility}>Confirm</OtherButton>
                </form>
                {feedBackMessage && <p>{feedBackMessage}</p>}
            </ListSection>
        </Modal>
        }
        <LoginModal modalMessage={modalMessage} setModalMessage={setModalMessage}/>
        </>
}

const Button = styled.button`
    height: 2rem;
    margin: 0.5rem 1rem;
    border-radius: 5px;
    background-color: var(--color-accent);
    border: none;
    text-transform: uppercase;
    font-weight:bold;
    color: var(--color-dark);
    box-shadow: 1px 1px 2px white inset, -1px -1px 2px var(--color-dark-accent) inset;
    cursor: pointer;
    &:active{
        background: transparent;
        outline: 2px solid var(--color-accent);
    }
`
const OtherButton = styled(Button)`
    margin: 0.5rem 0;
`
const ListSection = styled.div`
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
const NewListSection = styled.div`
    display:flex;
    flex-direction: column;
`
const ListNameInput = styled.input`
    width: 50%;
`
export default SaveList