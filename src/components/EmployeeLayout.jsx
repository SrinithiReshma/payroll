import SidebarEmployee from "./SidebarEmployee";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <div className="layout">
      <SidebarEmployee />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeLayout;
