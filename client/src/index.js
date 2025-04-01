import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from "./contexts/UserContext";
import AllUsersProvider from "./contexts/AllUsersContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AllUsersProvider>
        <UserProvider>
            <App/>
        </UserProvider>
    </AllUsersProvider>
);