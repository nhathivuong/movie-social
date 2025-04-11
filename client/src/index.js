import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from "./contexts/UserContext";
import AllUsersProvider from "./contexts/AllUsersContext";
import AllReviewsProvider from "./contexts/AllReviewsContext";
import {ModalProvider} from 'styled-react-modal'

ReactDOM.createRoot(document.getElementById("root")).render(
    <AllReviewsProvider>
        <AllUsersProvider>
            <UserProvider>
                <ModalProvider>
                    <App/>
                </ModalProvider>
            </UserProvider>
        </AllUsersProvider>
    </AllReviewsProvider>
);