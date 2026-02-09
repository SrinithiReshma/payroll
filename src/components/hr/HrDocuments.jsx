import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import "./hr-documents.css";

function HrDocuments() {

  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [selectedEmpCode, setSelectedEmpCode] = useState("");

  // Load documents
  const loadFiles = async () => {
    try {
      const res = await apiClient.get("/documents");
      setFiles(res.data);
    } catch (err) {
      console.error("Error loading documents", err);
    }
  };

  // Load employees
  const loadEmployees = async () => {
    try {
      const res = await apiClient.get("/employee/all");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error loading employees", err);
    }
  };

  // Upload document
  const upload = async () => {
    if (!file) {
      alert("Please choose a file");
      return;
    }
    if (!selectedEmpCode) {
      alert("Please select an employee");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("empCode", selectedEmpCode);

      await apiClient.post("/documents/upload", formData);
      alert("File uploaded successfully");

      setFile(null);
      setSelectedEmpCode("");
      loadFiles();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }
  };

  // Delete document
  const remove = async (id) => {
    if (!window.confirm("Delete this document?")) return;

    try {
      await apiClient.delete(`/documents/${id}`);
      loadFiles();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    loadFiles();
    loadEmployees();
  }, []);

  return (
    <div className="hr-doc-card">
      <div className="hr-doc-header">
        HR Documents
      </div>

      <div className="hr-doc-body">

        {/* Upload section */}
        <div className="upload-row">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <select
            value={selectedEmpCode}
            onChange={(e) => setSelectedEmpCode(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.employeeCode}>
                {emp.employeeCode} - {emp.fullName}
              </option>
            ))}
          </select>

          <button className="btn-upload" onClick={upload}>
            Upload
          </button>
        </div>

        {/* Document list */}
        {files.length === 0 ? (
          <div className="empty-doc">
            No documents uploaded
          </div>
        ) : (
          <ul className="doc-list">
            {files.map(f => (
              <li key={f.id} className="doc-item">
                <span>
                  {f.fileName}{" "}
                  <span className="emp-badge">
                    {f.empCode}
                  </span>
                </span>

                <button
                  className="btn-delete-doc"
                  onClick={() => remove(f.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}

export default HrDocuments;
