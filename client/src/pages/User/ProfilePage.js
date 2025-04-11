//dependencies 
import { createRef, useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom";
//context
import { UserContext } from "../../contexts/UserContext"
import { AllReviewsContext } from "../../contexts/AllReviewsContext";
//icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

//component
import MoviePoster from "../MoviePoster";
import AddFriend from "./AddFriend";
import RemoveFriend from "./RemoveFriend";

const ProfilePage = () =>{
    const { loggedInUser} = useContext(UserContext)
    const {allReviews} = useContext(AllReviewsContext)
    const {username} = useParams()
    const [userInfos, setUserInfos] = useState()
    const [movies, setMovies] = useState()
    const [userReviews, setUserReviews] = useState()
    const movieScrollRefs = useRef({})

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
    
    const arrowRightClick = (ref) => {
        ref.current.style.scrollBehavior = "smooth";
        ref.current.scrollLeft += 495;
    }
    const arrowLeftClick = (ref) => {
        ref.current.style.scrollBehavior = "smooth";
        ref.current.scrollLeft -= 495;
    }
    
    return <ProfileSection>
        <Profile>
            <Picture src={userInfos.src} alt={`${userInfos.name}'s profile picture`}/>
            <NameAlign>
                <h2>{userInfos.name}</h2>
                <p>@{userInfos.username}</p>
            </NameAlign>
            <BioText>Creative thinker fueled by coffee and late-night ideas. I build things on the web, sketch on napkins, and chase inspiration like it’s going out of style. Always learning, always curious. Let's make something awesome. ✨</BioText>
            {loggedInUser && userInfos.name !== loggedInUser.name && !loggedInUser.friends.includes(userInfos.name) && <AddFriend name={userInfos.username} newFriend={loggedInUser.username}/>}
            {loggedInUser && userInfos.name !== loggedInUser.name && loggedInUser.friends.includes(userInfos.name) && <RemoveFriend name={userInfos.username} exFriend={loggedInUser.username}/>}
        </Profile>
        <ListsReviews>
            <div>
                <h1>Lists</h1>
                {userInfos.lists.map(list=> {
                    if (!movieScrollRefs.current[list.name]) {
                        movieScrollRefs.current[list.name] = createRef;
                    }
                    const movieScrollRef = movieScrollRefs.current[list.name];
                    return<div key={list.name}>
                    <ListName>{list.name}</ListName>
                    <MoviesWrapper>
                        {list.movies.length > 6 
                        ?<><Arrows onClick={() => arrowLeftClick(movieScrollRef)}><LeftArrow/></Arrows>
                        <MovieScroll ref={movieScrollRef}>
                        {list.movies.map((movie) =>{
                            return <MoviePoster key={movie.id} movie={movie}/>
                        })}
                        </MovieScroll>
                        <Arrows onClick={() => arrowRightClick(movieScrollRef)}><RightArrow/></Arrows></>
                        :<MovieList>
                        {list.movies.map((movie) =>{
                            return <MoviePoster key={movie.id} movie={movie}/>
                        })}
                        </MovieList>}
                    </MoviesWrapper>
                </div>
                })}
            </div>
            {userReviews && movies &&
            <div>
                <h1>Reviews</h1>
                {userReviews.map((review, index) => {
                    const movie = movies[index];
                    return movie && (<ReviewBox key={review._id}>
                        <img src={movie.poster_path 
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}` 
                        : "/assets/no_poster.jpg"} alt={movie.title}  width={150}/>
                        <div>
                            <h2>{movie.title}</h2>
                            <p>Rating: {review.rating}</p>
                            <p>{review.content}</p>
                        </div>
                    </ReviewBox>)
                })}
            </div>}
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
const ListName = styled.h2`
    margin: 1rem 0 0.3rem 0;
`
const MoviesWrapper = styled.div`
    display:flex;
    flex-direction:row;
`
const MovieScroll = styled.div`
    display: flex;
    flex-direction:row;
    font-size: 1rem;
    width: 60vw;
    overflow-x: scroll;
    gap: 15px;
    &::-webkit-scrollbar{
        display: none;
    }
`
const MovieList = styled.div`
    display: flex;
    flex-direction:row;
    font-size: 1rem;
    width: 60vw;
    gap: 15px;
`
const Arrows = styled.button`
    padding: 5px 8px;
    cursor: pointer;
    height: 150px;
    background:none;
    margin:35px 1rem;
    color: var(--color-light);
    border:none;
    border-radius: 5px;
    &:hover{
        background-color: var(--color-accent);
        box-shadow: 1px 1px 2px white inset, -2px -2px 2px var(--color-dark-accent) inset;
    }
    &:active{
        background: transparent;
        outline: 2px solid var(--color-accent);
    }
`
const LeftArrow = styled(IoIosArrowBack)`
    font-size: 2rem;
`
const RightArrow = styled(IoIosArrowForward)`
    font-size: 2rem;
`
const ReviewBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2rem;
    margin-left: 0;
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 0 3px var(--color-light) inset, 0 0 10px var(--color-dark) inset;
    border-radius: 10px;
`
export default ProfilePage