import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">HR Panel</h2>

      <Link to="/hr">Dashboard</Link>
      <Link to="/hr/employee">Employee Management</Link>
      <Link to="/hr/employee/add">Add Employee</Link>
      <Link to="/hr/attendance">Attendance Management</Link>
      <Link to="/hr/attendance/info">Payslip Generation</Link>
      <Link to="/hr/payroll-history">Payroll History</Link>
      <Link to="/hr/announcements">Announcements</Link>
      <Link to="/hr/documents">Employee Documents</Link>
      
    </div>
  );
}

export default Sidebar;
