import OrderCont from "@/components/Order-Cont"
import SideBar from "@/components/Side-Bar"

const Home = () => {
    return(
        <div className="w-screen flex bg-[#F4F4F5] h-fit gap-10">
            <SideBar />
            <OrderCont />
      </div>
    )
}
export default Home