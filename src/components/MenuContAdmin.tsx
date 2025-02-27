"use client";

import { ComponentIcon, LayoutDashboardIcon, Settings, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MenuContAdmin = () => {
  const [path, setPath] = useState("");
  const router = useRouter()
  useEffect(() => {
    const pathName = () => {
      if (window.location.pathname === "/admin/menu") {
        setPath("menu");
      } else if (window.location.pathname === "/admin/order") {
        setPath("order");
      } else if (window.location.pathname === "/admin/settings") {
        setPath("settings");
      }
    };
    pathName();
  });

  return (
    <div className="w-full h-fit flex flex-col gap-6">
      <div
        className={`px-6 flex items-center py-2 rounded-full gap-2`}
        style={path === "menu" ? { color: "white", background: "black" } : {color:"black", background:"none"}}
        onClick={()=> router.push("/admin/menu")}
      >
        <LayoutDashboardIcon size={22} />
        <p>Food menu</p>
      </div>
      <div
        className={`px-6 flex items-center py-2 rounded-full gap-2`}
        style={path === "order" ? { color: "white", background: "black" } : {color:"black", background:"none"}}
        onClick={()=> router.push("/admin/order")}
      >
        <Truck size={22} />
        <p>Orders</p>
      </div>
      <div
        className={`px-6 flex items-center py-2 rounded-full gap-2`}
        style={path === "settings" ? { color: "white", background: "black" } : {color:"black", background:"none"}}
        onClick={()=> router.push("/admin/settings")}
      >
        <Settings size={22} />
        <p>Settings</p>
      </div>
    </div>
  );
};
export default MenuContAdmin;
