import { Outlet } from "react-router-dom";
import SideBar from "./SideBar/SideBar";

const DashboardLayout = () => {
  return (
    <>
      {/* <div className="w-full bg-blue-700 h-14"></div> */}
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
