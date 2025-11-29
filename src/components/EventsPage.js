import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // ✅ Load events from localStorage
    const savedEvents = JSON.parse(localStorage.getItem("eventsList")) || [];
    setEvents(savedEvents);
  }, []);

  const handleRegister = (title) => {
    alert(`✅ Registered for: ${title}`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: "bold", color: "#0f766e" }}
      >
        Upcoming Events & Workshops 🌱
      </Typography>

      {events.length === 0 && (
        <Typography>No events available currently.</Typography>
      )}

      <Box sx={{ display: "flex", gap: 3 }}>
        {events.map((event) => (
          <Card
            key={event.id}
            sx={{
              width: 350,
              borderRadius: "16px",
              padding: 2,
              backgroundColor: "#f4fdfb",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {event.title}
              </Typography>

              <Typography sx={{ mt: 1 }}>{event.description}</Typography>

              <Typography sx={{ mt: 1 }}>👤 Instructor: {event.instructor}</Typography>
              <Typography sx={{ mt: 1 }}>📅 {event.date}</Typography>
              <Typography>⏰ {event.time}</Typography>
              <Typography>📍 {event.location}</Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#0f766e",
                  "&:hover": { backgroundColor: "#0d5f57" },
                }}
                onClick={() => handleRegister(event.title)}
              >
                Register
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default EventsPage;
