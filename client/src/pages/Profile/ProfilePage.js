//dependencies 
import { useContext } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
//context
import { AllUsersContext } from "../../contexts/AllUsersContext"

const ProfilePage = () =>{
    const { allUsers } = useContext(AllUsersContext)
    const { username } = useParams()
    if(!allUsers ){
        return <p>Loading profile</p>
    }
    const userInfo = allUsers.filter(user => user.username === username)
    if(!userInfo ){
        return <p>Loading profile</p>
    }
    return <>{userInfo.map(info => {
            return(
                <Profile key={info.username}>
                    <Picture src={info.src} alt={`${info.name}'s profile picture`}/>
                    <h2>{info.name}</h2>
                </Profile>
                )}
        )
    }</>
}
const Profile = styled.div`
    margin: 2rem auto;
    width: 80dvw;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
`
const Picture = styled.img`
    width: 150px;
    border-radius:50%;
`
export default ProfilePage