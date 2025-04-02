"use client";

import LoaderAuth from "@/components/LoaderAuth";
import { getUserEmail } from "@/utils/authRequest";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  email: string;
  address: string;
  role: string;
};
type UserContextType = {
  user: User | null;
  openAddressDialog: boolean;
  setOpenAddressDialog: (openAddressDialog: boolean) => void;
  refetchUser: () => void;
};
const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const path = usePathname()
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const {
    data: user = null,
    refetch: refetchUser,
    isLoading,
  } = useQuery({
    queryKey: ["userEmail"],
    queryFn: () => getUserEmail(),
  });
  useEffect(()=>{
    if (isLoading) return 
    console.log(user);
    if (!user) {
      if (path === "/sign-up") return
      router.push('/login')
     }else{
      if (path === "/order" || path === "/settings") return
      router.push('/')
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isLoading])


  if (isLoading) {
    return <LoaderAuth />;
  }
  return (
    <UserContext.Provider
      value={{ user, refetchUser, setOpenAddressDialog, openAddressDialog }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
