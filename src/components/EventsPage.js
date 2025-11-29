import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Grid,
  Button,
  TextField,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import "../Pages/DailyRoutine.css";

const DEFAULT_TYPES = ["Workshop", "Seminar", "Counseling", "Yoga", "Webinar"];

function loadEvents() {
  try {
    const stored = JSON.parse(localStorage.getItem("adminEvents"));
    if (stored && stored.length > 0) return stored;
  } catch {}
  return [
    { id: "e1", title: "Mindfulness Workshop", date: "2025-12-05", time: "10:00 AM", venue: "Hall A", type: "Workshop", organizer: "Wellness Cell", description: "A gentle intro to mindfulness and practical techniques." },
    { id: "e2", title: "Resume Building Session", date: "2025-12-08", time: "02:00 PM", venue: "Lab 3", type: "Seminar", organizer: "Career Services", description: "Tips to craft a standout resume." },
    { id: "e3", title: "Sunrise Yoga", date: "2025-12-12", time: "06:30 AM", venue: "Sports Ground", type: "Yoga", organizer: "Sports Club", description: "A refreshing group yoga session to start your day." }
  ];
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [rsvps, setRsvps] = useState({});

  useEffect(() => {
    setEvents(loadEvents());
    try {
      const raw = JSON.parse(localStorage.getItem("rsvps_v1"));
      if (raw) setRsvps(raw);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("rsvps_v1", JSON.stringify(rsvps));
  }, [rsvps]);

  const types = useMemo(() => {
    const set = new Set(DEFAULT_TYPES);
    events.forEach(e => e.type && set.add(e.type));
    return ["All", ...Array.from(set)];
  }, [events]);

  function toggleRsvp(id) {
    setRsvps(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }

  const visible = events.filter(ev => {
    const matchesQuery =
      ev.title.toLowerCase().includes(query.toLowerCase()) ||
      (ev.description && ev.description.toLowerCase().includes(query.toLowerCase()));
    const matchesType = typeFilter === "All" || ev.type === typeFilter;
    return matchesQuery && matchesType;
  });

  return (
    <Box className="page-container" sx={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Top Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Events & Workshops</Typography>
          <Typography variant="body2" color="text.secondary">Discover campus events & sign up ✨</Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Type</InputLabel>
            <Select value={typeFilter} label="Type" onChange={(e) => setTypeFilter(e.target.value)}>
              {types.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
          </FormControl>

          <TextField
            size="small"
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Stack>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Cards */}
      {visible.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">No events found</Typography>
          <Typography color="text.secondary">Try clearing filters or searching again.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {visible.map(ev => (
            <Grid item xs={12} md={6} lg={4} key={ev.id}>
              <Paper sx={{ p: 2.5, borderRadius: 2 }} elevation={3}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarTodayIcon sx={{ color: "#0f766e" }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{ev.title}</Typography>
                    <Chip label={ev.type} size="small" sx={{ marginLeft: "auto" }} />
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    📅 {ev.date} &nbsp; • &nbsp; 🕒 {ev.time}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    📍 {ev.venue}
                  </Typography>

                  {ev.description && <Typography variant="body2" sx={{ mt: 1 }}>{ev.description}</Typography>}

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }} justifyContent="space-between">
                    <Button
                      variant={rsvps[ev.id] ? "outlined" : "contained"}
                      onClick={() => toggleRsvp(ev.id)}
                    >
                      {rsvps[ev.id] ? "Cancel RSVP" : "RSVP"}
                    </Button>

                    <Button variant="text" size="small">
                      Contact Organizer
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
