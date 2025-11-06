import { AppBar, Toolbar, Typography, Box, Button, Stack } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

function getRole() {
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.role || null;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = getRole();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
          Student Wellness 🌿
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button color="inherit" component={Link} to="/" disabled={location.pathname === "/"}>Login</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/connect">Connect</Button>

          {role === "student" && (
            <Button color="inherit" component={Link} to="/student">Student</Button>
          )}
          {role === "admin" && (
            <Button color="inherit" component={Link} to="/admin">Admin</Button>
          )}

          {role ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                {role.toUpperCase()}
              </Typography>
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : null}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
