import { useEffect, useState } from "react";
import React from "react";
/*
  employee,
        selectedEmployee,
        selectEmployee,
        addEmployee,
        editEmployee,
        deleteEmployee,
*/
function EmployeeForm({employee,selectedEmployee,addData,editData})
{
const [employeecode,setEmployeeCode]=useState("");
const [employeename,setEmployeeName]=useState("");
const [department,setDepartment]=useState("");
const [designation,setDesignation]=useState("");
const [dateofjoining,setDateOfJoining]=useState("");
const [basesalary,setBaseSalary]=useState("");
const [isActive,setIsActive]=useState(true);
const clearForm=()=>{
    setEmployeeCode("");    
    setEmployeeName("");
    setDepartment("");
    setDesignation("");
    setDateOfJoining("");
    setBaseSalary("");
    setIsActive(true);
};
const handleSubmit=(e)=>{

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

    if(selectedEmployee!==null){
        editData(selectedEmployee.id,employeeData);
        clearForm();
    }else{
        addData(employeeData);
        clearForm();
    }
};
useEffect(()=>{
    if(selectedEmployee){
        setEmployeeCode(selectedEmployee.employeeCode); 
        setEmployeeName(selectedEmployee.fullName);
        setDepartment(selectedEmployee.department);
        setDesignation(selectedEmployee.designation);
        setDateOfJoining(selectedEmployee.joiningDate);
        setBaseSalary(selectedEmployee.baseSalary);
        setIsActive(selectedEmployee.isActive);
    }},[selectedEmployee]);
return (
<div>

<form onSubmit={handleSubmit}>
    <label>Employee Code:</label>
    <input type="text" value={employeecode} onChange={(e)=>setEmployeeCode(e.target.value)}/>
    <br/>   
    <label>Employee Name:</label>
    <input type="text" value={employeename} onChange={(e)=>setEmployeeName(e.target.value)}/>
    <br/>
    <label>Department:</label>
    <input type="text" value={department} onChange={(e)=>setDepartment(e.target.value)}/>
    <br/>
    <label>Designation:</label>
    <input type="text" value={designation} onChange={(e)=>setDesignation(e.target.value)}/>
    <br/>   
    <label>Date of Joining:</label>
    <input type="date" value={dateofjoining} onChange={(e)=>setDateOfJoining(e.target.value)}/>
    <br/>
    <label>Base Salary:</label>
    <input type="number" value={basesalary} onChange={(e)=>setBaseSalary(e.target.value)}/>
    <br/>
    <label>Active:</label>
    <input type="checkbox" checked={isActive} onChange={(e)=>setIsActive(e.target.checked)}/>
    <br/>
    <button type="submit">
        {selectedEmployee ?"update":"Add"}
    </button>

</form>
</div>);
};
export default EmployeeForm;
