import { useEffect, useState } from "react"
import styled from "styled-components"
import MoviePoster from "../MoviePoster"

const Recommendations = ({movieRecommendation}) =>{
    const [recommendations, setRecommendations] = useState()

    useEffect(()=>{
        //randomise 8 recommendations
        if(movieRecommendation){
            setRecommendations([...movieRecommendation].sort(() => Math.random() - 0.5).slice(0, 8))
        }
    }, [])

    return(
    <div>
        <h2>Recommendations</h2>
        {recommendations && recommendations.length > 0  
        ?<RecGrid>{recommendations.map((movie) => {
            return <MoviePoster key={movie.id} movie={movie}/>
        })}</RecGrid>
        :<p>no recommendations</p>}
    </div>
    ) 
}

const RecGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 155px);
    gap: 15px;
    height:fit-content;
    width: fit-content;
    margin: 1rem auto;
    justify-content: center;
`
export default Recommendations