import { Container, Paper, Typography, TextField, Button, Stack } from "@mui/material";

export default function Connect() {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Connect with a Counselor
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Your message is confidential. We’ll get back to you with an appointment.
        </Typography>

        <Stack component="form" spacing={2} onSubmit={(e) => e.preventDefault()}>
          <TextField label="Your Name" required />
          <TextField label="Email" type="email" required />
          <TextField label="Preferred Date" type="date" InputLabelProps={{ shrink: true }} />
          <TextField label="How are you feeling?" multiline minRows={4} />
          <Button type="submit" variant="contained" size="large">Submit</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
