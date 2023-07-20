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

const filterByApplication = (arr, application) => {
  const currentDate = new Date();
  const queryDate = new Date();
  if (application === "Last 7 days") {
    queryDate.setDate(currentDate.getDate() - 7);
  }
  if (application === "Last 30 days") {
    queryDate.setDate(currentDate.getDate() - 30);
  }
  return arr.filter((x) => new Date(x.properties.appliedOn) >= queryDate);
};

const filterByStatus = (arr, status) => {
  return arr.filter((x) => x.properties.status === status);
};

const filterByApplied = (arr, applied) => {
  return arr.filter((x) => x.properties.appliedThrough === applied);
};

const filterByPackage = (arr, companyPackage) => {
  if (companyPackage === ">=30LPA") {
    return arr.filter((x) => x.properties.companyPackage >= 30);
  }
  if (companyPackage === ">=20LPA & <30LPA") {
    return arr.filter(
      (x) =>
        x.properties.companyPackage >= 20 && x.properties.companyPackage < 30
    );
  }
  if (companyPackage === ">=10LPA & <20LPA") {
    return arr.filter(
      (x) =>
        x.properties.companyPackage >= 10 && x.properties.companyPackage < 20
    );
  }
  if (companyPackage === "<10LPA") {
    return arr.filter((x) => x.properties.companyPackage < 10);
  }
};

const filterBySearchTerm = (arr, searchTerm) => {
  return arr.filter(
    (x) =>
      x.properties.companyName
        .toLowerCase()
        .indexOf(searchTerm.toLowerCase()) >= 0
  );
};

// const getNotifications = (arr) => {
//   arr = arr.filter(({ rounds }) => rounds.length > 0);
//   arr.map({ rounds });
// };

const addStatus = (arr) => {
  return arr.map((x) => {
    const { properties, rounds } = x;
    properties.status =
      rounds.length === 0 ? "Pending" : rounds[rounds.length - 1].status;
    return x;
  });
};

export const useCollection = (queries) => {
  const { dispatch: applicationDispatch, currPageNo } = useApplicationContext();
  const { dispatch: messageDispatch } = useMessageContext();

  useEffect(() => {
    let ref = collection(firestore, "applications");
    applicationDispatch({ type: "IS_ALL_READ_PENDING", payload: true });

    const unsub = onSnapshot(
      ref,
      (querySnapshot) => {
        let results = [];
        querySnapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        results = addStatus(results);

        if (queries.application) {
          results = filterByApplication(results, queries.application);
        }

        if (queries.applied) {
          results = filterByApplied(results, queries.applied);
        }

        if (queries.status) {
          results = filterByStatus(results, queries.status);
        }

        if (queries.companyPackage) {
          results = filterByPackage(results, queries.companyPackage);
        }

        if (queries.searchTerm) {
          results = filterBySearchTerm(results, queries.searchTerm);
        }

        results.sort(
          (a, b) =>
            new Date(b.properties.appliedOn) - new Date(a.properties.appliedOn)
        );

        // getNotifications(results);

        applicationDispatch({
          type: "APPLICATIONS_COUNT",
          payload: results.length,
        });

        applicationDispatch({
          type: "APPLICATIONS",
          payload: results.slice(currPageNo * 10, (currPageNo + 1) * 10),
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
  }, [
    currPageNo,
    queries.application,
    queries.applied,
    queries.companyPackage,
    queries.status,
    queries.searchTerm,
  ]);
};
