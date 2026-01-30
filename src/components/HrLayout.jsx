import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const HrLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default HrLayout;
