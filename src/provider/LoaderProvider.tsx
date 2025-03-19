'use client'

import { createContext, useState, useContext, ReactNode } from "react";

type LoadingContexType = {
    loading : boolean,
    setLoading : (loading : boolean) => void
}
const LoadingContext = createContext<LoadingContexType | undefined>(undefined);

export const LoadingProvider = ({ children }:{children : ReactNode}) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);