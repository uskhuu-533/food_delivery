"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/provider/User-Provider";
import { useRouter } from "next/navigation";
import SearchUser from "../_components/SearchUser";

const SettingsHeader = () => {
    const router = useRouter()
  const { user } = useUser();
  const signOut = () => {
    localStorage.removeItem("token")
    router.push('/login')
  }
  return (
    <div className="sticky top-0 h-fit py-10 flex items-center pr-8 z-10 w-full bg-[#F4F4F5] flex-col">
      <div className="w-full h-[100px] flex bg-white p-5 justify-between">
        <div className="flex gap-2">
          <div className="h-9 w-9 rounded-full bg-green-400 "></div>
          {user?.email}
        </div>
        <Button onClick={signOut} className="bg-red-400">Sign out</Button>
      </div>
      <SearchUser />
    </div>
  );
};
export default SettingsHeader;
