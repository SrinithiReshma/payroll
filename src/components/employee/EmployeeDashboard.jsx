import React from "react";

function EmployeeDashboard() {
  const hour = new Date().getHours();

  let greeting = "Welcome";
  let subtitle = "Have a productive day at work.";

  if (hour < 12) {
    greeting = "Good Morning";
    subtitle = "Start your day with focus and clarity.";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
    subtitle = "Keep up the great work.";
  } else {
    greeting = "Good Evening";
    subtitle = "Time to wrap up and unwind.";
  }

  return (
    <div style={contentStyle}>
      <div style={greetingCard}>
        <h1 style={greetingText}>{greeting}</h1>
        <p style={subText}>{subtitle}</p>
      </div>
    </div>
  );
}

/* 🔹 Inline styles (matches your theme) */

const contentStyle = {
  flex: 1,
  padding: "30px",
  backgroundColor: "#f8fafc",
};

const greetingCard = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "12px",
  maxWidth: "520px",
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

export default EmployeeDashboard;
