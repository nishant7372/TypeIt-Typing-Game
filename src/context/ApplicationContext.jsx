import { createContext, useReducer } from "react";
import { useDefaultContent } from "../hooks/utils/useDefaultContent";
import { useFormatDate } from "../hooks/utils/useFormatDate";

const ApplicationContext = createContext();

const { applicationContent } = useDefaultContent();
const { formatAsDateAndTime } = useFormatDate();

const initialState = {
  applications: null,
  applicationCount: 0,
  currPageNo: 0,
  isAllReadPending: false,
  isReadPending: false,
  isAddPending: false,
  isUpdatePending: false,
  isDeletePending: false,
  newApplication: {
    properties: {
      companyName: "",
      companyPackage: "",
      appliedThrough: "",
      appliedRole: "",
      appliedOn: formatAsDateAndTime(new Date()),
      resumeLink: "",
      jobDescriptionLink: "",
      email: "",
      password: "",
      content: applicationContent,
    },
    rounds: [],
  },
  existingApplication: null,
};

const applicationReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "APPLICATIONS":
      return {
        ...state,
        applications: payload,
      };
    case "NEW_APPLICATION":
      return {
        ...state,
        newApplication: payload,
      };
    case "NEW_APPLICATION_RESET":
      return {
        ...state,
        newApplication: initialState.newApplication,
      };
    case "EXISTING_APPLICATION":
      return {
        ...state,
        existingApplication: payload,
      };
    case "EXISTING_APPLICATION_RESET":
      return {
        ...state,
        existingApplication: null,
      };
    case "APPLICATIONS_COUNT":
      return { ...state, applicationCount: payload };
    case "IS_ADD_PENDING":
      return { ...state, isAddPending: payload };
    case "IS_READ_PENDING":
      return { ...state, isReadPending: payload };
    case "IS_UPDATE_PENDING":
      return { ...state, isUpdatePending: payload };
    case "IS_DELETE_PENDING":
      return { ...state, isDeletePending: payload };
    case "IS_ALL_READ_PENDING":
      return { ...state, isAllReadPending: payload };
    case "PAGE_CHANGED":
      return { ...state, currPageNo: payload };
    default:
      return state;
  }
};

const ApplicationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);

  return (
    <ApplicationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContextProvider, ApplicationContext };
