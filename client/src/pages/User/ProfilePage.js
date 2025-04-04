//dependencies 
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
//context
import { UserContext } from "../../contexts/UserContext"

const ProfilePage = () =>{
    const { loggedInUser } = useContext(UserContext)

    if(!loggedInUser ){
        return <p>Loading profile</p>
    }
    

    return <ProfileSection>
        <Profile key={loggedInUser.username}>
            <Picture src={loggedInUser.src} alt={`${loggedInUser.name}'s profile picture`}/>
            <NameAlign>
                <h2>{loggedInUser.name}</h2>
                <p>@{loggedInUser.username}</p>
            </NameAlign>
            <BioText>Creative thinker fueled by coffee and late-night ideas. I build things on the web, sketch on napkins, and chase inspiration like it’s going out of style. Always learning, always curious. Let's make something awesome. ✨</BioText>
        </Profile>
        <div>
            <h3>Lists</h3>
            <h4>List name</h4>
        </div>
    </ProfileSection>
}
const ProfileSection = styled.div`
    display:flex;
    flex-direction: row;
    margin: 2rem 4rem;
    gap: 2rem;
`
const Profile = styled.div`
    width: 25%;
    height: fit-content;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:start;
    background-color: var(--color-accent);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 1px 1px 4px white inset, -2px -2px 2px var(--color-dark-accent) inset;
`
const Picture = styled.img`
    /* display:flex; */
    align-self:center;
    margin-bottom: 2rem;
    width: 150px;
    border-radius:50%;
    border: 2px solid var(--color-dark-accent);
    box-shadow: 0 0 3px var(--color-dark-accent);
`
const NameAlign = styled.div`
    display:flex;
    flex-direction:row;
    align-items:baseline;
    gap: 8px;
`
const BioText = styled.p`
    margin-top: 0.5rem;
    color: var(--color-dark-accent);
`
export default ProfilePage