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

  if (loading) return <h3 className="text-center">Loading payroll...</h3>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">My Payslips</h2>

      {payrolls.length === 0 ? (
        <p className="text-center">No payroll records found.</p>
      ) : (
        payrolls.map((p, index) => (
          <div key={index} className="card mb-4 shadow">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                Payslip — {p.month}/{p.year}
              </h5>
            </div>

            <div className="card-body">
              {/* Employee Info */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <b>Employee:</b> {p.employeeName}
                </div>
                <div className="col-md-4">
                  <b>Department:</b> {p.department}
                </div>
                <div className="col-md-4">
                  <b>Designation:</b> {p.designation}
                </div>
              </div>

              <hr />

              {/* Earnings & Deductions */}
              <div className="row">
                {/* Earnings */}
                <div className="col-md-6">
                  <h5>Earnings</h5>
                  <table className="table table-sm">
                    <tbody>
                      <tr><td>Basic</td><td className="text-end">₹{p.basic}</td></tr>
                      <tr><td>HRA</td><td className="text-end">₹{p.hra}</td></tr>
                      <tr><td>Special Allowance</td><td className="text-end">₹{p.specialAllowance}</td></tr>
                      <tr><td>TA</td><td className="text-end">₹{p.ta}</td></tr>
                      <tr><td>Incentive</td><td className="text-end">₹{p.incentive}</td></tr>
                      <tr><td>Bonus</td><td className="text-end">₹{p.bonus}</td></tr>
                      <tr className="table-secondary">
                        <td><b>Gross Salary</b></td>
                        <td className="text-end"><b>₹{p.grossSalary}</b></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Deductions */}
                <div className="col-md-6">
                  <h5>Deductions</h5>
                  <table className="table table-sm">
                    <tbody>
                      <tr><td>PF</td><td className="text-end">₹{p.pf}</td></tr>
                      <tr><td>Professional Tax</td><td className="text-end">₹{p.pt}</td></tr>
                      <tr><td>TDS</td><td className="text-end">₹{p.tds.toFixed(2)}</td></tr>
                      <tr><td>LOP Amount</td><td className="text-end">₹{p.lopAmount}</td></tr>
                      <tr className="table-secondary">
                        <td><b>Total Deductions</b></td>
                        <td className="text-end"><b>₹{p.totalDeductions.toFixed(2)}</b></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <hr />

              {/* Net Salary */}
              <div className="text-end">
                <h4 className="text-success">
                  Net Salary: ₹{p.netSalary.toFixed(2)}
                </h4>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EmploymentPayroll;
