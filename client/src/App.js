import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./pages/User/SignUp"
import Header from "./Header"
import LogIn from "./pages/User/LogIn"
import Home from "./pages/Home"
import ProfilePage from "./pages/User/ProfilePage"
import BrowseMovies from "./pages/Search"
import MoviePage from "./pages/MoviePage"
const App = () => {
    return <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/browse" element={<BrowseMovies/>}/>
            <Route path="/movie/:movieId" element={<MoviePage/>}/>
            <Route path="/user/:username" element={<ProfilePage/>}/>
            <Route path="/logIn" element={<LogIn/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
}

export default App