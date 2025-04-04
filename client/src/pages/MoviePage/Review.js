import styled from "styled-components"

const Reviews = ({movieReviews}) => {
    return (
        <div>
            <h2>Reviews</h2>
            {movieReviews.length > 0 
            ?<div>{movieReviews.map((review) => {
                return <ReviewBox key={review.id}>
                    <div>
                        <ProfilePicture src={review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}` 
                        : "/assets/default_picture.svg"} 
                        alt={`${review.author_details.username} profile picture`} />
                        {review.author_details.rating && <p>rating: {review.author_details.rating}</p>}
                    </div>
                    <div>
                        <Username>{review.author_details.username}</Username>
                        <ReviewText >{review.content}</ReviewText>
                    </div>
                </ReviewBox>
            })}</div>
            :<p>No Reviews</p>}
        </div>
    )
}
const ReviewBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2rem 0;
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 0 3px var(--color-light) inset, 0 0 10px var(--color-dark) inset;
    border-radius: 10px;
`
const ProfilePicture = styled.img`
    width:70px; 
    height:70px;
    border-radius: 50%;
    object-fit: cover;
    box-sizing: border-box;
`
const Username = styled.h2`
    font-size: 1.5rem;
`
const ReviewText = styled.p`
    margin-top: 1rem;
`
export default Reviews