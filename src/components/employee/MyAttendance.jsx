import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

function MyAttendance() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(
        "/attendance/employee/me/month",
        { params: { month, year } }
      );
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to load attendance", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [month, year]);

  return (
    <div style={{
      padding: "25px",
      backgroundColor: "#f8fafc",
      minHeight: "100vh"
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#1e293b",
        color: "white",
        padding: "15px 20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h2 style={{ margin: 0 }}>My Attendance</h2>
      </div>

      {/* Controls */}
      <div style={{
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        marginBottom: "20px",
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          style={inputStyle}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={inputStyle}
        >
          {[2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <button
          onClick={fetchAttendance}
          style={primaryButton}
        >
          View
        </button>
      </div>

      {loading && (
        <p style={{ color: "#64748b" }}>Loading attendance...</p>
      )}

      {summary && (
        <>
          {/* Employee Info */}
          <div style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            marginBottom: "20px"
          }}>
            <strong style={{ fontSize: "16px" }}>
              {summary.EmployeeName}
            </strong>
            <div style={{ color: "#475569", marginTop: "4px" }}>
              {summary.designation} • {summary.department}
            </div>
          </div>

          {/* Attendance Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px"
          }}>
            <AttendanceCard title="Present" value={summary.PRESENT} color="#16a34a" />
            <AttendanceCard title="Absent" value={summary.ABSENT} color="#dc2626" />
            <AttendanceCard title="Half Day" value={summary.HALF_DAY} color="#f59e0b" />
            <AttendanceCard title="Leave" value={summary.LEAVE} color="#2563eb" />
          </div>
        </>
      )}
    </div>
  );
}

/* Reusable card */
function AttendanceCard({ title, value, color }) {
  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "18px",
      textAlign: "center",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      borderTop: `4px solid ${color}`
    }}>
      <div style={{
        fontSize: "14px",
        color: "#475569",
        marginBottom: "8px"
      }}>
        {title}
      </div>
      <div style={{
        fontSize: "28px",
        fontWeight: "bold",
        color
      }}>
        {value ?? 0}
      </div>
    </div>
  );
}

/* Styles */
const inputStyle = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  outline: "none"
};

const primaryButton = {
  backgroundColor: "#1e293b",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer"
};

export default MyAttendance;
