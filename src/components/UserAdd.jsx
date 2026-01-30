import React, { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

function UserAdd() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_EMPLOYEE");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.post("/auth/register", {
        name,
        email,
        password,
        role,
        isActive,
      });

      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Create User</h2>
        <p style={subTitleStyle}>Add a new employee account</p>

        <form onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="password"
            placeholder="Temporary Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={selectStyle}
          >
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_HR">HR</option>
            <option value="ROLE_MANAGER">Manager</option>
            <option value="ROLE_EMPLOYEE">Employee</option>
          </select>

          <label style={checkboxContainer}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              style={checkbox}
            />
            Active User
          </label>

          <button type="submit" style={primaryBtn} disabled={loading}>
            {loading ? "Creating User..." : "Create User"}
          </button>
        </form>

        <div style={divider}>OR</div>

        <button style={secondaryBtn} onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </div>
  );
}


const pageStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f8fafc",
};

const cardStyle = {
  width: "380px",
  padding: "34px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const titleStyle = {
  color: "#1e293b",
  marginBottom: "6px",
};

const subTitleStyle = {
  color: "#64748b",
  marginBottom: "24px",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
};

const selectStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  backgroundColor: "#fff",
};

const checkboxContainer = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "18px",
  fontSize: "14px",
  color: "#334155",
};

const checkbox = {
  width: "16px",
  height: "16px",
};

const primaryBtn = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#1e293b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  cursor: "pointer",
};

const secondaryBtn = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#e2e8f0",
  color: "#1e293b",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
};

const divider = {
  margin: "16px 0",
  color: "#94a3b8",
  fontSize: "13px",
};

export default UserAdd;
