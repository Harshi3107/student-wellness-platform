import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import theme from "./theme";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import EventsPage from "./components/EventsPage";

import StudentDashboard from "./Pages/StudentDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import Login from "./Pages/Login";
import Connect from "./Pages/Connect";
import About from "./Pages/About";
import Feedback from "./Pages/Feedback";

// ✅ NEW ADMIN PAGES
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
            {/* Public */}
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />

            {/* Student */}
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
                  <EventsPage />
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

            {/* Admin */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/events"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminEvents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/feedback"
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
