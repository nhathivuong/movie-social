import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import DOMPurify from 'dompurify'
//contexts
import { AllReviewsContext } from "../../contexts/AllReviewsContext"
import { UserContext } from "../../contexts/UserContext"
import { AllUsersContext } from "../../contexts/AllUsersContext"
// components
import SaveList from "../MoviePage/SaveList"
import WriteReview from "../MoviePage/WriteReview"

const Updates =() =>{
    const {loggedInUser} = useContext(UserContext)
    const {allReviews} = useContext(AllReviewsContext)
    const {allUsers} = useContext(AllUsersContext)
    const [sortedReviews, setSortedReviews] = useState()
    const [moviesInfos, setMovieInfos] = useState()

    const [listVisible, setListVisible] = useState(false)
    const [reviewVisible, setReviewVisible] = useState(false)
    useEffect(()=> {
        const getMovieInfoReview = async() =>{
            try{
                const followingReview = allReviews.filter((review) => loggedInUser.follows.includes(review.username))
                const sortedReviews = followingReview.sort((a,b) => new Date(b.createdAt)- new Date(a.createdAt))
                setSortedReviews(sortedReviews)
                const movieRequest = sortedReviews.map(async(review) => {
                    const res = await fetch(`https://movie-social.onrender.com/api/movie/${review.movieId}`);
                    const data = await res.json();
                    return data.movieDetails;
                    })
                const movieInfos = await Promise.all(movieRequest)
                setMovieInfos(movieInfos)
            }
            catch(error){
                console.error(error.message)
            }
        }
        
        if (allReviews && loggedInUser) {
            getMovieInfoReview()
        }
    },[allReviews, loggedInUser])

    const formatDate = (reviewDate) => {
        const date = new Date(reviewDate)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
    return <div>
            <h2>Updates</h2>
            {sortedReviews && moviesInfos && allUsers
            ? sortedReviews.map((review, index) => 
                {const reviewUserInfos = allUsers.find((user)=> user.username === review.username)
                const movie = moviesInfos[index];
                return  <ReviewBox key={review._id}>
                    <ReviewSection>
                        <ProfilePicture src={reviewUserInfos.src} alt={`${review.username} profile picture`} />
                        <TopSection>
                            <TopLine>
                                <UserAndRating>
                                    <NavLink to={`/user/${review.username}`}><Username>{review.username}</Username></NavLink>
                                    {review.rating && <p>rated a movie {review.rating} out of 10</p>}
                                </UserAndRating>
                                <p>posted on {formatDate(review.createdAt)}</p>
                            </TopLine>
                            <ReviewText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.content) }}/>
                        </TopSection>
                    </ReviewSection>
                    <MovieSection>
                        <img src={movie.poster_path 
                            ? `https://image.tmdb.org/t/p/original${movie.poster_path}` 
                            : "/assets/no_poster.jpg"} alt={movie.title}  width={150}/>
                        <MovieInfo>
                            <NavLink to={`/movie/${movie.id}`}><h2>{movie.title}</h2></NavLink>
                            <MovieOverview>{movie.overview}</MovieOverview>
                            <SaveList movieInfos={movie} movieId={movie.id} listVisible={listVisible} setListVisible={setListVisible} setReviewVisible={setReviewVisible}/>
                            <WriteReview movieId={movie.id} reviewVisible={reviewVisible} setListVisible={setListVisible} setReviewVisible={setReviewVisible} />
                        </MovieInfo>
                    </MovieSection>
                </ReviewBox>})
            : <p>Follow another user to see their latest reviews</p>}
            </div>
}
const ReviewBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vw;
    margin: 2rem 1rem;
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 0 3px var(--color-light) inset, 0 0 10px var(--color-dark) inset;
    border-radius: 10px;
`
const ReviewSection = styled.div`
    display:flex;
    flex-direction: row;
`
const ProfilePicture = styled.img`
    width:70px; 
    height:70px;
    border-radius: 50%;
    object-fit: cover;
    box-sizing: border-box;
    margin-right: 1rem;
`
const TopSection = styled.div`
    width: 100%;
`
const TopLine = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:space-between;
`
const UserAndRating = styled.div`
    display:flex;
    flex-direction: row;
    align-items: baseline;
`
const Username = styled.h2`
    font-size: 1.5rem;
    margin-right: 0.5rem;
`
const ReviewText = styled.p`
    margin-top: 1rem;
`
const MovieSection = styled(ReviewSection)`
    width: 90%;
    align-self: end;
    padding: 0.5rem;
    border: 1px solid var(--color-light);
    box-shadow: 0 0 3px var(--color-light) inset, 1px 1px 3px var(--color-dark);
    border-radius: 5px;
`
const MovieInfo = styled.div`
    margin-left: 1rem;
`
const MovieOverview = styled.p`
    margin:0.5rem 0;
`
export default Updates