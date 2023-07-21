import "./App.css";
import Application from "./pages/application/Application";
import LogIn from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import NavBar from "./components/navigationbar/navbar";
import Verify from "./pages/verify/Verify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/context/useAuthContext";

export default function App() {
  const { user, authIsReady, isAccountVerified } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : isAccountVerified ? (
                  <Application />
                ) : (
                  <Verify />
                )
              }
            />
            <Route
              path="/login"
              element={
                !user ? (
                  <LogIn />
                ) : isAccountVerified ? (
                  <Application />
                ) : (
                  <Verify />
                )
              }
            />
            <Route
              path="/signup"
              element={
                !user ? (
                  <SignUp />
                ) : isAccountVerified ? (
                  <Application />
                ) : (
                  <Verify />
                )
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}
