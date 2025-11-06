import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import EventCard from "./EventCard";
import eventsData from "../data/EventsData";

const EventsPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        🌿 Upcoming Events & Workshops
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Stay involved with wellness programs and campus activities.
      </Typography>
      <Grid container spacing={2}>
        {eventsData.map((event) => (
          <Grid item key={event.id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventsPage;
