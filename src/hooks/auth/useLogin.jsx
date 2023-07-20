import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/config";
import { useAuthContext } from "../context/useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [isPending, setIsPending] = useState(false);

  const login = async (email, password) => {
    setIsPending(true);

    try {
      // User log in
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential) {
        return { error: "Unable to Login" };
      }

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: userCredential.user });

      return { ok: "Login Successful" };
    } catch (err) {
      return { error: err.message };
    } finally {
      setIsPending(false);
    }
  };

  return { login, isPending };
};
