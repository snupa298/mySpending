import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: ["12.03.2017"],

};

export const TransactionContext = createContext(INITIAL_STATE);

const TransactionReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionReducer, INITIAL_STATE);

  return (
    <TransactionContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
