//dependencies
import styled from "styled-components"

// components
import ToWatchList from "./ToWatchList"
import Updates from "./Updates"

const CommunityPage = () =>{

    return (
    <Community>
        <ToWatchList/>
        <Updates/>
    </Community>)
}
const Community = styled.div`
    margin: 6rem 0 1rem 0;
    display:flex;
    flex-direction: row;
`
export default CommunityPage