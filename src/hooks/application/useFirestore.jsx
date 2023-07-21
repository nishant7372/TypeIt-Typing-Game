import { firestore } from "../../firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import { useApplicationContext } from "../context/useApplicationContext";
import { useMessageContext } from "../context/useMessageContext";

export const useFirestore = () => {
  const { dispatch: applicationDispatch } = useApplicationContext();
  const { dispatch: messageDispatch } = useMessageContext();

  //add a document
  const addDocument = async (collectionName, doc) => {
    try {
      const timestamp = serverTimestamp();
      await addDoc(collection(firestore, collectionName), {
        ...doc,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
      messageDispatch({ type: "SUCCESS", payload: "Application Added" });
      return { ok: true };
    } catch (err) {
      messageDispatch({ type: "ERROR", payload: err.message });
    }
  };

  // Update an existing document
  const updateDocument = async (collectionName, documentId, data) => {
    applicationDispatch({ type: "IS_UPDATE_PENDING", payload: true });
    try {
      const timestamp = serverTimestamp();
      const documentRef = doc(firestore, collectionName, documentId);
      await updateDoc(documentRef, { ...data, updatedAt: timestamp });
      messageDispatch({ type: "SUCCESS", payload: "Application Updated" });
      return { ok: true };
    } catch (err) {
      messageDispatch({ type: "ERROR", payload: err.message });
    } finally {
      applicationDispatch({ type: "IS_UPDATE_PENDING", payload: false });
    }
  };

  // delete an existing document
  const deleteDocument = async (collectionName, documentId) => {
    applicationDispatch({ type: "IS_DELETE_PENDING", payload: true });
    try {
      const documentRef = doc(firestore, collectionName, documentId);
      await deleteDoc(documentRef);
      messageDispatch({ type: "SUCCESS", payload: "Application Deleted" });
      return { ok: true };
    } catch (err) {
      messageDispatch({ type: "ERROR", payload: err.message });
    } finally {
      applicationDispatch({ type: "IS_DELETE_PENDING", payload: false });
    }
  };

  const getDocument = async (collectionName, documentId) => {
    applicationDispatch({ type: "IS_READ_PENDING", payload: true });
    try {
      const documentRef = doc(firestore, collectionName, documentId);
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        applicationDispatch({
          type: "EXISTING_APPLICATION",
          payload: documentSnapshot.data(),
        });
        return { ok: true };
      } else {
        messageDispatch({ type: "ERROR", payload: "Page Not Found" }); // show Not Found Page
      }
    } catch (error) {
      messageDispatch({ type: "ERROR", payload: err.message });
    } finally {
      applicationDispatch({ type: "IS_READ_PENDING", payload: false });
    }
  };

  return { addDocument, updateDocument, deleteDocument, getDocument };
};
