import { createContext, useReducer } from "react";

const ApplicationContext = createContext();

const initialState = {
  practiceResults: [],
  isAllReadPending: false,
};

const applicationReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "PRACTICE_RESULTS":
      return {
        ...state,
        practiceResults: payload,
      };
    case "IS_ALL_READ_PENDING":
      return { ...state, isAllReadPending: payload };
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
