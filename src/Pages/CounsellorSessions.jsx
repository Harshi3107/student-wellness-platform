import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CounsellorSessions = () => {
  const counsellorName =
    localStorage.getItem("counsellorName") || "Counsellor";

  const [allSessions, setAllSessions] = useState([]);
  const [mySessions, setMySessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sessions")) || [];
    setAllSessions(stored);

    const mine = stored.filter((s) => s.counselor === counsellorName);
    setMySessions(mine);
  }, [counsellorName]);

  const formatDate = (d) =>
    typeof d === "string"
      ? d
      : d.toISOString().split("T")[0]; // yyyy-mm-dd

  const sessionsForSelectedDay = mySessions.filter(
    (s) => s.date === formatDate(selectedDate)
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e8f6f3, #f5fffd)",
        display: "flex",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, color: "#064e3b", mb: 1 }}
        >
          My Sessions 📅
        </Typography>
        <Typography sx={{ mb: 3, color: "#555" }}>
          View all sessions assigned to you and filter by date using the
          calendar.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 1.4fr" },
            gap: 3,
          }}
        >
          {/* Calendar */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: "#ffffff",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#0b5345", fontWeight: "bold" }}
            >
              Calendar
            </Typography>
            <Box
              sx={{
                "& .react-calendar": {
                  width: "100%",
                  border: "none",
                  fontFamily: "inherit",
                  background: "transparent",
                },
                "& .react-calendar__tile--active": {
                  background: "#0f766e !important",
                  color: "#fff !important",
                },
                "& .react-calendar__tile--now": {
                  background: "#e0f2f1",
                },
              }}
            >
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
              />
            </Box>
          </Paper>

          {/* Sessions list */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              background: "#ffffff",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#0b5345", fontWeight: "bold" }}
            >
              Sessions on {formatDate(selectedDate)}
            </Typography>

            {sessionsForSelectedDay.length === 0 ? (
              <Typography color="text.secondary">
                No sessions on this date.
              </Typography>
            ) : (
              <Stack spacing={2}>
                {sessionsForSelectedDay.map((s) => (
                  <Paper
                    key={s.id}
                    sx={{ p: 2, borderRadius: 2, background: "#f9f9f9" }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {s.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555" }}>
                      ✉ {s.email}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#777" }}>
                      Concern: {s.concern}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Chip
                        label={s.status || "Scheduled"}
                        size="small"
                      />
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default CounsellorSessions;
