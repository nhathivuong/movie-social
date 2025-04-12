import { useContext } from "react"
import { AllReviewsContext } from "../../contexts/AllReviewsContext"
import { UserContext } from "../../contexts/UserContext"
const CommunityPage = () =>{
    const {allReviews} = useContext(AllReviewsContext)
    const {loggedInUser} = useContext(UserContext)

    const followingReview = allReviews.filter((review) => loggedInUser.follows.includes(review.username))
    return <p>building...</p>
}

export default CommunityPage