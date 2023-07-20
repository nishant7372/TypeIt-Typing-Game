import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { ApplicationContextProvider } from "./context/ApplicationContext";
import { MessageContextProvider } from "./context/MessageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApplicationContextProvider>
        <MessageContextProvider>
          <App />
        </MessageContextProvider>
      </ApplicationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
