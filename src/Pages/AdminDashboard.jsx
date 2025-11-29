import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import eventsData from "../data/EventsData";
import { initialWorkshops } from "../data/workshopData";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
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

    const storedEvents =
      JSON.parse(localStorage.getItem("adminEvents")) || eventsData;
    setEventCount(storedEvents.length);

    const storedFeedback =
      JSON.parse(localStorage.getItem("feedback")) || [];
    setFeedbackCount(storedFeedback.length);
  }, []);

  const assignCounselor = (id, counselor) => {
    const updated = sessions.map((session) =>
      session.id === id ? { ...session, counselor } : session
    );
    setSessions(updated);
    localStorage.setItem("sessions", JSON.stringify(updated));
  };

  const calendarEvents = sessions.map((s) => ({
    title: `${s.name} (${s.counselor || "Unassigned"})`,
    start: s.date,
  }));

  return (
    <Box
      sx={{
        padding: 4,
        background: "linear-gradient(to bottom right, #e8f6f3, #f5fffd)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* Dashboard Title */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "900",
            color: "#064e3b",
            letterSpacing: "1px",
            textShadow: "1px 1px #d9f7f0",
          }}
        >
          Admin Wellness Dashboard 🌿
        </Typography>

        {/* TOP CARDS */}
        <Grid container spacing={3}>
          {/* Card Component */}
          {[ 
            { title: "Total Events", value: eventCount, link: "/admin-events" },
            { title: "Feedback Received", value: feedbackCount, link: "/admin-feedback" },
            { title: "Total Workshops", value: initialWorkshops.length, link: "/admin-events" }
          ].map((card, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper
                elevation={6}
                onClick={() => navigate(card.link)}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    background: "#ffffff",
                  },
                }}
              >
                <Typography variant="h6" sx={{ color: "#0b5345", fontWeight: 700 }}>
                  {card.title}
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, color: "#0f766e", fontWeight: 800 }}>
                  {card.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* COUNSELORS + CALENDAR */}
        <Grid container spacing={3}>
          {/* Counselors Box */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={8}
              sx={{
                p: 3,
                borderRadius: 4,
                height: "540px",
                background: "linear-gradient(to bottom, #ffffff, #f0fefa)",
                boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#0b5345",
                  mb: 2,
                }}
              >
                Counselors List 🩺
              </Typography>

              <Stack spacing={2} sx={{ overflowY: "auto", maxHeight: "460px" }}>
                {counselors.map((c, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      background: "#ffffff",
                      borderRadius: 3,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      transition: "0.2s",
                      "&:hover": { transform: "scale(1.02)", backgroundColor: "#e8faf3" },
                    }}
                  >
                    <Avatar sx={{ bgcolor: "#0f766e" }}>{c.name.charAt(0)}</Avatar>

                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {c.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        {c.specialty}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Calendar Box */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={8}
              sx={{
                p: 3,
                borderRadius: 4,
                height: "540px",
                background: "#ffffff",
                boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#0b5345",
                  mb: 2,
                }}
              >
                Session Calendar
              </Typography>

              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={calendarEvents}
                height="100%"
              />
            </Paper>
          </Grid>
        </Grid>

        {/* TABLE */}
        <Paper
          elevation={8}
          sx={{
            p: 3,
            borderRadius: 4,
            background: "#ffffff",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#0b5345",
              mb: 2,
            }}
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
                  border: "1px solid #d9d9d9",
                  textAlign: "center",
                  padding: "12px",
                },
                "& th": {
                  background: "#0f766e",
                  color: "white",
                  fontWeight: 700,
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
                          padding: "8px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
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
