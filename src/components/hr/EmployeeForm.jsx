import React, { useEffect, useState } from "react";
import "./employee-form.css";

function EmployeeForm({ employee, selectedEmployee, addData, editData }) {

  const [employeecode, setEmployeeCode] = useState("");
  const [employeename, setEmployeeName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateofjoining, setDateOfJoining] = useState("");
  const [basesalary, setBaseSalary] = useState("");
  const [isActive, setIsActive] = useState(true);

  const clearForm = () => {
    setEmployeeCode("");
    setEmployeeName("");
    setDepartment("");
    setDesignation("");
    setDateOfJoining("");
    setBaseSalary("");
    setIsActive(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      employeeCode: employeecode,
      fullName: employeename,
      department,
      designation,
      joiningDate: dateofjoining,
      baseSalary: Number(basesalary),
      isActive
    };

    selectedEmployee
      ? editData(selectedEmployee.id, employeeData)
      : addData(employeeData);

    clearForm();
  };

  useEffect(() => {
    if (selectedEmployee) {
      setEmployeeCode(selectedEmployee.employeeCode);
      setEmployeeName(selectedEmployee.fullName);
      setDepartment(selectedEmployee.department);
      setDesignation(selectedEmployee.designation);
      setDateOfJoining(selectedEmployee.joiningDate);
      setBaseSalary(selectedEmployee.baseSalary);
      setIsActive(selectedEmployee.isActive);
    }
  }, [selectedEmployee]);

  return (
    <div className="page-container">
      <div className="form-card">
        <div className="form-card-header">
          {selectedEmployee ? "Update Employee" : "Add Employee"}
        </div>

        <div className="form-card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Employee Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={employeecode}
                  onChange={(e) => setEmployeeCode(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Employee Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={employeename}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Date of Joining</label>
                <input
                  type="date"
                  className="form-control"
                  value={dateofjoining}
                  onChange={(e) => setDateOfJoining(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Base Salary</label>
                <input
                  type="number"
                  className="form-control"
                  value={basesalary}
                  onChange={(e) => setBaseSalary(e.target.value)}
                />
              </div>

              <div className="col-12">
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    id="activeCheck"
                  />
                  <label className="form-check-label" htmlFor="activeCheck">
                    Active Employee
                  </label>
                </div>
              </div>

            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn-primary-custom">
                {selectedEmployee ? "Update" : "Add"}
              </button>

              <button
                type="button"
                className="btn-secondary-custom"
                onClick={clearForm}
              >
                Clear
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
