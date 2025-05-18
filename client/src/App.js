import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./pages/User/SignUp"
import Header from "./Header"
import LogIn from "./pages/User/LogIn"
import Home from "./pages/Home"
import ProfilePage from "./pages/User/ProfilePage"
import BrowseMovies from "./pages/Search"
import MoviePage from "./pages/MoviePage"
import CommunityPage from "./pages/Community"
import SplashScreen from "./SplashScreen"
import { useContext } from "react";
import { AllReviewsContext } from "./contexts/AllReviewsContext";
import styled from "styled-components"
import Blog from "./pages/Blog"
import Footer from "./Footer"

const App = () => {
    const {allReviews} = useContext(AllReviewsContext)
    return <>
    {!Array.isArray(allReviews)
    ? <SplashScreen/>
    :<Router>
        <Header />
        <Main>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/browse" element={<BrowseMovies/>}/>
            <Route path="/movie/:movieId" element={<MoviePage/>}/>
            <Route path="/user/:username" element={<ProfilePage/>}/>
            <Route path="/community" element={<CommunityPage/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </Main>
        <Footer/>
    </Router>}
    </>
}
const Main = styled.main`
margin-top: 75px;
margin-bottom: 2rem;
min-height: 66vh;
`
export default App