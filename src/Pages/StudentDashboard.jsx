import { Grid, Paper, Typography, Button, Stack, Divider } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

export default function StudentDashboard() {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
        Welcome, Student 🌿
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <FavoriteIcon />
              <Typography variant="h6">Well-being Overview</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography color="text.secondary">
              Stay balanced with routines that support your mental and physical health.
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              View Daily Routine
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <EventAvailableIcon />
              <Typography variant="h6">Counselor Connect</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography color="text.secondary">
              Book a confidential session with campus wellness counselors.
            </Typography>
            <Button href="/connect" variant="contained" sx={{ mt: 2 }}>
              Book Session
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <SchoolIcon />
              <Typography variant="h6">Resources</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button variant="outlined">Study Planner</Button>
              <Button variant="outlined">Mindful Breathing</Button>
              <Button variant="outlined">Sleep Hygiene</Button>
              <Button variant="outlined">Nutrition Basics</Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
