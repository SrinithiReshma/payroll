import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

function HrDocuments() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const loadFiles = async () => {
    const res = await apiClient.get("/documents");
    setFiles(res.data);
  };

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await apiClient.post("/documents/upload", formData);
    setFile(null);
    loadFiles();
  };

  const remove = async (id) => {
    await apiClient.delete(`/documents/${id}`);
    loadFiles();
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="container mt-4">
      <h2>HR Documents</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="btn btn-primary ms-2" onClick={upload}>
        Upload
      </button>

      <ul className="mt-3">
        {files.map(f => (
          <li key={f.id}>
            {f.fileName}
            <button className="btn btn-danger ms-2" onClick={() => remove(f.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HrDocuments;
