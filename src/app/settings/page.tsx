import SideBar from "@/components/Side-Bar";
import SettingsHeader from "./_features/SettingsHeader";
import { UsersProvider } from "@/provider/UsersProvider";
import Container from "./_features/Container";


const Home = () => {
  return (
    <UsersProvider>
      <div className="w-screen flex bg-[#F4F4F5] h-fit gap-10 ">
        <SideBar />
        <div className="w-full">
        <SettingsHeader />
        <Container/>
        </div>
      </div>
    </UsersProvider>
  );
};
export default Home;
