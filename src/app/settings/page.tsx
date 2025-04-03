import SideBar from "@/components/Side-Bar";
import SettingsHeader from "./_features/SettingsHeader";
import { UsersProvider } from "@/provider/UsersProvider";
import Container from "./_features/Container";
import ScreenLoader from "@/components/ScreenLoader";

const Home = () => {
  return (
    <UsersProvider>
      <div className="w-screen flex bg-[#F4F4F5] h-fit gap-10 ">
        <SideBar />
        <div className="w-full">
          <SettingsHeader />
          <Container />
        </div>
      </div>
      <ScreenLoader/>
    </UsersProvider>
  );
};
export default Home;
