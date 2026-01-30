import React from "react";
import EmployeeManagement from "./EmployeeManagement";
import { useOutletContext } from "react-router-dom";
/*
  employee,
        selectedEmployee,
        selectEmployee,
        addEmployee,
        editEmployee,
        deleteEmployee,
*/
function EmployeeManagementPage() {
const {employee,selectedEmployee,selectEmployee, addEmployee, editEmployee, deleteEmployee } =useOutletContext();
  return (
     <EmployeeManagement employee={employee} employeeSelect={selectEmployee} editData={editEmployee} deleteData={deleteEmployee} addData={addEmployee}/>
  );
}

export default EmployeeManagementPage;
