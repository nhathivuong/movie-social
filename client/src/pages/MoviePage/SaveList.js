import { useState } from "react"
const SaveList = ({loggedInUser}) =>{
    const [listName, setListName] = useState()
    const [createVisible, setCreateVisible] = useState(false)
    const [listVisible, setListVisible] = useState(false)
    // makes the lists appear
    const listVisibility = () => {
        setListVisible(true)
    }
    //makes ths create list visible
    const createListVisibility = () => {
        setListVisible(false)
        setCreateVisible(true)
    }
    // make lists not visibles 
    const removeVisibility = () =>{
        setListVisible(false)
        setCreateVisible(false)
    }
    const updateList = (event) => {
        event.preventDefault()
        
        const options = {
            method: "POST",
            headers:{
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({username: loggedInUser.username, movieTitle: movieInfos.title, movieSrc: movieInfos.poster_path, listName: listName })
        }
        fetch(`/movie/${movieId}`, options)
        .then(res => {
            if(!res.ok){
                throw new Error("the movie was not added")
            }
            return res.json()
        })
        .then(data => {
            if(data.status === 200){
                setCreateVisible(false)
            }
        })
        .catch(error => console.error(error.message))
    }
    return <>
        <button type="button" onClick={listVisibility}>Save to List</button>
        {listVisible && <form onSubmit={updateList}>{loggedInUser && loggedInUser.lists.map((list)=>{
            return <div key={list.name}>
            <input type="checkbox" id={list.name} name={list.name} value={list.name} onChange={() => setListName(list.name)}/>
            <label htmlFor={list.name}>{list.name}</label>
            </div>
        })}
            <button type="button" onClick={createListVisibility}>Create List</button>
            {createVisible && <><label htmlFor="new-list">New List</label>
            <input type="text" id="new-list" name="new-list" onChange={(event) => setListName(event.target.value)}/></>}
            <button type="submit" onClick={removeVisibility}>Confirm</button>
        </form>}
        </>
}

export default SaveList