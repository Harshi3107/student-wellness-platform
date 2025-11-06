import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container, TextField, Button, Typography, Paper,
  ToggleButton, ToggleButtonGroup, Box, Alert
} from "@mui/material";

export default function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // super-simple mock auth rule
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Store minimal auth state
    localStorage.setItem("auth", JSON.stringify({ role, email }));

    navigate(role === "admin" ? "/admin" : "/student", { replace: true });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 5 }}>
        <Typography variant="h4" color="primary" gutterBottom align="center">
          Student Wellness Login
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={(e, newRole) => newRole && setRole(newRole)}
          >
            <ToggleButton value="student">Student</ToggleButton>
            <ToggleButton value="admin">Admin</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained" size="large">Login</Button>
        </Box>
      </Paper>
    </Container>
  );
}
