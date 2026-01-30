import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import UserAdd from "./components/UserAdd";

/* HR */
import HrLayout from "./components/HrLayout";
import HrDashboard from "./components/hr/HrDashboard";
import EmployeeFormPage from "./components/hr/EmployeeFormPage";
import Employee from "./components/hr/Employee";
import EmployeeManagementPage from "./components/hr/EmployeeManagementPage";
import AttendanceManagement from "./components/hr/AttendanceManagement";
import AttendanceInfo from "./components/hr/AttendanceInfo";
import PayrollHistory from "./components/hr/PayrollHistory";
import Announcements from "./components/hr/Announcements";
import HrDocuments from "./components/hr/HrDocuments";
/* EMPLOYEE */
import EmployeeLayout from "./components/EmployeeLayout";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import MyAttendance from "./components/employee/MyAttendance";
import EmploymentPayroll from "./components/employee/EmploymentPayroll";
import EmployeeAnnouncement from "./components/employee/EmployeeAnnouncement";
import EmployeeDocuments from "./components/employee/EmployeeDocuments";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/api/auth/register" element={<UserAdd />} />

        {/* HR ROUTES */}
        <Route
          path="/hr"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN", "HR","ROLE_HR"]}>
              <HrLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HrDashboard />} />
          <Route path="attendance" element={<AttendanceManagement />} />
          <Route path="attendance/info" element={<AttendanceInfo />} />
          <Route path="employee" element={<Employee />}>
            <Route index element={<EmployeeManagementPage />} />
            <Route path="add" element={<EmployeeFormPage />} />
          </Route>
          <Route path="payroll-history" element={<PayrollHistory />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="documents" element={<HrDocuments />} />
          
        </Route>

        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["ROLE_EMPLOYEE","EMPLOYEE"]}>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeDashboard />} />
          <Route path="attendance" element={<MyAttendance />} />
          <Route path="payroll" element={<EmploymentPayroll />} />
                    <Route path="documents" element={<EmployeeDocuments />} />

          <Route path="announcements" element={<EmployeeAnnouncement />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
