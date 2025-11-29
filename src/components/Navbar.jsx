import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/"); // redirect to login after logout
  };

  // 🟢 Dashboard Redirect Based on Role
  const dashboardPath =
    userRole === "admin"
      ? "/admin-dashboard"
      : userRole === "student"
      ? "/student-dashboard"
      : "/";

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#0f766e",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        borderBottomLeftRadius: "0.5rem",
        borderBottomRightRadius: "0.5rem",
      }}
    >
      <Toolbar>
        {/* 🌿 Title - Now correctly redirects depending on login */}
        <Typography
          variant="h6"
          component={Link}
          to={dashboardPath}
          sx={{
            flexGrow: 1,
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {userRole === "admin"
            ? "Admin Dashboard 🌿"
            : userRole === "student"
            ? "Student Dashboard 🌿"
            : "Student Wellness 🌿"}
        </Typography>

        {/* NAV LINKS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button component={Link} to="/about" sx={{ color: "#fff" }}>
            About
          </Button>

          {/* STUDENT NAV */}
          {userRole === "student" && (
            <>
              <Button component={Link} to="/events" sx={{ color: "#fff" }}>
                Events & Workshops
              </Button>
              <Button component={Link} to="/connect" sx={{ color: "#fff" }}>
                Connect
              </Button>
              <Button component={Link} to="/feedback" sx={{ color: "#fff" }}>
                Feedback
              </Button>
              <Button
                component={Link}
                to="/student-dashboard"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  border: "2px solid transparent",
                  "&:hover": { borderColor: "#fff", borderRadius: "8px" },
                }}
              >
                Student Dashboard
              </Button>
            </>
          )}

          {/* ADMIN NAV */}
          {userRole === "admin" && (
            <>
              <Button component={Link} to="/admin-events" sx={{ color: "#fff" }}>
                Manage Events
              </Button>
              <Button
                component={Link}
                to="/admin-feedback"
                sx={{ color: "#fff" }}
              >
                Review Feedback
              </Button>
              <Button
                component={Link}
                to="/admin-dashboard"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  border: "2px solid transparent",
                  "&:hover": { borderColor: "#fff", borderRadius: "8px" },
                }}
              >
                Admin Dashboard
              </Button>
            </>
          )}

          {/* LOGOUT */}
          {userRole && (
            <Button
              onClick={handleLogout}
              sx={{
                color: "#fff",
                border: "2px solid #fff",
                borderRadius: "10px",
                px: 2,
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#fff", color: "#0f766e" },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
