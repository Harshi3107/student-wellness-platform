import {
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import FeedbackIcon from "@mui/icons-material/Feedback";
import WorkshopTable from "../components/WorkshopTable";

const mockStudents = [
  { name: "Riya Sharma", lastCheck: "2025-11-02", tag: "Stable" },
  { name: "Kiran Rao", lastCheck: "2025-11-03", tag: "Follow-up" },
  { name: "Dev Patel", lastCheck: "2025-11-01", tag: "New" },
];

const mockRequests = [
  { student: "Harini K", date: "2025-11-04", status: "Pending" },
  { student: "Varsha D", date: "2025-11-02", status: "Scheduled" },
];

export default function AdminDashboard() {
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  return (
    <Box sx={{ flexGrow: 1, py: 2 }}>
      <Typography
        variant="h4"
        color="primary"
        sx={{ fontWeight: 700, mb: 3, textAlign: { xs: "center", md: "left" } }}
      >
        Admin Dashboard 🧠
      </Typography>

      <Grid container spacing={3}>
        {/* Students Overview */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <PeopleIcon color="primary" />
              <Typography variant="h6">Students Overview</Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />

            <List dense sx={{ flexGrow: 1 }}>
              {mockStudents.map((s, i) => (
                <ListItem key={i} sx={{ alignItems: "flex-start" }}>
                  <ListItemText
                    primary={s.name}
                    secondary={`Last Check-in: ${s.lastCheck}`}
                  />
                  <Chip
                    label={s.tag}
                    color={
                      s.tag === "Stable"
                        ? "success"
                        : s.tag === "Follow-up"
                        ? "warning"
                        : "info"
                    }
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Counseling Requests */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <SupportAgentIcon color="primary" />
              <Typography variant="h6">Counseling Requests</Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />

            <List dense sx={{ flexGrow: 1 }}>
              {mockRequests.map((r, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={r.student}
                    secondary={`Requested: ${r.date}`}
                  />
                  <Chip
                    label={r.status}
                    color={r.status === "Pending" ? "error" : "primary"}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Highlights Section */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <AssessmentIcon color="primary" />
              <Typography variant="h6">Highlights & Insights</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              • Engagement levels are steady this week; only 2 follow-up cases pending. <br />
              • Encourage students to use the “Well-being Overview” tool daily. <br />
              • Consider a mid-month check-in workshop for group wellness support.
            </Typography>
          </Paper>
        </Grid>

        {/* Workshop Management */}
        <Grid item xs={12}>
          <WorkshopTable />
        </Grid>

        {/* Student Feedback Viewer */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <FeedbackIcon color="primary" />
              <Typography variant="h6">Student Feedback</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />

            {feedbacks.length === 0 ? (
              <Typography color="text.secondary">
                No feedback received yet.
              </Typography>
            ) : (
              <List>
                {feedbacks.map((f, i) => (
                  <ListItem key={i} alignItems="flex-start">
                    <ListItemText
                      primary={`${f.name} — ${f.event}`}
                      secondary={f.message}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
