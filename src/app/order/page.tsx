import OrderCont from "@/app/order/_features/Order-Cont";
import ScreenLoader from "@/components/ScreenLoader";
import SideBar from "@/components/Side-Bar";
import { OrderProvider } from "@/provider/OrderProvider";

const Home = () => {
  return (
    <OrderProvider>
      <ScreenLoader/>
      <div className="w-screen flex bg-[#F4F4F5] h-fit gap-10">
        <SideBar />
        <OrderCont />
      </div>
    </OrderProvider>
  );
};
export default Home;
