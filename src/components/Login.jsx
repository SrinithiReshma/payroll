import React, { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await apiClient.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ROLE_EMPLOYEE") {
        navigate("/employee");
      } else {
        navigate("/hr");
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Welcome Back</h2>
        <p style={subTitleStyle}>Please login to continue</p>

        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />

          <button type="submit" style={loginBtn}>
            Login
          </button>
        </form>

        <div style={divider}>OR</div>

        <button
          style={registerBtn}
          onClick={() => navigate("/api/auth/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}

/* 🔹 Inline Styles (Elegant & Professional) */

const pageStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f8fafc",
};

const cardStyle = {
  width: "360px",
  padding: "32px",
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
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

const loginBtn = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#1e293b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  cursor: "pointer",
};

const registerBtn = {
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

export default Login;
