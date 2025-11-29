import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("counsellorName");
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("studentName");
    navigate("/");
  };

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
        <Typography
          variant="h6"
          component={Link}
          to={
            userRole === "admin"
              ? "/admin-dashboard"
              : userRole === "student"
              ? "/student-dashboard"
              : userRole === "counsellor"
              ? "/counsellor-dashboard"
              : "/"
          }
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
            : userRole === "counsellor"
            ? "Counsellor Dashboard 🌿"
            : "Student Wellness 🌿"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Public */}
          <Button component={Link} to="/about" sx={{ color: "#fff" }}>
            About
          </Button>

          {/* STUDENT NAV */}
          {userRole === "student" && (
            <>
              <Button component={Link} to="/events" sx={{ color: "#fff" }}>
                Events
              </Button>
              <Button component={Link} to="/connect" sx={{ color: "#fff" }}>
                Book Session
              </Button>
              <Button
                component={Link}
                to="/student-sessions"
                sx={{ color: "#fff" }}
              >
                My Sessions
              </Button>
              <Button component={Link} to="/feedback" sx={{ color: "#fff" }}>
                Feedback
              </Button>
              <Button
                component={Link}
                to="/student-dashboard"
                sx={{ color: "#fff" }}
              >
                Dashboard
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
                Feedback
              </Button>
              <Button
                component={Link}
                to="/admin-sessions"
                sx={{ color: "#fff" }}
              >
                Manage Sessions
              </Button>
              <Button
                component={Link}
                to="/admin-dashboard"
                sx={{ color: "#fff" }}
              >
                Dashboard
              </Button>
            </>
          )}

          {/* COUNSELLOR NAV */}
          {userRole === "counsellor" && (
            <>
              <Button
                component={Link}
                to="/counsellor-dashboard"
                sx={{ color: "#fff" }}
              >
                Dashboard
              </Button>
              <Button component={Link} to="/sessions" sx={{ color: "#fff" }}>
                Sessions
              </Button>
              <Button
                component={Link}
                to="/session-details"
                sx={{ color: "#fff" }}
              >
                Session Details & Notes
              </Button>
            </>
          )}

          {/* Logout */}
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
