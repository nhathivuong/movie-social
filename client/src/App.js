import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./pages/NavBar/SignUp"
import Header from "./Header"
import LogIn from "./pages/NavBar/LogIn"
import Home from "./pages/Home"
import ProfilePage from "./pages/NavBar/ProfilePage"
import BrowseMovies from "./pages/BrowseMovies"

const App = () => {
    return <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/browse" element={<BrowseMovies/>}/>
            <Route path="/user/:username" element={<ProfilePage/>}/>
            <Route path="/logIn" element={<LogIn/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
}

export default App