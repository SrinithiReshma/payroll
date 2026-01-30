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
    <div style={{ padding: "20px" }}>
      <h2>My Attendance</h2>

      {/* Month & Year Selector */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {[2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <button onClick={fetchAttendance}>View</button>
      </div>

      {loading && <p>Loading attendance...</p>}

      {summary && (
        <>
          <div style={{ marginBottom: "15px" }}>
            <strong>{summary.EmployeeName}</strong> —{" "}
            {summary.designation} ({summary.department})
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px"
          }}>
            <Card title="Present" value={summary.PRESENT} color="#4caf50" />
            <Card title="Absent" value={summary.ABSENT} color="#f44336" />
            <Card title="Half Day" value={summary.HALF_DAY} color="#ff9800" />
            <Card title="Leave" value={summary.LEAVE} color="#2196f3" />
          </div>
        </>
      )}
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      textAlign: "center"
    }}>
      <h4 style={{ marginBottom: "10px" }}>{title}</h4>
      <div style={{ fontSize: "24px", color, fontWeight: "bold" }}>
        {value}
      </div>
    </div>
  );
}

export default MyAttendance;
