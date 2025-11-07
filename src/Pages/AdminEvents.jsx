import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AdminEvents = () => {
  // ✅ States for form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [instructor, setInstructor] = useState(""); // ✅ NEW FIELD

  // ✅ Events list
  const [eventsList, setEventsList] = useState([]);

  // ✅ Load stored events
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("eventsList")) || [];
    setEventsList(savedEvents);
  }, []);

  // ✅ Save new event
  const handleSubmit = () => {
    if (!title || !description || !date || !time || !location || !instructor) {
      alert("Please fill all fields");
      return;
    }

    const newEvent = {
      id: Date.now(),
      title,
      description,
      date,
      time,
      location,
      instructor, // ✅ STORE INSTRUCTOR
    };

    const updatedEvents = [...eventsList, newEvent];
    setEventsList(updatedEvents);
    localStorage.setItem("eventsList", JSON.stringify(updatedEvents));

    alert("✅ Event added successfully!");

    // ✅ Clear form
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setLocation("");
    setInstructor("");
  };

  // ✅ DELETE event
  const handleDelete = (id) => {
    const updatedEvents = eventsList.filter((event) => event.id !== id);
    setEventsList(updatedEvents);
    localStorage.setItem("eventsList", JSON.stringify(updatedEvents));
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* ✅ FORM CARD */}
      <Box
        sx={{
          maxWidth: 700,
          margin: "0 auto",
          mt: 3,
          p: 4,
          borderRadius: "25px",
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            textAlign: "center",
            color: "#0f766e",
          }}
        >
          Manage Events & Workshops 🌿
        </Typography>

        {/* FORM FIELDS */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Title */}
          <TextField
            fullWidth
            label="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              sx: { borderRadius: "12px", backgroundColor: "#f9f9f9" },
            }}
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              sx: { borderRadius: "12px", backgroundColor: "#f9f9f9" },
            }}
          />

          {/* Instructor Name ✅ NEW */}
          <TextField
            fullWidth
            label="Instructor Name"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            InputProps={{
              startAdornment: <span style={{ marginRight: 8 }}>👤</span>,
              sx: { borderRadius: "12px", backgroundColor: "#f9f9f9" },
            }}
          />

          {/* Date */}
          <TextField
            fullWidth
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputProps={{
              sx: { borderRadius: "12px", backgroundColor: "#f9f9f9" },
            }}
          />

          {/* Time */}
          <TextField
            fullWidth
            type="time"
            label="Time"
            InputLabelProps={{ shrink: true }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            InputProps={{
              sx: { borderRadius: "12px", backgroundColor: "#f9f9f9" },
            }}
          />

          {/* Location */}
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputProps={{
              startAdornment: <span style={{ marginRight: 8 }}>📍</span>,
              sx: { borderRadius: "12px", backgroundColor: "#f9f9f9" },
            }}
          />

          {/* Submit */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.6,
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
              backgroundColor: "#0f766e",
              "&:hover": {
                backgroundColor: "#0d5f57",
                transform: "scale(1.02)",
                transition: "0.2s",
              },
            }}
            onClick={handleSubmit}
          >
            Add Event
          </Button>
        </Box>
      </Box>

      {/* ✅ EVENTS LIST */}
      <Typography
        variant="h5"
        sx={{ mt: 5, mb: 2, fontWeight: "bold", color: "#0f766e" }}
      >
        Existing Events
      </Typography>

      {eventsList.map((event) => (
        <Card
          key={event.id}
          sx={{
            mb: 2,
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

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <IconButton color="error" onClick={() => handleDelete(event.id)}>
                <DeleteIcon />
              </IconButton>

              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AdminEvents;
