import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./theme";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./Pages/Login";
import StudentDashboard from "./Pages/StudentDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import Connect from "./Pages/Connect";
import About from "./Pages/About";
import Events from "./Pages/Events";
import Feedback from "./Pages/Feedback";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container
          maxWidth="lg"
          sx={{
            minHeight: "calc(100vh - 120px)",
            py: 4,
          }}
        >
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/events" element={<Events />} />
            <Route path="/feedback" element={<Feedback />} />

            {/* Protected Routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
