import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from "./contexts/UserContext";
import AllUsersProvider from "./contexts/AllUsersContext";
import AllReviewsProvider from "./contexts/AllReviewsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AllReviewsProvider>
        <AllUsersProvider>
            <UserProvider>
                <App/>
            </UserProvider>
        </AllUsersProvider>
    </AllReviewsProvider>
);