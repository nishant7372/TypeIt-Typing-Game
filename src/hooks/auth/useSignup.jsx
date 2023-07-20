import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useAuthContext } from "../context/useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [isPending, setIsPending] = useState(false);

  const signup = async (name, email, password) => {
    setIsPending(true);

    try {
      // User sign up with email and password
      const auth = getAuth(); // Obtain the Auth instance from the app

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential) {
        return { error: "Could not complete signup" };
      }

      // send verification mail
      sendEmailVerification(auth.currentUser);

      // Add display name to user
      await updateProfile(auth.currentUser, { displayName: name });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: userCredential.user });

      return { ok: "Account Created" };
    } catch (err) {
      return { error: err.message };
    } finally {
      setIsPending(false);
    }
  };

  return { signup, isPending };
};
