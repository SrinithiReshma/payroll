import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

function EmploymentPayroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const res = await apiClient.get("/employee/payslip/me");
      setPayrolls(res.data);
    } catch (err) {
      console.error("Payroll fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <p style={{ color: "#64748b" }}>Loading payroll...</p>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={{ margin: 0 }}>My Payslips</h2>
      </div>

      {payrolls.length === 0 ? (
        <p style={{ textAlign: "center", color: "#64748b" }}>
          No payroll records found
        </p>
      ) : (
        payrolls.map((p, index) => (
          <div key={index} style={cardStyle}>
            {/* Payslip Header */}
            <div style={cardHeaderStyle}>
              Payslip — {p.month}/{p.year}
            </div>

            <div style={{ padding: "18px" }}>
              {/* Employee Info */}
              <div style={infoGrid}>
                <Info label="Employee" value={p.employeeName} />
                <Info label="Department" value={p.department} />
                <Info label="Designation" value={p.designation} />
              </div>

              <hr style={divider} />

              {/* Earnings & Deductions */}
              <div style={twoColGrid}>
                {/* Earnings */}
                <div>
                  <h4 style={sectionTitle}>Earnings</h4>
                  <SalaryRow label="Basic" value={p.basic} />
                  <SalaryRow label="HRA" value={p.hra} />
                  <SalaryRow label="Special Allowance" value={p.specialAllowance} />
                  <SalaryRow label="TA" value={p.ta} />
                  <SalaryRow label="Incentive" value={p.incentive} />
                  <SalaryRow label="Bonus" value={p.bonus} />
                  <SalaryTotal label="Gross Salary" value={p.grossSalary} />
                </div>

                {/* Deductions */}
                <div>
                  <h4 style={sectionTitle}>Deductions</h4>
                  <SalaryRow label="PF" value={p.pf} />
                  <SalaryRow label="Professional Tax" value={p.pt} />
                  <SalaryRow label="TDS" value={p.tds.toFixed(2)} />
                  <SalaryRow label="LOP Amount" value={p.lopAmount} />
                  <SalaryTotal label="Total Deductions" value={p.totalDeductions.toFixed(2)} />
                </div>
              </div>

              <hr style={divider} />

              {/* Net Salary */}
              <div style={{ textAlign: "right" }}>
                <h3 style={{ color: "#166534" }}>
                  Net Salary: ₹{p.netSalary.toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}


function Info({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: "13px", color: "#64748b" }}>{label}</div>
      <div style={{ fontWeight: "600", color: "#334155" }}>{value}</div>
    </div>
  );
}

function SalaryRow({ label, value }) {
  return (
    <div style={rowStyle}>
      <span>{label}</span>
      <span>₹{value}</span>
    </div>
  );
}

function SalaryTotal({ label, value }) {
  return (
    <div style={{ ...rowStyle, background: "#f1f5f9", fontWeight: "600" }}>
      <span>{label}</span>
      <span>₹{value}</span>
    </div>
  );
}


const pageStyle = {
  padding: "25px",
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
};

const headerStyle = {
  backgroundColor: "#1e293b",
  color: "white",
  padding: "15px 20px",
  borderRadius: "8px",
  marginBottom: "20px",
};

const cardStyle = {
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  marginBottom: "24px",
  overflow: "hidden",
};

const cardHeaderStyle = {
  backgroundColor: "#334155",
  color: "white",
  padding: "12px 18px",
  fontWeight: "600",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
};

const twoColGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
};

const sectionTitle = {
  marginBottom: "10px",
  color: "#1e293b",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 10px",
  borderBottom: "1px solid #e2e8f0",
  color: "#334155",
};

const divider = {
  border: "none",
  borderTop: "1px solid #e2e8f0",
  margin: "16px 0",
};

export default EmploymentPayroll;
