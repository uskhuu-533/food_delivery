import Logo from "./icons/Logo";

const LogoCont = () => {
  return (
    <div className="flex gap-2">
      <Logo />
      <div className="flex flex-col gap-0">
        <div className="text-black font-[600] text-xl">NomNom</div>
        <div className="text-sm font-[400]">Swift delivery</div>
      </div>
    </div>
  );
};
export default LogoCont;
