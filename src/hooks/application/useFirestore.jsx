import { firestore } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useApplicationContext } from "../context/useApplicationContext";

export const useFirestore = () => {
  const { dispatch: applicationDispatch } = useApplicationContext();
  //add a document
  const addDocument = async (collectionName, doc) => {
    try {
      const timestamp = serverTimestamp();
      await addDoc(collection(firestore, collectionName), {
        ...doc,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
      return { ok: true };
    } catch (err) {
      return { error: err.message };
    }
  };

  return { addDocument };
};
