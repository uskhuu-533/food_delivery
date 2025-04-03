"use client";

import { changeRole, getUsers } from "@/utils/authRequest";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, useQueryState } from "nuqs";
import { createContext, ReactNode, useContext, useState } from "react";
import { Order } from "./OrderProvider";
import { toast } from "sonner";
import { useLoading } from "./LoaderProvider";
import { CheckCheckIcon } from "lucide-react";

export type User = {
  email: string;
  address: string;
  role: string;
  phoneNumber: string;
  isVerrified: boolean;
  createdAt: Date;
  _id: string;
  orderedFood: Order[];
};
type Response = {
  users: User[];
  totalPages: number;
  totalResults: number;
};

type UsersContextType = {
  data: Response;
  refetchUser: () => void;
  setSearhEmailValue: (searchEmailValue: string) => void;
  searchEmailValue: string;
  editUser : (role: string, userId: string) => Promise<void>
};

const UsersContext = createContext<UsersContextType | null>(null);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const {setLoading} = useLoading()
  const [searchEmailValue, setSearhEmailValue] = useState<string>("");
  const [page] = useQueryState("pages", parseAsInteger.withDefault(1));
  const {
    data: data = { totalPages: 0, totalResults: 0, users: [] },
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page, searchEmailValue),
    staleTime: 1000 * 60 * 5,
  });
  const editUser = async (role : string, userId : string) => {
    setLoading(true)
    await changeRole(role, userId)
    await refetchUser()
    setLoading(false)
    toast(<div className="flex items-center gap-4"><p>saved</p> <CheckCheckIcon stroke="green"/></div>)
  }

  return (
    <UsersContext.Provider
      value={{ data, searchEmailValue, refetchUser, setSearhEmailValue , editUser}}
    >
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
