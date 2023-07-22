import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ApplicationContextProvider } from "./context/ApplicationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApplicationContextProvider>
        <App />
      </ApplicationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
