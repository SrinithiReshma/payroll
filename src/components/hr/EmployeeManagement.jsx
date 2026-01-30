import React from "react";

function EmployeeManagement({ employee, employeeSelect, editData, deleteData, addData }) {
    console.log("Employee Data:", employee);
    
    return (
        <div>
            <div className="row">
                <div className="col">
                    Employee Table
                </div >
            </div>
            <div className="row">
                <div className="col">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee Code</th>
                                <th>Employee Name</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Date of Joining</th>
                                <th>Base Salary</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.employeeCode}</td> 
                                    <td>{emp.fullName}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.designation}</td>
                                    <td>{emp.joiningDate}</td>
                                    <td>{emp.baseSalary}</td>
                                    <td>{emp.isActive ? "Yes" : "No"}</td>
                                    <td>
                                        <button onClick={() => employeeSelect(emp.id)}>Edit</button>
                                        <button onClick={() => deleteData(emp.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default EmployeeManagement;