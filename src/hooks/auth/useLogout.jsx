import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuthContext } from "../context/useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    setIsPending(true);

    try {
      //user sign out
      const auth = getAuth();
      await signOut(auth);

      //dispatch logout action
      dispatch({ type: "LOGOUT" });

      return { ok: "Logout Successful" };
    } catch (err) {
      return { error: err.message };
    } finally {
      setIsPending(false);
    }
  };

  return { logout, isPending };
};
