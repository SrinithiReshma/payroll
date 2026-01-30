import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

function Employee() {
  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = async () => {
    try {
      const res = await apiClient.get("/employee/all");
      setEmployee(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  function selectEmployee(employeeId) {
    const emp = employee.find((emp) => emp.id === employeeId);
    setSelectedEmployee(emp);
    navigate("add"); 
  }

  const editEmployee = async (employeeId, employeeData) => {
    try {
      const res = await apiClient.put(`/employee/update/${employeeId}`, employeeData);
      setEmployee(employee.map((emp) => (emp.id === employeeId ? res.data : emp)));
      setSelectedEmployee(null);
      navigate("/hr/employee"); 
    } catch (error) {
      console.log("Edit error:", error);
    }
  };

  const addEmployee = async (employeeData) => {
    try {
      const res = await apiClient.post("/employee/add", employeeData);
      setEmployee([...employee, res.data]);
      navigate("/hr/employee"); 
    } catch (error) {
      console.log("Add error:", error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await apiClient.delete(`/employee/delete/${employeeId}`);
      setEmployee(employee.filter((emp) => emp.id !== employeeId));
      
    } 
    catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <Outlet
      context={{
        employee,
        selectedEmployee,
        selectEmployee,
        addEmployee,
        editEmployee,
        deleteEmployee,
      }}
    />
  );
}

export default Employee;
