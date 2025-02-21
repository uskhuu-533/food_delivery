import Logo from "./icons/Logo"
import LogoCont from "./Logo-Cont"



const Header = () => {

    return(
        <div className="w-screen fixed h-[88px] flex items-center justify-center py-[22px] dark:bg-[#18181B] z-10">
            <div className="h-full max-w-[1264px] w-full justify-between">
            <LogoCont />
            </div>
            <div>
            </div>
        </div>
    )
}
export default Header