import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import "./payroll-history.css";

function PayrollHistory() {

  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(1);
  const [monthInput, setMonthInput] = useState("2026-01");
  const [payrollHistory, setPayrollHistory] = useState([]);

  const getEmployeeid = async () => {
    try {
      const res = await apiClient.get(
        "/employee/payslip/getByMonthAndYear",
        { params: { month, year } }
      );
      setPayrollHistory(res.data);
    } catch (error) {
      console.error("Error fetching payroll history:", error);
      setPayrollHistory([]);
    }
  };

  useEffect(() => {
    getEmployeeid();
  }, []);

  return (
    <div className="payroll-card">
      <div className="payroll-header">
        Payroll History
      </div>

      <div className="payroll-body">

        <div className="payroll-filters">
          <label>Month:</label>
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

          <button className="btn-fetch" onClick={getEmployeeid}>
            Get Payroll History
          </button>
        </div>

        <table className="payroll-table">
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
            {payrollHistory.length === 0 ? (
              <tr>
                <td colSpan="6" className="payroll-empty">
                  No payroll records found
                </td>
              </tr>
            ) : (
              payrollHistory.map(record => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.employeeName}</td>
                  <td>{record.department}</td>
                  <td>{record.month}</td>
                  <td>{record.year}</td>
                  <td className="salary">₹ {record.netSalary}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default PayrollHistory;
