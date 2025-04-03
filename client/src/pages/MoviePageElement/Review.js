const Reviews = ({movieReviews}) => {
    return (
        <div>
            <h2>Reviews</h2>
            {movieReviews.length > 0 
            ?<div>{movieReviews.map((review) => {
                return <div key={review.id}>
                    <img src={review.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}` 
                    : "/assets/default_picture.svg"} 
                    alt={`${review.author_details.username} profile picture`} width={100}/>
                    <h3>{review.author_details.username}</h3>
                    <p>{review.author_details.rating}</p>
                    <p>{review.content}</p>
                </div>
            })}</div>
            :<p>No Reviews</p>}
        </div>
    )
}

export default Reviews