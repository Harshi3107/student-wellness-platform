import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { Box, Typography, Paper, Grid, Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import eventsData from "../data/EventsData";
import { initialWorkshops } from "../data/workshopData";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [counselors] = useState(["Dr. Meena", "Dr. Rohan", "Dr. Priya"]);

  const [counselors] = useState([
    { name: "Dr. Meena Sharma", specialty: "Mindfulness & Meditation" },
    { name: "Dr. Rohan Patel", specialty: "Stress Management" },
    { name: "Dr. Priya Nair", specialty: "Nutrition & Lifestyle" },
    { name: "Dr. Kiran Rao", specialty: "Cognitive Therapy" },
  ]);

  const [eventCount, setEventCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    const storedSessions = JSON.parse(localStorage.getItem("sessions")) || [];
    setSessions(storedSessions);

    const storedEvents = JSON.parse(localStorage.getItem("adminEvents")) || eventsData;
    setEventCount(storedEvents.length);

    const storedFeedback = JSON.parse(localStorage.getItem("feedback")) || [];
    const storedEvents =
      JSON.parse(localStorage.getItem("adminEvents")) || eventsData;
    setEventCount(storedEvents.length);

    const storedFeedback =
      JSON.parse(localStorage.getItem("feedback")) || [];
    setFeedbackCount(storedFeedback.length || 0);
  }, []);

  const assignCounselor = (id, counselor) => {
    const updated = sessions.map((session) =>
      session.id === id ? { ...session, counselor } : session
    );
    setSessions(updated);
    localStorage.setItem("sessions", JSON.stringify(updated));
  };

  const events = sessions.map((s) => ({
    title: `${s.name} (${s.counselor || "Unassigned"})`,
    start: s.date,
  }));

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f9f8", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#0b5345",
          mb: 4,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        Admin Dashboard 🌿
      </Typography>

      {/* 🟩 Top Section (Cards + Calendar) */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Left Side: Dashboard Cards */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper
                elevation={4}
                onClick={() => navigate("/admin/events")}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#ffffff",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    backgroundColor: "#eafaf1",
                  },
                }}
              >
                <Typography variant="h6" sx={{ color: "#0b5345", fontWeight: "bold" }}>
                  Total Events
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, color: "#0f766e" }}>
                  {eventCount}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                elevation={4}
                onClick={() => navigate("/admin/feedback")}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#ffffff",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    backgroundColor: "#eafaf1",
                  },
                }}
              >
                <Typography variant="h6" sx={{ color: "#0b5345", fontWeight: "bold" }}>
                  Feedback Received
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, color: "#0f766e" }}>
                  {feedbackCount}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                elevation={4}
                onClick={() => navigate("/admin/events")}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#ffffff",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    backgroundColor: "#eafaf1",
                  },
                }}
              >
                <Typography variant="h6" sx={{ color: "#0b5345", fontWeight: "bold" }}>
                  Total Workshops
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, color: "#0f766e" }}>
                  {initialWorkshops.length}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side: Calendar */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#ffffff",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{ mb: 2, color: "#0b5345", fontWeight: "bold" }}
            >
              Session Calendar
            </Typography>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              height="500px"
            />
          </Paper>
        </Grid>
      </Grid>

      {/* 🟩 Bottom Section: Booked Sessions Table */}
      <Paper elevation={6} sx={{ p: 3, borderRadius: 3, backgroundColor: "#ffffff" }}>
        <Typography
          variant="h5"
          sx={{ mb: 2, color: "#0b5345", fontWeight: "bold" }}
        >
          Booked Sessions
        </Typography>

        {sessions.length === 0 ? (
          <Typography>No sessions booked yet.</Typography>
        ) : (
          <Box
            component="table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              "& th, & td": {
                border: "1px solid #ccc",
                textAlign: "center",
                padding: "10px",
              },
              "& th": {
                backgroundColor: "#0f766e",
                color: "white",
              },
            }}
          >
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Date</th>
                <th>Concern</th>
                <th>Assigned Counselor</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.date}</td>
                  <td>{s.concern}</td>
                  <td>
                    <select
                      value={s.counselor}
                      onChange={(e) => assignCounselor(s.id, e.target.value)}
                      style={{
                        padding: "6px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        background: "#f4f4f4",
                        cursor: "pointer",
                      }}
                    >
                      <option>Unassigned</option>
                      {counselors.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Box>
        )}
      </Paper>
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f5f9f8",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* ✅ CENTER CONTENT */}
      <Box sx={{ width: "100%", maxWidth: "1100px", mx: "auto" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#0b5345",
            mb: 4,
          }}
        >
          Admin Dashboard 🌿
        </Typography>

        {/* ✅ TOP CARDS - CENTERED */}
        <Grid container spacing={3} sx={{ mb: 3 }} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={4}
              onClick={() => navigate("/admin/events")}
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.03)", backgroundColor: "#eafaf1" },
                transition: "0.2s",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0b5345" }}>
                Total Events
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, color: "#0f766e" }}>
                {eventCount}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={4}
              onClick={() => navigate("/admin/feedback")}
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.03)", backgroundColor: "#eafaf1" },
                transition: "0.2s",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0b5345" }}>
                Feedback Received
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, color: "#0f766e" }}>
                {feedbackCount}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={4}
              onClick={() => navigate("/admin/events")}
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.03)", backgroundColor: "#eafaf1" },
                transition: "0.2s",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0b5345" }}>
                Total Workshops
              </Typography>
              <Typography variant="h3" sx={{ mt: 1, color: "#0f766e" }}>
                {initialWorkshops.length}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* ✅ COUNSELORS + CALENDAR CENTERED */}
        <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
          
          {/* LEFT: COUNSELORS */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "520px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, color: "#0b5345", fontWeight: "bold" }}
              >
                Counselors List 🩺
              </Typography>

              <Stack spacing={2} sx={{ overflowY: "auto" }}>
                {counselors.map((c, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: "#f9f9f9",
                      "&:hover": { backgroundColor: "#e8f6f3" },
                    }}
                  >
                    <Avatar sx={{ bgcolor: "#0f766e" }}>{c.name.charAt(0)}</Avatar>

                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", color: "#0f766e" }}
                      >
                        {c.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        {c.specialty}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* RIGHT: CALENDAR */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "520px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 2, color: "#0b5345", fontWeight: "bold" }}
              >
                Session Calendar
              </Typography>

              <Box sx={{ flexGrow: 1 }}>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  events={events}
                  height="100%"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* ✅ BOOKED SESSIONS TABLE */}
        <Paper elevation={6} sx={{ p: 3, borderRadius: 3 }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, color: "#0b5345", fontWeight: "bold" }}
          >
            Booked Sessions
          </Typography>

          {sessions.length === 0 ? (
            <Typography>No sessions booked yet.</Typography>
          ) : (
            <Box
              component="table"
              sx={{
                width: "100%",
                borderCollapse: "collapse",
                "& th, & td": {
                  border: "1px solid #ccc",
                  textAlign: "center",
                  padding: "10px",
                },
                "& th": { backgroundColor: "#0f766e", color: "white" },
              }}
            >
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Concern</th>
                  <th>Assigned Counselor</th>
                </tr>
              </thead>

              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.date}</td>
                    <td>{s.concern}</td>
                    <td>
                      <select
                        value={s.counselor}
                        onChange={(e) => assignCounselor(s.id, e.target.value)}
                        style={{
                          padding: "6px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          background: "#f4f4f4",
                        }}
                      >
                        <option>Unassigned</option>
                        {counselors.map((c) => (
                          <option key={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
