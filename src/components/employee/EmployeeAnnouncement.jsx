import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

function EmployeeAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/employee/announcements");
      setAnnouncements(res.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <div
      style={{
        padding: "25px",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#1e293b",
          color: "white",
          padding: "15px 20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Announcements</h2>
      </div>

      {/* Content Card */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        {loading && (
          <p style={{ color: "#64748b" }}>Loading announcements...</p>
        )}

        {!loading && announcements.length === 0 && (
          <p style={{ color: "#64748b", textAlign: "center" }}>
            No announcements available
          </p>
        )}

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {announcements.map((announcement) => (
            <li
              key={announcement.announcementId}
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                marginBottom: "12px",
                backgroundColor: "#f8fafc",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#334155",
                  fontSize: "15px",
                }}
              >
                {announcement.message}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EmployeeAnnouncement;
