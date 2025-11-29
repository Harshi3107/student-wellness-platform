import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CounsellorDashboard = () => {
  const navigate = useNavigate();
  const counsellorName =
    localStorage.getItem("counsellorName") || "Counsellor";

  const [allSessions, setAllSessions] = useState([]);
  const [availability, setAvailability] = useState({
    days: [],
    startTime: "",
    endTime: "",
    maxPerDay: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sessions")) || [];
    setAllSessions(stored);

    const savedAvail =
      JSON.parse(localStorage.getItem(`availability_${counsellorName}`)) || null;

    if (savedAvail) setAvailability(savedAvail);
  }, [counsellorName]);

  const updateSessions = (updatedAll) => {
    localStorage.setItem("sessions", JSON.stringify(updatedAll));
    setAllSessions(updatedAll);
  };

  const handleSaveAvailability = () => {
    localStorage.setItem(
      `availability_${counsellorName}`,
      JSON.stringify(availability)
    );
    alert("Availability saved.");
  };

  const handleStatsClick = () => {
    navigate("/sessions");
  };

  const mySessions = allSessions.filter(
    (s) => s.counselor === counsellorName
  );
  const totalAssigned = mySessions.length;
  const totalCompleted = mySessions.filter(
    (s) => (s.status || "Scheduled") === "Completed"
  ).length;
  const totalUpcoming = mySessions.filter(
    (s) => (s.status || "Scheduled") === "Scheduled"
  ).length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e8f6f3, #f5fffd)",
        p: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: "#064e3b", mb: 1 }}>
          Counsellor Dashboard 🩺
        </Typography>

        <Typography sx={{ mb: 3, color: "#555" }}>
          Welcome, <b>{counsellorName}</b>.
        </Typography>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Paper
              onClick={handleStatsClick}
              sx={{
                p: 2,
                borderRadius: 3,
                textAlign: "center",
                background: "rgba(255,255,255,0.9)",
                cursor: "pointer",
              }}
            >
              <Typography>Total Assigned</Typography>
              <Typography variant="h4">{totalAssigned}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper
              onClick={handleStatsClick}
              sx={{
                p: 2,
                borderRadius: 3,
                textAlign: "center",
                background: "rgba(255,255,255,0.9)",
                cursor: "pointer",
              }}
            >
              <Typography>Upcoming</Typography>
              <Typography variant="h4">{totalUpcoming}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper
              onClick={handleStatsClick}
              sx={{
                p: 2,
                borderRadius: 3,
                textAlign: "center",
                background: "rgba(255,255,255,0.9)",
                cursor: "pointer",
              }}
            >
              <Typography>Completed</Typography>
              <Typography variant="h4">{totalCompleted}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Availability */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, borderRadius: 3, background: "#ffffff" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                My Availability 🕒
              </Typography>

              <Typography variant="subtitle2">Available Days:</Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                {daysOfWeek.map((day) => {
                  const selected = availability.days.includes(day);
                  return (
                    <Chip
                      key={day}
                      label={day}
                      onClick={() =>
                        setAvailability((prev) => ({
                          ...prev,
                          days: selected
                            ? prev.days.filter((d) => d !== day)
                            : [...prev.days, day],
                        }))
                      }
                      sx={{
                        cursor: "pointer",
                        backgroundColor: selected ? "#0f766e" : "#e5f4f2",
                        color: selected ? "#fff" : "#064e3b",
                      }}
                    />
                  );
                })}
              </Stack>

              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="Start Time"
                  type="time"
                  fullWidth
                  value={availability.startTime}
                  onChange={(e) =>
                    setAvailability((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  label="End Time"
                  type="time"
                  fullWidth
                  value={availability.endTime}
                  onChange={(e) =>
                    setAvailability((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>

              <TextField
                label="Max sessions per day"
                type="number"
                fullWidth
                value={availability.maxPerDay}
                sx={{ mb: 2 }}
                onChange={(e) =>
                  setAvailability((prev) => ({
                    ...prev,
                    maxPerDay: e.target.value,
                  }))
                }
              />

              <Button
                variant="contained"
                fullWidth
                onClick={handleSaveAvailability}
                sx={{
                  backgroundColor: "#0f766e",
                  "&:hover": { backgroundColor: "#0b5149" },
                }}
              >
                Save Availability
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* New Session Requests */}
        <Paper sx={{ p: 3, borderRadius: 3, background: "#ffffff" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            New Session Requests 🔔
          </Typography>

          {allSessions.filter((s) => !s.counselor)?.length === 0 ? (
            <Typography>No new requests.</Typography>
          ) : (
            <Stack spacing={2}>
              {allSessions
                .filter((s) => !s.counselor)
                .map((s) => (
                  <Paper key={s.id} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {s.name} — {s.concern}
                    </Typography>

                    <Typography>📅 {s.date}</Typography>
                    <Typography>✉ {s.email}</Typography>

                    <Button
                      variant="contained"
                      sx={{
                        mt: 1,
                        backgroundColor: "#0f766e",
                        "&:hover": { backgroundColor: "#0b5149" },
                      }}
                      onClick={() => {
                        const updated = allSessions.map((session) =>
                          session.id === s.id
                            ? {
                                ...session,
                                counselor: counsellorName,
                                status: "Scheduled",
                              }
                            : session
                        );
                        updateSessions(updated);
                      }}
                    >
                      Accept Session
                    </Button>
                  </Paper>
                ))}
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default CounsellorDashboard;
