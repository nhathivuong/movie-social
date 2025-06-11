//dependencies
import styled from "styled-components"

// components
import ToWatchList from "./ToWatchList"
import Updates from "./Updates"
import BackToTop from "../../utilities/BackToTop"

const CommunityPage = () =>{

    return (
    <>
        <BackToTop/>
        <CommunityLayout>
            <ToWatchList/>
            <Updates/>
        </CommunityLayout>
    </>)
}
const CommunityLayout = styled.div`
    max-width: 85%;
    display: grid;
    grid-template-columns: 3fr 6fr;
    gap: 10rem;
    margin: 2rem auto;
    padding: 2rem;
    line-height: 1.5;
`
export default CommunityPage