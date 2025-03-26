"use client";

import { getUserEmail } from "@/utils/authRequest";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  user: User;
  openAddressDialog: boolean;
  setOpenAddressDialog: (openAddressDialog: boolean) => void;
  refetchUser: () => void;
};
const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const {
    data: user,
    refetch: refetchUser,
    isLoading,
  } = useQuery({
    queryKey: ["userEmail"],
    queryFn: () => getUserEmail(),
  });
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [router, user]);
  if (isLoading) {
    return <div>Loadoing...</div>;
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
