import { Container, Paper, Typography, TextField, Button, Stack, Alert } from "@mui/material";
import { useState } from "react";

export default function Feedback() {
  const [form, setForm] = useState({ name: "", event: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();

  // 💾 Load existing feedback list from localStorage (same key admin uses)
  const feedbackList = JSON.parse(localStorage.getItem("feedback")) || [];

  // 📝 Create a new feedback entry
  const newFeedback = {
    id: Date.now(),
    name: form.name,
    event: form.event,
    message: form.message,
    date: new Date().toLocaleString(),
  };

  // 🔄 Update localStorage
  const updatedList = [...feedbackList, newFeedback];
  localStorage.setItem("feedback", JSON.stringify(updatedList));

  // ✅ Reset form
  setForm({ name: "", event: "", message: "" });
  setSubmitted(true);
};

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Workshop Feedback 💬
        </Typography>

        {submitted && <Alert severity="success" sx={{ mb: 2 }}>Thank you for your feedback!</Alert>}

        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <TextField
            label="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <TextField
            label="Workshop/Event"
            value={form.event}
            onChange={(e) => setForm({ ...form, event: e.target.value })}
            required
          />
          <TextField
            label="Your Feedback"
            multiline
            minRows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <Button type="submit" variant="contained">Submit</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
