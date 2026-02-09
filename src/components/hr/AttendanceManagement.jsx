import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import "./attendance.css";

function AttendanceManagement() {

  const [employees, setEmployees] = useState([]);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceData, setAttendanceData] = useState({});

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await apiClient.get("/employee/all");
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees", err);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch attendance by date
  useEffect(() => {
    const fetchAttendanceByDate = async () => {
      try {
        const res = await apiClient.get(`/attendance/date/${date}`);
        const map = {};

        res.data.forEach(a => {
          map[a.employee.id] = {
            status: a.status,
            remarks: a.remarks || ""
          };
        });

        setAttendanceData(map);
      } catch {
        setAttendanceData({});
      }
    };
    fetchAttendanceByDate();
  }, [date]);

  const handleChange = (empId, field, value) => {
    setAttendanceData(prev => ({
      ...prev,
      [empId]: {
        ...prev[empId],
        [field]: value
      }
    }));
  };

  const handleSave = async (empId) => {
    try {
      const data = attendanceData[empId] || {};

      const payload = {
        employeeId: empId,
        attendanceDate: date,
        status: data.status || "PRESENT",
        remarks: data.remarks || ""
      };

      await apiClient.post("/attendance/mark", payload);
      alert("Attendance saved");
    } catch (err) {
      alert("Failed to save attendance");
    }
  };

  return (
    <div className="attendance-card">
      <div className="attendance-header">
        Attendance Management
      </div>

      <div className="attendance-body">

        <div className="date-picker">
          <span>Select Date:</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>Full Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Save</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  No Employees Found
                </td>
              </tr>
            ) : (
              employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.employeeCode}</td>
                  <td>{emp.fullName}</td>
                  <td>{emp.department}</td>

                  <td>
                    <select
                      className={`status-${(attendanceData[emp.id]?.status || "present").toLowerCase()}`}
                      value={attendanceData[emp.id]?.status || "PRESENT"}
                      onChange={(e) =>
                        handleChange(emp.id, "status", e.target.value)
                      }
                    >
                      <option value="PRESENT">PRESENT</option>
                      <option value="ABSENT">ABSENT</option>
                      <option value="LEAVE">LEAVE</option>
                      <option value="HALFDAY">HALFDAY</option>
                    </select>
                  </td>

                  <td>
                    <input
                      type="text"
                      placeholder="Remarks..."
                      value={attendanceData[emp.id]?.remarks || ""}
                      onChange={(e) =>
                        handleChange(emp.id, "remarks", e.target.value)
                      }
                    />
                  </td>

                  <td>
                    <button
                      className="btn-save"
                      onClick={() => handleSave(emp.id)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default AttendanceManagement;
