"use client";
import LogoCont from "./Logo-Cont";
import MenuContAdmin from "./MenuContAdmin";

const SideBar = () => {

  return (
    <div className="h-screen sticky top-0 bg-white w-[205px] py-9 px-5 flex flex-col gap-10">
      <LogoCont />
      <MenuContAdmin />
    </div>
  );
};
export default SideBar;
