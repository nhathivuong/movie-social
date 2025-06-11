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
import EditProfile from "./EditProfile";
import SplashScreen from "../../utilities/SplashScreen";
import BackToTop from "../../utilities/BackToTop";

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
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${username}`)
                const data = await response.json()
                if(data.status === 200){
                    setUserInfos(data.user)
                }

                const userReviews = allReviews.filter(review => review.username === username)
                setUserReviews(userReviews)
                const movieRequest = userReviews.map(review => 
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/movie/${review.movieId}`)
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
    },[allReviews, username])
    
    if(!allReviews ||!userInfos){
        return <SplashScreen/>
    }

    return <>
    <BackToTop/>
    <ProfileSection>
        <Profile>
            <Picture src={userInfos.src} alt={`${userInfos.name}'s profile picture`}/>
            <EditProfile userInfos={userInfos} username={username}/>
            <NameAlign>
                <AccountName>{userInfos.name}</AccountName>
                <p>@{userInfos.username}</p>
                <PronounsCapitalize>{userInfos.pronouns}</PronounsCapitalize>
            </NameAlign>
            <BioText>{userInfos.bio}</BioText>
            {loggedInUser && userInfos.username !== loggedInUser.username && !loggedInUser.follows.includes(userInfos.username) && <AddFriend currentUser={loggedInUser.username} followUser={userInfos.username}/>}
            {loggedInUser && userInfos.username !== loggedInUser.username && loggedInUser.follows.includes(userInfos.username) && <RemoveFriend currentUser={loggedInUser.username} unfollowUser={userInfos.username}/>}
        </Profile>
        <ListsReviews>
            
            <UserReview userReviews={userReviews} movies={movies}/>
        </ListsReviews>
    </ProfileSection>
    </>
}
const ProfileSection = styled.div`
    max-width: 85%;
    display: grid;
    grid-template-columns: 3fr 6fr;
    gap: 10rem;
    margin: 2rem auto;
    padding: 2rem;
    line-height: 1.5;
`
const ListsReviews = styled.div`
    display:flex;
    flex-direction:column;
`
const Profile = styled.div`
    height: fit-content;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:start;
`
const Picture = styled.img`
    width: 100%;
    border-radius:10px;
`
const AccountName = styled.h2`
    margin-top: 0.5rem;
`
const NameAlign = styled.div`
    display:flex;
    flex-direction:column;
    align-items:baseline;
    text-shadow: 0 1px 1px var(--color-dark);
`
const PronounsCapitalize = styled.p`
    text-transform:capitalize;
`
const BioText = styled.p`
    margin-top: 0.7rem;
`
export default ProfilePage