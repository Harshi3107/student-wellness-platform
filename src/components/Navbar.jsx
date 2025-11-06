import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
  };

  const navLinks = [
    { label: "About", path: "/about" },
    { label: "Connect", path: "/connect" },
    { label: "Events & Workshops", path: "/events" },
  ];

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
          to="/"
          sx={{
            flexGrow: 1,
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Student Wellness 🌿
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              sx={{
                color: "#fff",
                fontWeight:
                  location.pathname === link.path ? "bold" : "normal",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              {link.label}
            </Button>
          ))}

          {/* Conditional links */}
          {userRole === "student" && (
            <Button
              component={Link}
              to="/student-dashboard"
              sx={{ color: "#fff" }}
            >
              Dashboard
            </Button>
          )}
          {userRole === "admin" && (
            <Button
              component={Link}
              to="/admin-dashboard"
              sx={{ color: "#fff" }}
            >
              Admin Panel
            </Button>
          )}

          <Button
            component={Link}
            to="/"
            onClick={handleLogout}
            sx={{
              ml: 1,
              color: "#fff",
              border: "2px solid #fff",
              borderRadius: "10px",
              px: 2,
              fontWeight: "bold",
              textTransform: "uppercase",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
