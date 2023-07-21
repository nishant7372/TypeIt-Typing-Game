import { useEffect } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { app, firestore } from "../../firebase/config";
import { useApplicationContext } from "../context/useApplicationContext";
import { useMessageContext } from "../context/useMessageContext";
import { useAuthContext } from "../context/useAuthContext";

export const useCollection = () => {
  const { dispatch: applicationDispatch } = useApplicationContext();
  const { dispatch: messageDispatch } = useMessageContext();
  const { user } = useAuthContext();

  useEffect(() => {
    let ref = query(
      collection(firestore, "PracticeResults"),
      where("uid", "==", user.uid)
    );
    applicationDispatch({ type: "IS_ALL_READ_PENDING", payload: true });
    const unsub = onSnapshot(
      ref,
      (querySnapshot) => {
        let results = [];
        querySnapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        applicationDispatch({
          type: "PRACTICE_RESULTS",
          payload: results,
        });
      },
      (error) => {
        messageDispatch({ type: "ERROR", payload: error.message });
      }
    );

    //unsubscribe on unmount
    return () => {
      unsub();
      applicationDispatch({ type: "IS_ALL_READ_PENDING", payload: false });
    };
  }, []);
};
