import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import theme from "./theme";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import About from "./Pages/About";
import Login from "./Pages/Login";
import StudentDashboard from "./Pages/StudentDashboard";
import Connect from "./Pages/Connect";
import Feedback from "./Pages/Feedback";
import Events from "./Pages/Events";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminEvents from "./Pages/AdminEvents";
import AdminFeedback from "./Pages/AdminFeedback";
import DailyRoutine from "./Pages/DailyRoutine";
import StudyPlanner from "./Pages/StudyPlanner";
import MindfulBreathing from "./Pages/MindfulBreathing";
import SleepHygiene from "./Pages/SleepHygiene";
import NutritionBasics from "./Pages/NutritionBasics";


// -----------------------
// Wrapper to hide Navbar on login
// -----------------------
function AppContent() {
  const location = useLocation();

  // Hide navbar only on login
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Box sx={{ p: hideNavbar ? 0 : 3, minHeight: "100vh" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />

          {/* Student Routes */}
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/daily-routine"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <DailyRoutine />
              </ProtectedRoute>
            }
          />

          <Route
            path="/study-planner"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudyPlanner />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mindful-breathing"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <MindfulBreathing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sleep-hygiene"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <SleepHygiene />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nutrition-basics"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <NutritionBasics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/events"
            element={
              <ProtectedRoute allowedRoles={["student", "admin"]}>
                <Events />
              </ProtectedRoute>
            }
          />

          <Route
            path="/connect"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Connect />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-events"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminEvents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-feedback"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminFeedback />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </>
  );
}


// -----------------------
// Main App
// -----------------------
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
