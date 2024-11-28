import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>

  // </React.StrictMode>
);
