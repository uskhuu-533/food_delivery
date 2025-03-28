"use client";
import { useTheme } from "next-themes";
import LogoCont from "./Logo-Cont";
import MenuContAdmin from "./MenuContAdmin";
import { Button } from "./ui/button";

const SideBar = () => {
  
  const { theme, setTheme } = useTheme();
  return (
    <div className="h-screen sticky top-0 bg-white w-[205px] py-9 px-5 flex flex-col gap-10">
      <LogoCont />
      <MenuContAdmin />
      {theme === "dark" ? (
        <Button
          className="bg-white rounded-full"
          onClick={() => setTheme("light")}
        ></Button>
      ) : (
        <Button
          className="bg-black rounded-full"
          onClick={() => setTheme("dark")}
        ></Button>
      )}
    </div>
  );
};
export default SideBar;
