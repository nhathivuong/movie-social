import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import Header from "./Header"
import LogIn from "./pages/LogIn"
const App = () => {
    return <Router>
        <Header />
        <Routes>
            <Route path="/" />
            <Route path="/logIn" element={<LogIn/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Router>
}

export default App