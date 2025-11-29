import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import theme from "./theme";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Student Pages
import About from "./Pages/About";
import Login from "./Pages/Login";
import StudentDashboard from "./Pages/StudentDashboard";
import Connect from "./Pages/Connect";
import Feedback from "./Pages/Feedback";
import Events from "./Pages/Events";

// Admin Pages
import AdminDashboard from "./Pages/AdminDashboard";
import AdminEvents from "./Pages/AdminEvents";
import AdminFeedback from "./Pages/AdminFeedback";

// ✅ DailyRoutine page (ADD THIS IMPORT)
import DailyRoutine from "./Pages/DailyRoutine";
import StudyPlanner from "./Pages/StudyPlanner";
import MindfulBreathing from "./Pages/MindfulBreathing";
import SleepHygiene from "./Pages/SleepHygiene";
import NutritionBasics from "./Pages/NutritionBasics";



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Navbar />

        <Box sx={{ p: 3, minHeight: "100vh" }}>
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

            {/* DAILY ROUTINE (student-only) */}
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
