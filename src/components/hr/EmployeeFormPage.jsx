import React from "react";
import EmployeeForm from "./EmployeeForm";
import { useOutletContext } from "react-router-dom";
/*
  employee,
        selectedEmployee,
        selectEmployee,
        addEmployee,
        editEmployee,
        deleteEmployee,
*/
function EmployeeFormPage() {
  const { employee, selectedEmployee,selectEmployee,addEmployee, editEmployee,deleteEmployee } =
    useOutletContext();

  return (
  
        <EmployeeForm employee={employee} selectedEmployee={selectedEmployee} addData={addEmployee} editData={editEmployee}  />
  );
}

export default EmployeeFormPage;
