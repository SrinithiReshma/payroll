import React from "react";
import { Outlet } from "react-router-dom";

function HrDashboard() {
  const hour = new Date().getHours();

  let greeting = "Welcome";
  let subtitle = "Manage employees and company operations.";

  if (hour < 12) {
    greeting = "Good Morning";
    subtitle = "Start your day by reviewing tasks and updates.";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
    subtitle = "Everything is running smoothly.";
  } else {
    greeting = "Good Evening";
    subtitle = "Wrap up the day and review pending actions.";
  }

  return (
    <div style={layoutStyle}>
      <div style={contentStyle}>
        {/* Greeting Card */}
        <div style={greetingCard}>
          <h1 style={greetingText}>{greeting}</h1>
          <p style={subText}>{subtitle}</p>
        </div>

        {/* Nested Routes */}
        <div style={{ marginTop: "24px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

/* 🔹 Inline styles – aligned with your sidebar theme */

const layoutStyle = {
  display: "flex",
  height: "100vh",
};

const contentStyle = {
  flex: 1,
  padding: "30px",
  backgroundColor: "#f8fafc",
};

const greetingCard = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "12px",
  maxWidth: "560px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
};

const greetingText = {
  color: "#1e293b",
  fontSize: "32px",
  fontWeight: "600",
  marginBottom: "8px",
};

const subText = {
  color: "#64748b",
  fontSize: "16px",
  margin: 0,
};

export default HrDashboard;
