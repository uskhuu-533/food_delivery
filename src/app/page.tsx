import AdminCont from "@/app/_features/Admin-Main-Cont"
import SideBar from "@/components/Side-Bar"

const Home = () => {
    return(
        <div className="w-screen flex bg-[#F4F4F5] h-fit gap-10">
            <SideBar />
            <AdminCont /> 
      </div>
    )
}
export default Home