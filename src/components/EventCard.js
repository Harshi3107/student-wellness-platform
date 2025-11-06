import React, { useState } from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";

const EventCard = ({ event }) => {
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    setRegistered(true);
  };

  return (
    <Card sx={{ width: 320, m: 2, borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description}
        </Typography>
        <Typography sx={{ mt: 1.5 }}>
          📅 {event.date} | 🕒 {event.time}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          📍 {event.venue}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant={registered ? "contained" : "outlined"}
          color={registered ? "success" : "primary"}
          onClick={handleRegister}
          disabled={registered}
        >
          {registered ? "Registered" : "Register"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
