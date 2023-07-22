import "./App.css";
import Application from "./pages/application/Application";
import LogIn from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import NavBar from "./components/navigationbar/navbar";
import Verify from "./pages/verify/Verify";
import Home from "./pages/home/Home";
import MultiPlayer from "./pages/mutliPlayer/MultiPlayer";
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
                  <Home />
                ) : (
                  <Verify />
                )
              }
            />
            <Route
              path="/login"
              element={!user ? <LogIn /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/singlePlayer/practice"
              element={!user ? <Navigate to="/login" /> : <Application />}
            />
            <Route
              path="/multiPlayer/match"
              element={!user ? <Navigate to="/login" /> : <MultiPlayer />}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}
