import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentFeedback")) || [];
    setFeedback(saved);
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0f766e", mb: 3 }}>
        Student Feedback Review
      </Typography>

      {feedback.length === 0 ? (
        <Typography>No feedback submitted yet.</Typography>
      ) : (
        feedback.map((fb, index) => (
          <Card key={index} sx={{ mb: 2, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">{fb.name}</Typography>
              <Typography sx={{ color: "gray" }}>{fb.date}</Typography>
              <Typography sx={{ mt: 1 }}>{fb.message}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default AdminFeedback;
