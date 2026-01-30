import { Link } from "react-router-dom";
import "./sidebar.css";

function SidebarEmployee() {
  return (
    <div className="sidebar">
      <h2 className="logo">Employee Panel</h2>
        <Link to="/employee">Dashboard</Link>
        <Link to="/employee/attendance">My Attendance</Link>
        <Link to="/employee/announcements">Announcements</Link>
        <Link to="/employee/payroll">My Payroll</Link>
        <Link to="/employee/documents">My Document</Link>

      
    </div>
  );
}

export default SidebarEmployee;
