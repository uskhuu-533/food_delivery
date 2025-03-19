import AdminCont from "@/app/_features/Admin-Main-Cont";
import SideBar from "@/components/Side-Bar";
import { CategoryProvider } from "@/provider/CategoryProvider";
import { LoadingProvider } from "@/provider/LoaderProvider";

const Home = () => {
  return (
    <CategoryProvider>
      <div className="w-screen flex bg-[#F4F4F5] h-fit gap-10">
        <SideBar />
        <AdminCont />
      </div>
    </CategoryProvider>
  );
};
export default Home;
