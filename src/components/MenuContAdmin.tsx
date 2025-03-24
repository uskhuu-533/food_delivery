"use client";

import {  LayoutDashboardIcon, Settings, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MenuContAdmin = () => {
  const [path, setPath] = useState("");
  const router = useRouter()
  useEffect(() => {
    const pathName = () => {
      if (window.location.pathname === "/") {
        setPath("menu");
      } else if (window.location.pathname === "/order") {
        setPath("order");
      } else if (window.location.pathname === "/settings") {
        setPath("settings");
      }
    };
    pathName();
  });

  return (
    <div className="w-full h-fit flex flex-col gap-6">
      <Button
        className={`px-6 flex items-center py-2 rounded-full gap-2`}
        style={path === "menu" ? { color: "white", background: "black" } : {color:"black", background:"none"}}
        onClick={()=> router.push("/")}
      >
        <LayoutDashboardIcon size={22} />
        <p>Food menu</p>
      </Button>
      <Button
        className={`px-6 flex items-center py-2 rounded-full gap-2`}
        style={path === "order" ? { color: "white", background: "black" } : {color:"black", background:"none"}}
        onClick={()=> router.push("/order?page=1")}
      >
        <Truck size={22} />
        <p>Orders</p>
      </Button>
      <Button
        className={`px-6 flex items-center py-2 rounded-full gap-2`}
        style={path === "settings" ? { color: "white", background: "black" } : {color:"black", background:"none"}}
        onClick={()=> router.push("/settings")}
      >
        <Settings size={22} />
        <p>Settings</p>
      </Button>
    </div>
  );
};
export default MenuContAdmin;
