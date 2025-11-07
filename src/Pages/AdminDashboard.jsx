import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const AdminDashboard = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("eventsList")) || [];
    const feedback = JSON.parse(localStorage.getItem("studentFeedback")) || [];

    setTotalEvents(events.length);
    setTotalFeedback(feedback.length);
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0f766e", mb: 3 }}>
        Admin Dashboard 🌿
      </Typography>

      <Box sx={{ display: "flex", gap: 3 }}>
        <Card sx={{ width: 250 }}>
          <CardContent>
            <Typography variant="h6">Total Events</Typography>
            <Typography variant="h4">{totalEvents}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ width: 250 }}>
          <CardContent>
            <Typography variant="h6">Feedback Received</Typography>
            <Typography variant="h4">{totalFeedback}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
