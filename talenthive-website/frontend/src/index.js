import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserProvider>
        <CurrentUserProvider>
            <App />
            <ToastContainer 
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </CurrentUserProvider>
    </UserProvider>
);
