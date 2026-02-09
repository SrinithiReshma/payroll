import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

function EmployeeDocuments() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const empCode = localStorage.getItem("empCode");

  useEffect(() => {
    if (!empCode) return;

    setLoading(true);
    apiClient
      .get(`/documents/employee/${empCode}`)
      .then(res => setFiles(res.data))
      .catch(err => console.error("Error loading documents", err))
      .finally(() => setLoading(false));
  }, [empCode]);

  const download = async (id, name) => {
    try {
      const res = await apiClient.get(
        `/documents/download/${id}`,
        {
          params: { empCode },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("You are not authorized to download this document");
    }
  };

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
        <h2 style={{ margin: 0 }}>My Documents</h2>
      </div>

      {/* Content */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        {loading && (
          <p style={{ color: "#64748b" }}>Loading documents...</p>
        )}

        {!loading && files.length === 0 && (
          <p style={{ color: "#64748b", textAlign: "center" }}>
            No documents available
          </p>
        )}

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {files.map((f) => (
            <li
              key={f.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                marginBottom: "12px",
                backgroundColor: "#f8fafc",
              }}
            >
              <span
                style={{
                  color: "#334155",
                  fontSize: "15px",
                  wordBreak: "break-word",
                }}
              >
                {f.fileName}
              </span>

              <button
                onClick={() => download(f.id, f.fileName)}
                style={{
                  backgroundColor: "#166534",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EmployeeDocuments;
