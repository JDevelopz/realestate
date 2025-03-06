"use client";

import { createContext, useContext, useState } from "react";

// Create the context with a default value
export const AppContext = createContext({
  state: {},
  setState: () => {},
});

// Create a provider wrapper component
export function AppProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    savedProperties: [],
    theme: "light",
  });

  const value = {
    state,
    setState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the app context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
