import React from "react";
import "./employee-table.css";

function EmployeeManagement({ employee, employeeSelect, editData, deleteData, addData }) {

  return (
    <div className="table-container">
      <div className="table-header">
        Employee Management
      </div>

      <div className="p-3">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Date of Joining</th>
              <th>Base Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employee.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No employees found
                </td>
              </tr>
            ) : (
              employee.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.employeeCode}</td>
                  <td>{emp.fullName}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.joiningDate}</td>
                  <td>₹ {emp.baseSalary}</td>
                  <td>
                    <span className={emp.isActive ? "badge-active" : "badge-inactive"}>
                      {emp.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => employeeSelect(emp.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => deleteData(emp.id)}
                    >
                      Delete
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

export default EmployeeManagement;
