import { createContext, useEffect, useReducer } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

const initialState = {
  user: null,
  authIsReady: false,
  isAccountVerified: false,
};

const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload };
    case "LOGOUT":
      return { ...state, user: null, isAccountVerified: false };
    case "AUTH_IS_READY":
      return { ...state, user: payload, authIsReady: true };
    case "EMAIL_VERIFIED":
      return { ...state, isAccountVerified: true };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        dispatch({ type: "EMAIL_VERIFIED" });
      }
      dispatch({ type: "AUTH_IS_READY", payload: user });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
