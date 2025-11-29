import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Paper,
} from "@mui/material";

const Login = () => {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) setRole(newRole);
  };

  // ✅ Demo Credentials
  const handleStudentDemo = () => {
    setRole("student");
    setUsername("student123");
    setPassword("studentpass");
  };

  const handleAdminDemo = () => {
    setRole("admin");
    setUsername("adminuser");
    setPassword("adminpass");
  };

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    // Store role in localStorage
    localStorage.setItem("userRole", role);

    // Redirect user
    if (role === "student") {
      window.location.href = "/student-dashboard";
    } else {
      window.location.href = "/admin-dashboard";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f1f5f4",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 420,
          borderRadius: 4,
          p: 4,
          textAlign: "center",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          sx={{ mb: 3, color: "#0f766e", fontWeight: "bold" }}
        >
          Student Wellness Login
        </Typography>

        {/* Toggle Button */}
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={handleRoleChange}
          sx={{
            mb: 3,
            borderRadius: 4,
            overflow: "hidden",
            backgroundColor: "#f3f4f6",
          }}
        >
          <ToggleButton
            value="student"
            sx={{ width: 140, fontWeight: "bold" }}
          >
            STUDENT
          </ToggleButton>
          <ToggleButton
            value="admin"
            sx={{ width: 140, fontWeight: "bold" }}
          >
            ADMIN
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Username Field */}
        <TextField
          label="Username *"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
        />

        {/* Password Field */}
        <TextField
          label="Password *"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
        />

        {/* Login Button */}
        <Button
          fullWidth
          onClick={handleLogin}
          sx={{
            backgroundColor: "#0f766e",
            paddingY: 1.5,
            borderRadius: 3,
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
            "&:hover": { backgroundColor: "#0d5e58" },
            mb: 2,
          }}
        >
          LOGIN
        </Button>

        {/* ✅ Demo Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Button
            onClick={handleStudentDemo}
            sx={{
              backgroundColor: "#e0f2f1",
              color: "#0f766e",
              width: "48%",
              borderRadius: 2,
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#c6e7e4" },
            }}
          >
            Student Demo
          </Button>

          <Button
            onClick={handleAdminDemo}
            sx={{
              backgroundColor: "#e1e1e1",
              color: "#333",
              width: "48%",
              borderRadius: 2,
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#d6d6d6" },
            }}
          >
            Admin Demo
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
