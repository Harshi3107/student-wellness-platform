import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Button, Stack, Divider } from "@mui/material";
import { Link } from "react-router-dom"; 
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import eventsData from "../data/EventsData"; // mock data

export default function StudentDashboard() {
  const [events, setEvents] = useState([]);

  // Load events (admin-added or mock)
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("adminEvents"));
    if (storedEvents && storedEvents.length > 0) {
      setEvents(storedEvents);
    } else {
      setEvents(eventsData);
    }
  }, []);

  return (
    <Stack spacing={3}>
      {/* Dashboard Header */}
      <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
        Welcome, Student 🌿
      </Typography>

      <Grid container spacing={3}>
        {/* Well-being Overview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <FavoriteIcon />
              <Typography variant="h6">Well-being Overview</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography color="text.secondary">
              Stay balanced with routines that support your mental and physical health.
            </Typography>

            {/* Navigate to /daily-routine */}
            <Button
              component={Link}
              to="/daily-routine"
              variant="contained"
              sx={{ mt: 2 }}
            >
              View Daily Routine
            </Button>
          </Paper>
        </Grid>

        {/* Counselor Connect */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <EventAvailableIcon />
              <Typography variant="h6">Counselor Connect</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography color="text.secondary">
              Book a confidential session with campus wellness counselors.
            </Typography>

            <Button
              component={Link}
              to="/connect"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Book Session
            </Button>
          </Paper>
        </Grid>

        {/* Resources */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <SchoolIcon />
              <Typography variant="h6">Resources</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button variant="outlined">Study Planner</Button>
              <Button variant="outlined">Mindful Breathing</Button>
              <Button variant="outlined">Sleep Hygiene</Button>
              <Button variant="outlined">Nutrition Basics</Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <EventAvailableIcon />
              <Typography variant="h6">Upcoming Events</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />

            {events.length === 0 ? (
              <Typography color="text.secondary">No upcoming events available.</Typography>
            ) : (
              <Grid container spacing={2}>
                {events.map((event) => (
                  <Grid item xs={12} md={6} lg={4} key={event.id}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "#f9f9f9",
                        transition: "0.2s",
                        "&:hover": { transform: "scale(1.03)", backgroundColor: "#e8f6f3" },
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", color: "#0f766e" }}
                      >
                        {event.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        📅 {event.date} &nbsp;&nbsp; 🕒 {event.time}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        📍 {event.venue}
                      </Typography>
                      {event.organizer && (
                        <Typography variant="body2" sx={{ mt: 0.5, color: "#777" }}>
                          👤 Organizer: {event.organizer}
                        </Typography>
                      )}
                      {event.description && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {event.description}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
