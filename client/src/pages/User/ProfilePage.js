//dependencies 
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom";
//context
import { UserContext } from "../../contexts/UserContext"
import { AllReviewsContext } from "../../contexts/AllReviewsContext";

//components
import AddFriend from "./AddFriend";
import RemoveFriend from "./RemoveFriend";
import UserReview from "./UserReview";
import UserList from "./UserList";

const ProfilePage = () =>{
    const { loggedInUser} = useContext(UserContext)
    const {allReviews} = useContext(AllReviewsContext)
    const {username} = useParams()
    const [userInfos, setUserInfos] = useState()
    const [movies, setMovies] = useState()
    const [userReviews, setUserReviews] = useState()

    useEffect(()=>{
        const loadData = async () => {
            try{
                const response = await fetch(`https://movie-social.onrender.com/user/${username}`)
                const data = await response.json()
                if(data.status === 200){
                    setUserInfos(data.user)
                }

                const userReviews = allReviews.filter(review => review.username === username)
                setUserReviews(userReviews)
                const movieRequest = userReviews.map(review => 
                    fetch(`https://movie-social.onrender.com/api/movie/${review.movieId}`)
                    .then(res => res.json())
                    .then(data => data.movieDetails)
                )
                const movieInfos = await Promise.all(movieRequest)
                setMovies(movieInfos)
            }
            catch(error){
                console.error(error.message)
            }
        }
        if (allReviews && username) {
            loadData();
        }
    },[allReviews, loggedInUser, username])
    
    if(!allReviews ||!userInfos){
        return <p>Loading profile</p>
    }
    
    return <ProfileSection>
        <Profile>
            <Picture src={userInfos.src} alt={`${userInfos.name}'s profile picture`}/>
            <p>Edit profile</p>
            <NameAlign>
                <h2>{userInfos.name}</h2>
                <p>{userInfos.pronouns}</p>
                <p>@{userInfos.username}</p>
            </NameAlign>
            <BioText>{userInfos.bio}</BioText>
            {loggedInUser && userInfos.username !== loggedInUser.username && !loggedInUser.follows.includes(userInfos.username) && <AddFriend currentUser={loggedInUser.username} followUser={userInfos.username}/>}
            {loggedInUser && userInfos.username !== loggedInUser.username && loggedInUser.follows.includes(userInfos.username) && <RemoveFriend currentUser={loggedInUser.username} unfollowUser={userInfos.username}/>}
        </Profile>
        <ListsReviews>
            <UserList userInfos={userInfos}/>
            <UserReview userReviews={userReviews} movies={movies}/>
        </ListsReviews>
    </ProfileSection>
}
const ProfileSection = styled.div`
    display:flex;
    flex-direction: row;
    margin: 2rem 0 2rem 4rem;
    gap: 2rem;
`
const ListsReviews = styled.div`
    margin-left: 24vw;
`
const Profile = styled.div`
    position: fixed;
    width: 19%;
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