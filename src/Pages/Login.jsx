import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const studentCredentials = { username: "student123", password: "student@123" };
  const adminCredentials = { username: "admin123", password: "admin@123" };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === studentCredentials.username &&
      password === studentCredentials.password
    ) {
      localStorage.setItem("userRole", "student");
      navigate("/student-dashboard");
    } else if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      localStorage.setItem("userRole", "admin");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
          boxShadow: "0px 6px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 3,
            background: "linear-gradient(90deg, #0f766e, #14532d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Student Wellness Login 🌿
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              py: 1.3,
              fontWeight: "bold",
              fontSize: "1rem",
              backgroundColor: "#0f766e",
              "&:hover": { backgroundColor: "#14532d" },
            }}
          >
            Login
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ mt: 3, color: "text.secondary", lineHeight: 1.7 }}
        >
          <b>Student:</b> student123 / student@123 <br />
          <b>Admin:</b> admin123 / admin@123
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
