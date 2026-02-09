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
      const res = await apiClient.get("/attendance/employee/month", {
        params: { month: m, year: y },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDetails(month, year);
  }, []);

  const fetchAttendance = () => getDetails(month, year);

  const generatePayslip = (record, taValue, incentiveValue, bonusValue) => {
    const totalDays = Number(totalWorkingDays);
    if (!totalDays) {
      alert("Enter Total Working Days");
      return null;
    }

    const present = Number(record.PRESENT || 0);
    const leave = Number(record.LEAVE || 0);
    const halfDay = Number(record.HALF_DAY || 0);

    const paidDays = present + leave + halfDay * 0.5;
    const lopDays = Math.max(totalDays - paidDays, 0);

    const fixedSalary = Number(record.Salary || 0);
    const taNum = Number(taValue || 0);
    const incentiveNum = Number(incentiveValue || 0);
    const bonusNum = Number(bonusValue || 0);

    const grossSalary = fixedSalary + taNum + incentiveNum + bonusNum;

    const basic = fixedSalary * 0.4;
    const hra = fixedSalary * 0.2;
    const specialAllowance = fixedSalary * 0.4;

    const pf = basic * 0.12;
    const pt = fixedSalary > 20000 ? 200 : 0;

    const annualGross = grossSalary * 12;
    let yearlyTax = 0;

    if (annualGross > 300000 && annualGross <= 600000)
      yearlyTax = (annualGross - 300000) * 0.05;
    else if (annualGross > 600000 && annualGross <= 900000)
      yearlyTax = 15000 + (annualGross - 600000) * 0.1;
    else if (annualGross > 900000)
      yearlyTax = 45000 + (annualGross - 900000) * 0.15;

    const tds = yearlyTax / 12;
    const lopAmount = (fixedSalary / totalDays) * lopDays;

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
        basic,
        hra,
        specialAllowance,
        ta: taNum,
        incentive: incentiveNum,
        bonus: bonusNum,
        fixedSalary,
        grossSalary,
      },
      deductions: {
        pf,
        pt,
        tds,
        lopAmount,
        totalDeductions,
      },
      netSalary,
    };
  };

  const savePayslipdetails = async () => {
    if (!selectedPayslip) return alert("Generate payslip first");

    try {
      await apiClient.post("employee/payslip/save", {
        ...selectedPayslip,
        ...selectedPayslip.earnings,
        ...selectedPayslip.deductions,
      });
      alert("Payslip saved successfully");
    } catch {
      alert("Error saving payslip");
    }
  };

  return (
    <div style={{ padding: "25px", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ background: "#1e293b", color: "#fff", padding: "15px", borderRadius: "8px" }}>
        <h2 style={{ margin: 0 }}>Payslip Board</h2>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ display: "flex", gap: "12px", marginBottom: "15px", flexWrap: "wrap" }}>
          <input
            type="number"
            placeholder="Total Working Days"
            value={totalWorkingDays}
            onChange={(e) => setTotalWorkingDays(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          />

          <input
            type="month"
            value={monthInput}
            onChange={(e) => {
              const [y, m] = e.target.value.split("-");
              setMonthInput(e.target.value);
              setMonth(Number(m));
              setYear(Number(y));
            }}
            style={{ padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
          />

          <button
            onClick={fetchAttendance}
            style={{
              background: "#1e293b",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Load
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f1f5f9" }}>
            <tr>
              {["ID", "Name", "Salary", "Dept", "Desig", "P", "A", "L", "HD", "Payslip"].map(h => (
                <th key={h} style={{ padding: "10px", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(r => (
              <tr key={r.employeeId}>
                <td>{r.employeeId}</td>
                <td>{r.EmployeeName}</td>
                <td>₹ {r.Salary}</td>
                <td>{r.department}</td>
                <td>{r.designation}</td>
                <td>{r.PRESENT || 0}</td>
                <td>{r.ABSENT || 0}</td>
                <td>{r.LEAVE || 0}</td>
                <td>{r.HALF_DAY || 0}</td>
                <td>
                  <button
                    onClick={() => {
                      setCurrentRecord(r);
                      setTa(0);
                      setIncentive(0);
                      setBonus(0);
                      setShowPopup(true);
                    }}
                    style={{ background: "#334155", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "5px" }}
                  >
                    Generate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedPayslip && (
          <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
            <h2 style={{ color: "#166534" }}>Net Salary: ₹ {selectedPayslip.netSalary.toFixed(2)}</h2>
            <button
              onClick={savePayslipdetails}
              style={{ background: "#166534", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "6px" }}
            >
              Save Payslip
            </button>
          </div>
        )}
      </div>

      {showPopup && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ background: "#fff", padding: "20px", width: "320px", borderRadius: "10px" }}>
            <h3>Variable Pay</h3>
            <input type="number" placeholder="TA" value={ta} onChange={e => setTa(e.target.value)} style={{ width: "100%", marginBottom: "8px" }} />
            <input type="number" placeholder="Incentive" value={incentive} onChange={e => setIncentive(e.target.value)} style={{ width: "100%", marginBottom: "8px" }} />
            <input type="number" placeholder="Bonus" value={bonus} onChange={e => setBonus(e.target.value)} style={{ width: "100%", marginBottom: "12px" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
              <button onClick={() => {
                const p = generatePayslip(currentRecord, ta, incentive, bonus);
                if (p) setSelectedPayslip(p);
                setShowPopup(false);
              }}>Generate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendanceInfo;
