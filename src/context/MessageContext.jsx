import { createContext, useReducer } from "react";

const MessageContext = createContext();

const initialState = {
  error: null,
  success: null,
};

const MessageReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ERROR":
      return { ...state, error: payload };
    case "SUCCESS":
      return { ...state, success: payload };
    case "RESET":
      return { ...state, error: null, success: null };
    default:
      return state;
  }
};

const MessageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MessageReducer, initialState);

  return (
    <MessageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContextProvider, MessageContext };
