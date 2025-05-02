import { useContext} from "react"
import styled from "styled-components"
//context
import { UserContext } from "../../contexts/UserContext"
// components
import ToWatchList from "./ToWatchList"
import Updates from "./Updates"
import SplashScreen from "../../SplashScreen"

const CommunityPage = () =>{
    const {loggedInUser} = useContext(UserContext)

    if(!loggedInUser){
        return <SplashScreen/>
    }
    
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