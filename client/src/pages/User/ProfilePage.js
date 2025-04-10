//dependencies 
import { useContext, useRef } from "react"
import styled from "styled-components"
//context
import { UserContext } from "../../contexts/UserContext"
import { AllReviewsContext } from "../../contexts/AllReviewsContext";
//icons
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

//component
import MoviePoster from "../MoviePoster";

const ProfilePage = () =>{
    const { loggedInUser } = useContext(UserContext)
    const {allReviews} = useContext(AllReviewsContext)
    const movieScrollRefs = useRef({})

    if(!loggedInUser ||!allReviews ){
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
    const userReviews = allReviews.filter(review => review.username === loggedInUser.username)
    
    return <ProfileSection>
        <Profile key={loggedInUser.username}>
            <Picture src={loggedInUser.src} alt={`${loggedInUser.name}'s profile picture`}/>
            <NameAlign>
                <h2>{loggedInUser.name}</h2>
                <p>@{loggedInUser.username}</p>
            </NameAlign>
            <BioText>Creative thinker fueled by coffee and late-night ideas. I build things on the web, sketch on napkins, and chase inspiration like it’s going out of style. Always learning, always curious. Let's make something awesome. ✨</BioText>
            <form>
                <FollowButton>follow</FollowButton>
            </form>
        </Profile>
        <ListsReviews>
            <div>
                <h1>Lists</h1>
                {loggedInUser.lists.map(list=> {
                    const movieScrollRef = useRef(null);
                    movieScrollRefs.current[list.name] = movieScrollRef;
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
            {userReviews
            &&<div>
                <h1>Reviews</h1>
                {userReviews.map(review => {
                    return <ReviewBox key={review._id}>
                        <img src="/assets/no_poster.jpg" width={150}/>
                        <div>
                            <h2>Movie Name</h2>
                            <p>Rating: {review.rating}</p>
                            <p>{review.content}</p>
                        </div>
                    </ReviewBox>
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