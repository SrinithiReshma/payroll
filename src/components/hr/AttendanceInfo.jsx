import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

function AttendanceInfo() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(1);
  const [data, setData] = useState([]);
  const [monthInput, setMonthInput] = useState("2026-01");
  const [totalWorkingDays, setTotalWorkingDays] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const [ta, setTa] = useState(0);
  const [incentive, setIncentive] = useState(0);
  const [bonus, setBonus] = useState(0);

  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const getDetails = async (m, y) => {
    try {
      const response = await apiClient.get(`/attendance/employee/month`, {
        params: { month: m, year: y },
      });
      setData(response.data);
    } catch (error) {
      console.log("Error fetching attendance details:", error);
    }
  };

  useEffect(() => {
    getDetails(month, year);
  }, []);

  const fetchAttendance = () => {
    getDetails(month, year);
  };
  const generatePayslip = (record, taValue, incentiveValue, bonusValue) => {
    const totalDays = Number(totalWorkingDays);
    if (totalDays === 0) {
      alert("Please enter Total Working Days");
      return null;
    }

    const present = Number(record.PRESENT || 0);
    const leave = Number(record.LEAVE || 0);
    const halfDay = Number(record.HALF_DAY || 0);

    const paidDays = present + leave + halfDay * 0.5;
    const lopDays = totalDays > 0 ? Math.max(totalDays - paidDays, 0) : 0;

    const fixedSalary = Number(record.Salary || 0);

    const taNum = Number(taValue || 0);
    const incentiveNum = Number(incentiveValue || 0);
    const bonusNum = Number(bonusValue || 0);

    const variablePay = taNum + incentiveNum + bonusNum;
    const grossSalary = fixedSalary + variablePay;

    const basic = fixedSalary * 0.4;
    const hra = fixedSalary * 0.2;
    const specialAllowance = fixedSalary * 0.4;

    const pf = basic * 0.12;
    const pt = fixedSalary > 20000 ? 200 : 0;

    const annualGross = grossSalary * 12;

    let yearlyTax = 0;
    if (annualGross > 300000 && annualGross <= 600000) {
      yearlyTax = (annualGross - 300000) * 0.05;
    } else if (annualGross > 600000 && annualGross <= 900000) {
      yearlyTax = 15000 + (annualGross - 600000) * 0.1;
    } else if (annualGross > 900000) {
      yearlyTax = 45000 + (annualGross - 900000) * 0.15;
    }

    const tds = yearlyTax / 12;
    const perDayFixed = totalDays > 0 ? fixedSalary / totalDays : 0;
    const lopAmount = lopDays * perDayFixed;

    const totalDeductions = pf + pt + tds + lopAmount;
    const netSalary = grossSalary - totalDeductions;

    return {
      employeeId: record.employeeId,
      employeeName: record.EmployeeName,
      department: record.department,
      designation: record.designation,

      month,
      year,

      totalWorkingDays: totalDays,
      paidDays,
      lopDays,

      earnings: {
        basic: Number(basic),
        hra: Number(hra),
        specialAllowance: Number(specialAllowance),
        ta: taNum,
        incentive: incentiveNum,
        bonus: bonusNum,
        fixedSalary: Number(fixedSalary),
        grossSalary: Number(grossSalary),
      },

      deductions: {
        pf: Number(pf),
        pt: Number(pt),
        tds: Number(tds),
        lopAmount: Number(lopAmount),
        totalDeductions: Number(totalDeductions),
      },

      netSalary: Number(netSalary),
    };
  };
  const savePayslipdetails = async () => {
    if (!selectedPayslip) {
      alert("generate payslip first ");
      return;
    }

    try {
      await apiClient.post("employee/payslip/save", {
        employeeId: selectedPayslip.employeeId,
        employeeName: selectedPayslip.employeeName,
        department: selectedPayslip.department,
        designation: selectedPayslip.designation,
        month: selectedPayslip.month,
        year: selectedPayslip.year,
        totalWorkingDays: selectedPayslip.totalWorkingDays,
        paidDays: selectedPayslip.paidDays,
        lopDays: selectedPayslip.lopDays,

        basic: selectedPayslip.earnings.basic,
        hra: selectedPayslip.earnings.hra,
        specialAllowance: selectedPayslip.earnings.specialAllowance,
        ta: selectedPayslip.earnings.ta,
        incentive: selectedPayslip.earnings.incentive,
        bonus: selectedPayslip.earnings.bonus,
        fixedSalary: selectedPayslip.earnings.fixedSalary,
        grossSalary: selectedPayslip.earnings.grossSalary,

        pf: selectedPayslip.deductions.pf,
        pt: selectedPayslip.deductions.pt,
        tds: selectedPayslip.deductions.tds,
        lopAmount: selectedPayslip.deductions.lopAmount,
        totalDeductions: selectedPayslip.deductions.totalDeductions,

        netSalary: selectedPayslip.netSalary,
      });

      alert("payslip saved successfully");
    } catch (err) {
      console.log(err);
      alert("error saving payslip");
    }
  };

  return (
    <div>
      <h2>Payslip Board</h2>

      <label>Total Working Days: </label>
      <input
        type="number"
        value={totalWorkingDays}
        onChange={(e) => setTotalWorkingDays(e.target.value)}
        placeholder="Total Working Days"
        style={{ marginRight: "10px" }}
      />

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

      <button onClick={fetchAttendance} style={{ marginLeft: "10px" }}>
        Load
      </button>

      <table border="1" cellPadding="5" cellSpacing="0" style={{ marginTop: "15px" }}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Leave</th>
            <th>Half Day</th>
            <th>Payslip</th>
          </tr>
        </thead>

        <tbody>
          {data.map((record) => (
            <tr key={record.employeeId}>
              <td>{record.employeeId}</td>
              <td>{record.EmployeeName}</td>
              <td>{record.Salary}</td>
              <td>{record.department}</td>
              <td>{record.designation}</td>
              <td>{record.PRESENT || 0}</td>
              <td>{record.ABSENT || 0}</td>
              <td>{record.LEAVE || 0}</td>
              <td>{record.HALF_DAY || 0}</td>
              <td>
                <button
                  onClick={() => {
                    setCurrentRecord(record);
                    setTa(0);
                    setIncentive(0);
                    setBonus(0);
                    setShowPopup(true);
                  }}
                >
                  Generate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ background: "white", padding: "20px", width: "350px", borderRadius: "10px" }}>
            <h3>Enter Variable Components</h3>

            <label>Travel Allowance (TA):</label>
            <input
              type="number"
              value={ta}
              onChange={(e) => setTa(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Incentive:</label>
            <input
              type="number"
              value={incentive}
              onChange={(e) => setIncentive(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Bonus:</label>
            <input
              type="number"
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setCurrentRecord(null);
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  const payslip = generatePayslip(currentRecord, ta, incentive, bonus);
                  if (payslip) {
                    setSelectedPayslip(payslip);
                  }
                  setShowPopup(false);
                }}
              >
                Generate Payslip
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedPayslip && (
        <div style={{ marginTop: "20px", border: "1px solid black", padding: "15px" }}>
          <h2>Payslip</h2>
          <p>
            <b>Employee:</b> {selectedPayslip.employeeName} ({selectedPayslip.employeeId})
          </p>
          <p>
            <b>Department:</b> {selectedPayslip.department}
          </p>
          <p>
            <b>Designation:</b> {selectedPayslip.designation}
          </p>
          <p>
            <b>Month/Year:</b> {selectedPayslip.month}/{selectedPayslip.year}
          </p>

          <hr />
          <h3>Attendance</h3>
          <p>Total Working Days: {selectedPayslip.totalWorkingDays}</p>
          <p>Paid Days: {selectedPayslip.paidDays}</p>
          <p>LOP Days: {selectedPayslip.lopDays}</p>
          <hr />
          <h3>Earnings</h3>
          <p>Basic: ₹{selectedPayslip.earnings.basic.toFixed(2)}</p>
          <p>HRA: ₹{selectedPayslip.earnings.hra.toFixed(2)}</p>
          <p>Special Allowance: ₹{selectedPayslip.earnings.specialAllowance.toFixed(2)}</p>
          <p>TA: ₹{selectedPayslip.earnings.ta.toFixed(2)}</p>
          <p>Incentive: ₹{selectedPayslip.earnings.incentive.toFixed(2)}</p>
          <p>Bonus: ₹{selectedPayslip.earnings.bonus.toFixed(2)}</p>
          <p>
            <b>Gross Salary:</b> ₹{selectedPayslip.earnings.grossSalary.toFixed(2)}
          </p>
          <hr />
          <h3>Deductions</h3>
          <p>PF: ₹{selectedPayslip.deductions.pf.toFixed(2)}</p>
          <p>Professional Tax: ₹{selectedPayslip.deductions.pt.toFixed(2)}</p>
          <p>TDS: ₹{selectedPayslip.deductions.tds.toFixed(2)}</p>
          <p>LOP Amount: ₹{selectedPayslip.deductions.lopAmount.toFixed(2)}</p>
          <p>
            <b>Total Deductions:</b> ₹{selectedPayslip.deductions.totalDeductions.toFixed(2)}
          </p>

          <hr />

          <h2>Net Salary: ₹{selectedPayslip.netSalary.toFixed(2)}</h2>

          <button onClick={savePayslipdetails}>Save Payslip</button>
        </div>
      )}
    </div>
  );
}

export default AttendanceInfo;
