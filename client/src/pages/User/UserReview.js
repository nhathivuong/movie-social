import styled from "styled-components";

const UserReview = ({userReviews, movies}) =>{
    return <>{userReviews && movies &&
        <div>
            <h1>Reviews</h1>
            {userReviews.length > 0 
            ?userReviews.map((review, index) => {
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
            })
            :<p>no reviews</p>}
        </div>}</>
}
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
export default UserReview