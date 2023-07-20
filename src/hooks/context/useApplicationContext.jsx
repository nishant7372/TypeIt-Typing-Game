import { useContext } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useApplicationContext() must be used inside an ApplicationContextProvider"
    );
  }

  return context;
};
