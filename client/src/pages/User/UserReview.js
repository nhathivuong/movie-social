import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// components
import SaveList from "../MoviePage/interactions/SaveList"
import WriteReview from "../MoviePage/interactions/WriteReview"

const UserReview = ({userReviews, movies}) =>{
    const [listVisible, setListVisible] = useState(false)
        const [reviewVisible, setReviewVisible] = useState(false)
    return <div>{userReviews && movies &&
        <ReviewElement>
            <h1>Reviews</h1>
            {userReviews.length > 0 
            ?userReviews.map((review, index) => {
                const movie = movies[index];
                return movie && (<ReviewBox key={review._id}>
                    <img src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}` 
                    : "/assets/no_poster.jpg"} alt={movie.title}  width={150} height={225}/>
                    <div>
                        <NavLink to={`/movie/${review.movieId}`}><h2>{movie.title}</h2></NavLink>
                        <p>Rating: {review.rating}</p>
                        <ReviewContent>{review.content}</ReviewContent>
                        <SaveReviewMovieSection>
                            <SaveList movieInfos={movie} movieId={movie.id} listVisible={listVisible} setListVisible={setListVisible} setReviewVisible={setReviewVisible}/>
                            <WriteReview movieId={movie.id} reviewVisible={reviewVisible} setListVisible={setListVisible} setReviewVisible={setReviewVisible} />
                        </SaveReviewMovieSection>
                    </div>
                </ReviewBox>)
            })
            :<p>no reviews</p>}
        </ReviewElement>}</div>
}
const ReviewElement = styled.div`
    width:fit-content;    
`
const ReviewBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2rem 0;
    margin-left: 0;
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 0 3px var(--color-light) inset, 0 0 10px var(--color-dark) inset;
    border-radius: 10px;
`
const ReviewContent = styled.p`
    margin-top: 0.5rem;
`
const SaveReviewMovieSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`
export default UserReview