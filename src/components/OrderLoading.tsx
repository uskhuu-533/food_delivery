import { Loader, Loader2 } from "lucide-react";
import Logo from "./icons/Logo"
import { useOrder } from "@/provider/OrderProvider"


const OrderLoading = () => {
    const {loadingOrder } = useOrder()
    if (!loadingOrder) return null; 
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-white py-8 px-20 rounded-xl flex flex-col items-center gap-2" role="status">
            <Logo />
            <p>Status changing...</p>
            <Loader className="animate-spin " />
        </div>
      </div>
)
}
export default OrderLoading