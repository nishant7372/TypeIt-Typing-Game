import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useAuthContext } from "../context/useAuthContext";

export const useGoogleSignIn = () => {
  const { dispatch } = useAuthContext();
  const [isPending, setIsPending] = useState(false);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    setIsPending(true);

    try {
      // User log in
      const result = await signInWithPopup(auth, provider);

      if (!result) {
        return { error: "Unable to Login" };
      }

      const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: result.user });

      return { ok: "Login Successful" };
    } catch (err) {
      return { error: err.message };
    } finally {
      setIsPending(false);
    }
  };

  return { googleSignIn, isPending };
};
