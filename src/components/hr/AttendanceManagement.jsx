import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";



function AttendanceManagement() {
  const [employees, setEmployees] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceData, setAttendanceData] = useState({});
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiClient.get("/employee/all");
        console.log("Fetched employees:", response.data);
        setEmployees(response.data);
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    };


    fetchEmployees();
  }, []);


  useEffect(() => {
    const fetchAttendanceByDate = async () => {
      try {
        const response = await apiClient.get(`/attendance/date/${date}`);
        console.log("Fetched attendance:", response.data);
        const map = {};
        response.data.forEach((a) => {
          map[a.employee.id] = {
            status: a.status,
            remarks: a.remarks || "",
          };
        });


        setAttendanceData(map);
      } catch (error) {
        console.log("No attendance for date:", date);
        setAttendanceData({});
      }
    };


    fetchAttendanceByDate();
  }, [date]);


  const handleChange = (employeeId, field, value) => {
    setAttendanceData((prev) => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [field]: value,
      },
    }));
  };


  const handleSave = async (employeeId) => {
    try {
      const data = attendanceData[employeeId];


      const payload = {
        employeeId: employeeId,
        attendanceDate: date,
        status: data?.status || "PRESENT",
        remarks: data?.remarks || "",
      };


      await apiClient.post("/attendance/mark", payload);


      alert("Attendance Saved");
    } catch (error) {
      console.log("Error saving attendance:", error);
      alert("Failed");
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance Management</h2>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ fontWeight: "bold" }}>
          Select Date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
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
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Employees Found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employeeCode}</td>
                <td>{emp.fullName}</td>
                <td>{emp.department}</td>
                <td>
                  <select
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
                  <button onClick={() => handleSave(emp.id)}>Save</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}


export default AttendanceManagement;