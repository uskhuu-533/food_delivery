"use client";


import { getUsers } from "@/utils/authRequest";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import {
  createContext,
  ReactNode,
  useContext,
} from "react";
import { Order } from "./OrderProvider";


export type User = {
    email : string
    address : string
    role: string;
    phoneNumber : string
    isVerrified : boolean
    createdAt : Date
    _id : string
    orderedFood : Order[]
  }
  type Response = {
    users : User[],
    totalPages : number
    totalResults : number
  }

type UsersContextType = {
  data: Response
  refetchUser: () => void;
};

const UsersContext = createContext<UsersContextType | null>(null);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
    const [page] = useQueryState('pages', parseAsInteger.withDefault(1))
  const { data: data = {totalPages:0, totalResults:0, users:[]}, refetch : refetchUser } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
    staleTime: 1000 * 60 * 5,
  });
  
  return (
    <UsersContext.Provider value={{ data, refetchUser}}>
      {children}
    </UsersContext.Provider>
  );
};
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
