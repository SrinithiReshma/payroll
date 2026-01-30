import React, {useEffect,useState } from "react";
import apiClient from "../../api/apiClient";
function PayrollHistory() {
      const [year, setYear] = useState(2026);
      const [month, setMonth] = useState(1);
     const [monthInput, setMonthInput] = useState("2026-01");

     const [payrollHistory, setPayrollHistory] = useState([]);
    

    const getEmployeeid= async()=>{
        try{
                  const res = await apiClient.get("/employee/payslip/getByMonthAndYear",{
            params: { month: month, year: year },
                  });
        setPayrollHistory(res.data);

        console.log("Payroll History Data:", res.data);
    }
    catch(error){
        console.error("Error fetching payroll history:", error);
    }};
    useEffect(()=>{
        getEmployeeid();
    },[]);
  return (
    <div><h1>Payroll History</h1>
          <label>
        Month:
        <input
          type="month"
          value={monthInput}
          min="2020-01"
          max="2030-12"
          onChange={(e) => {
            const value = e.target.value;
            setMonthInput(value);

            const [y, m] = value.split("-");
            setMonth(Number(m));
            setYear(Number(y));
          }}
        />
      </label>
      <button onClick={getEmployeeid}>Get Payroll History</button>
      <table style={{ width: "100%", border:"1px solid black" , borderCollapse:"collapse" }}>
        <thead>
            <tr>    
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Month</th>
                <th>Year</th>
                <th>Net Salary</th>
            </tr>

        </thead>
        <tbody>
            {payrollHistory.map((record) => (
                <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.employeeName}</td>
                    <td>{record.department}</td>
                    <td>{record.month}</td>
                    <td>{record.year}</td>
                    <td>{record.netSalary}</td>
                </tr>
            ))} 
        </tbody>

      </table>
    </div>
    

  );


}
export default PayrollHistory;