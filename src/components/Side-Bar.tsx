import Logo from "./icons/Logo"
import LogoCont from "./Logo-Cont"
import MenuContAdmin from "./MenuContAdmin"

const SideBar = () => {
    return(
        <div className="h-screen fixed bg-white dark:bg-black w-[205px] py-9 px-5 flex flex-col gap-10">
           <LogoCont />
           <MenuContAdmin />
        </div>
    )
}
export default SideBar