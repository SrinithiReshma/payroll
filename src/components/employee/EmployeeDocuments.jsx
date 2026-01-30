import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

function EmployeeDocuments() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    apiClient.get("/documents").then(res => setFiles(res.data));
  }, []);

  const download = async (id, name) => {
    const res = await apiClient.get(`/documents/download/${id}`, {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  };

  return (
    <div className="container mt-4">
      <h2>Company Documents</h2>

      <ul>
        {files.map(f => (
          <li key={f.id}>
            {f.fileName}
            <button
              className="btn btn-success ms-2"
              onClick={() => download(f.id, f.fileName)}
            >
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeDocuments;
