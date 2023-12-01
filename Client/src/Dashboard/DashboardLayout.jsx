import { Outlet } from "react-router-dom";
import SideBar from "./SideBar/SideBar";

const DashboardLayout = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
